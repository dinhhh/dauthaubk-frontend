import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import BiddingDetails from "../screens/BiddingDetails";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="BiddingDetails" component={BiddingDetails}></Stack.Screen>
    </Stack.Navigator>
  )
}