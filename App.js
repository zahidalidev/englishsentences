import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import { LogBox } from "react-native";

import Home from './app/screens/homeScreen'
import SubCategories from './app/screens/subCategories'
import Questions from './app/screens/questions'

// LogBox.ignoreAllLogs();

const Stack = createStackNavigator()

export default function App() {
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
