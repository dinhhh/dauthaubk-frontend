import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import HomeStack from "./HomeStack";
import Register from "../screens/Register";
import News from "../screens/News";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='HomeScreen' component={HomeStack} options={{ headerShown: false }}></Tab.Screen>
      <Tab.Screen name='RegisterScreen' component={Register} ></Tab.Screen>
      <Tab.Screen name='NewsScreen' component={News} ></Tab.Screen>
      <Tab.Screen name='SettingsScreen' component={Settings} ></Tab.Screen>
    </Tab.Navigator>
  )
}

export default Tabs;