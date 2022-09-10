import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads'
import { useEffect, useState, useCallback, useRef } from 'react'
import { Text, View, StatusBar, FlatList, RefreshControl, ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'

import LoadingModal from '../../components/common/LoadingModal'
import { Colors } from '../../config/theme'
import CategoryCard from '../../components/CategoryCard'
import getPushNotificationsToken from '../../utils/getNotificationToken'
import { fetchAllCategories } from '../../api/categories'
import { saveNotificationToken } from '../../api/token'
import { questionBannerId } from '../../config/adIds'

import styles from './styles'

const HomeScreen = (props) => {
  const [categories, setCategories] = useState([])
  const [loading, showLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [notification, setNotification] = useState()
  const notificationListener = useRef({})
  const responseListener = useRef({})

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    handleGetAllCategories()
    setRefreshing(false)
  }, [])

  const getNotificationToken = async () => {
    try {
      const token = await getPushNotificationsToken()
      console.log('token: ', token)
      const body = {
        firebase_token: token,
        device_id: Constants.installationId,
      }
      const { data } = await saveNotificationToken(body)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNotificationToken()
    handleGetAllCategories()
    listenPushNotification()
  }, [])

  const listenPushNotification = () => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      props.navigation.navigate('Home')
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }

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
    <>
      <View style={styles.container}>
        <LoadingModal show={loading} />
        <StatusBar backgroundColor={Colors.primary} style='light' />
        <View style={styles.header}></View>
        <View style={styles.bodyContainer}>
          <Text style={styles.heading}>Categories</Text>
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ marginTop: RFPercentage(2), marginBottom: RFPercentage(1), marginLeft: '5%' }}
            data={categories}
            numColumns={2}
            renderItem={({ item, index }) => (
              <CategoryCard item={item} handleCategory={handleCategory} index={index} />
            )}
          />
        </View>
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

export default HomeScreen
