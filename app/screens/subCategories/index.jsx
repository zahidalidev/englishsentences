import { useEffect, useState, useCallback } from 'react'
import { Text, View, StatusBar, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { FontAwesome } from '@expo/vector-icons'

import LoadingModal from '../../components/common/LoadingModal'
import { Colors } from '../../config/theme'
import { fetchSubCategories } from '../../api/categories'
import SubCategoryCard from '../../components/SubCategoryCard'

import styles from './styles'
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'
import { questionBannerId } from '../../config/adIds'

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
      handleGetSubCategories()
    }

    return () => {
      setPage(1)
    }
  }, [props.route.params])

  const handleGetSubCategories = async () => {
    showLoading(true)
    try {
      const { data } = await fetchSubCategories(page, props.route.params?.category.id)
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

  const getMoreSubCategories = async () => {
    showLoading(true)
    const newPage = page + 1
    setPage(newPage)
    try {
      const { data } = await fetchSubCategories(newPage, currentCategory.id)
      setSubCategories([...subCategories, ...data.data])
    } catch (error) {
      console.log({ message: 'Sub categories not found' }, error)
    }
    showLoading(false)
  }

  return (
    <>
      <View style={styles.container}>
        <LoadingModal show={loading} />
        <StatusBar backgroundColor={Colors.primary} style='light' />
        <View style={styles.header}></View>
        <View style={styles.pageNavigation}>
          <View style={styles.paginationHeading}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <FontAwesome
                name='chevron-left'
                style={styles.backIcon}
                size={RFPercentage(2)}
                color={Colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>{currentCategory.title}</Text>
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          style={{ marginTop: RFPercentage(2) }}
          data={subCategories}
          renderItem={({ item }) => <SubCategoryCard item={item} handleCategory={handleCategory} />}
          onEndReached={getMoreSubCategories}
        />
      </View>
      <View style={styles.homeBanner}>
        <BannerAd
          unitId={questionBannerId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </>
  )
}

export default SubCategories
