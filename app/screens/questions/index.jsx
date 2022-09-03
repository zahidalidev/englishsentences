import { useEffect, useState, useCallback } from 'react'
import { Text, View, StatusBar, FlatList, RefreshControl } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FontAwesome } from '@expo/vector-icons'
import { ProgressBar } from 'react-native-paper'

import LoadingModal from '../../components/common/LoadingModal'
import { Colors } from '../../config/theme'
import { fetchQuestions } from '../../api/categories'
import SubCategoryCard from '../../components/SubCategoryCard'

import styles from './styles'

const Questions = (props) => {
  const [questions, setQuestions] = useState([])
  const [loading, showLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [currentSubCategory, setSubCurrentCategory] = useState({})

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    handleGetQuestions()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    handleGetQuestions()
    if (props.route.params?.subCategory) {
      setSubCurrentCategory(props.route.params.subCategory)
      handleGetQuestions(props.route.params?.subCategory.quiz_id)
    }
  }, [props.route.params])

  const handleGetQuestions = async (id) => {
    try {
      showLoading(true)
      const { data } = await fetchQuestions(id || currentSubCategory.quiz_id)
      setQuestions(data.data)
    } catch (error) {
      console.log({ message: 'Sub categories not found' }, error)
    }
    showLoading(false)
  }

  const handleCategory = (item) => {
    // props.navigation.navigate('ProductList', {
    //   category: item,
    // })
  }

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <StatusBar backgroundColor={Colors.primary} style='light' />
      <View style={styles.header}>
        <View style={styles.pageNavigation}>
          <FontAwesome name='chevron-left' size={RFPercentage(2)} color={Colors.white} />
          <Text style={styles.heading}>{currentSubCategory.title}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressCount} >
            {[...Array(10).keys()].map((num) => (
              <View style={[styles.numContainer, { backgroundColor: Colors.green }]} >
                <Text>{num}</Text>
              </View>
            ))}
          </View>
          <ProgressBar progress={0.04} style={styles.progressBar} color={Colors.green} />
        </View>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(8) }}
          data={questions}
          renderItem={({ item, index }) => (
            <SubCategoryCard item={item} handleCategory={handleCategory} index={index} />
          )}
        /> */}
      </View>
    </View>
  )
}

export default Questions
