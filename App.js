import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";

import Home from "./app/screens/HomeScreen";
import EditCategory from "./app/screens/EditCategoryScreen";
import EditProduct from "./app/screens/EditProductScreen";
import ProductList from "./app/screens/ProductListScreen";
import ProductDetails from "./app/screens/ProductDetailsScreen";

// LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EditCategory" component={EditCategory} />
        <Stack.Screen name="EditProduct" component={EditProduct} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
