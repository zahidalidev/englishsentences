import { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, StatusBar, FlatList, RefreshControl } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'

import LoadingModal from '../components/common/LoadingModal'
import { Colors, toastTheme } from '../config/theme'
import { fetchAllCategories } from '../api/categories'
import CategoryCard from '../components/CategoryCard'

const HomeScreen = (props) => {
  const [categories, setCategories] = useState([])
  const [loading, showLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    handleGetAllCategory()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    handleGetAllCategory()
  }, [props.route.params])

  const handleGetAllCategory = async () => {
    try {
      showLoading(true)
      const { data } = await fetchAllCategories()
      setCategories(data)
    } catch (error) {
      console.log({ message: 'Categories not found', ...toastTheme.error })
    }
    showLoading(false)
  }

  const handleCategory = (item) => {
    props.navigation.navigate('ProductList', {
      category: item,
    })
  }

  return (
    <View style={styles.container}>
      <LoadingModal show={loading} />
      <StatusBar backgroundColor={Colors.primary} style='light' />
      <View style={styles.header}></View>
      <View style={styles.bodyContainer}>
        <Text style={styles.heading} >Select Category</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    width: '100%',
  },

  header: {
    width: '100%',
    backgroundColor: Colors.primary,
    height: RFPercentage(11),
  },

  bodyContainer: {
    width: '100%',
    backgroundColor: Colors.white,
    borderTopEndRadius: RFPercentage(3.7),
    borderTopStartRadius: RFPercentage(3.7),
    marginTop: RFPercentage(-4),
    alignItems: 'center',
    marginBottom: RFPercentage(10),
  },

  heading: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    marginTop: RFPercentage(3)
  }
})

export default HomeScreen
