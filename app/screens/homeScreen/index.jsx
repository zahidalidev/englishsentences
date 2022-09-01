import { useEffect, useState, useCallback } from 'react'
import { Text, View, StatusBar, FlatList, RefreshControl } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import LoadingModal from '../../components/common/LoadingModal'
import { Colors } from '../../config/theme'
import { fetchAllCategories } from '../../api/categories'
import CategoryCard from '../../components/CategoryCard'

import styles from './styles'

const HomeScreen = (props) => {
  const [categories, setCategories] = useState([])
  const [loading, showLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    handleGetAllCategories()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    handleGetAllCategories()
  }, [])

  const handleGetAllCategories = async () => {
    try {
      showLoading(true)
      const { data } = await fetchAllCategories()
      setCategories(data)
    } catch (error) {
      console.log({ message: 'Categories not found' }, error)
    }
    showLoading(false)
  }

  const handleCategory = (category) => {
    props.navigation.navigate('SubCategories', {
      category,
    })
  }

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <StatusBar backgroundColor={Colors.primary} style='light' />
      <View style={styles.header}></View>
      <View style={styles.bodyContainer}>
        <Text style={styles.heading}>Categories</Text>
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(8) }}
          data={categories}
          numColumns={2}
          renderItem={({ item, index }) => (
            <CategoryCard item={item} handleCategory={handleCategory} index={index} />
          )}
        />
      </View>
    </View>
  )
}

export default HomeScreen
