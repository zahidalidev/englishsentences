import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LottieView from 'lottie-react-native'
import { View } from 'react-native'

// import { LogBox } from "react-native";

import Home from './app/screens/homeScreen'
import SubCategories from './app/screens/subCategories'
import Questions from './app/screens/questions'

import splashScreen from './assets/learnSplash.json'
// LogBox.ignoreAllLogs();

const Stack = createStackNavigator()

export default function App() {
  const [isLoaded, setLoading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => setLoading(true), 2000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!isLoaded)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView source={splashScreen} autoPlay loop />
      </View>
    )

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='SubCategories' component={SubCategories} />
        <Stack.Screen name='Questions' component={Questions} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
