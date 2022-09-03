import { useEffect, useState, useCallback } from 'react'
import { Text, View, StatusBar, FlatList, RefreshControl } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FontAwesome } from '@expo/vector-icons'

import LoadingModal from '../../components/common/LoadingModal'
import { Colors } from '../../config/theme'
import { fetchSubCategories } from '../../api/categories'
import SubCategoryCard from '../../components/SubCategoryCard'

import styles from './styles'

const SubCategories = (props) => {
  const [subCategories, setSubCategories] = useState([])
  const [loading, showLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [currentCategory, setCurrentCategory] = useState({})
  const [page, setPage] = useState(1)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    handleGetSubCategories()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    if (props.route.params?.category) {
      setCurrentCategory(props.route.params.category)
      handleGetSubCategories(props.route.params?.category.id)
    }
  }, [props.route.params])

  const handleGetSubCategories = async (id) => {
    showLoading(true)
    try {
      const { data } = await fetchSubCategories(page, id || currentCategory.id)
      console.log('asfsdas data: ', data.data)
      setSubCategories(data.data)
    } catch (error) {
      console.log({ message: 'Sub categories not found' }, error)
    }
    showLoading(false)
  }

  const handleCategory = (subCategory) => {
    props.navigation.navigate('Questions', {
      subCategory,
    })
  }

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <StatusBar backgroundColor={Colors.primary} style='light' />
      <View style={styles.header}></View>
      <View style={styles.bodyContainer}>
        <View style={styles.pageNavigation} >
          <Text style={styles.heading}>{currentCategory.title}</Text>
          <View style={styles.navigation} >
            <FontAwesome name='chevron-left' color={Colors.secondary} size={RFPercentage(2)} />
            <Text style={styles.pageNumber} >{page}</Text>
            <FontAwesome name='chevron-right' color={Colors.secondary} size={RFPercentage(2)} />
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(8) }}
          data={subCategories}
          renderItem={({ item, index }) => (
            <SubCategoryCard item={item} handleCategory={handleCategory} index={index} />
          )}
        />
      </View>
    </View>
  )
}

export default SubCategories
