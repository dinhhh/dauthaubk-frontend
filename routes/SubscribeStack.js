import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import Register from "../screens/Register";
import Login from "../screens/Login";
import SubscribeListing from "../screens/SubscribeListing";
import Subscribe from "../screens/Subscribe";
import BiddingDetails from "../screens/BiddingDetails";

const Stack = createNativeStackNavigator();

export default function SubscribeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SubscribeListing" component={SubscribeListing} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="Subscribe" component={Subscribe} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="BiddingDetails" component={BiddingDetails} options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
  )
}