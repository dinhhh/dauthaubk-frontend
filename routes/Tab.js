import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import HomeStack from "./HomeStack";
import Register from "../screens/Register";
import News from "../screens/News";
import SettingsStack from "../routes/SettingsStack";
import ContractorSearch from "../screens/ContractorSearch";
import SearchStack from "./SearchStack";
import SubscribeStack from "./SubscribeStack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='HomeScreen' component={HomeStack} options={{ headerShown: false }}></Tab.Screen>
      <Tab.Screen name='Searching' component={SearchStack} options={{ headerShown: false }} ></Tab.Screen>
      <Tab.Screen name='SubscribeStack' component={SubscribeStack} ></Tab.Screen>
      <Tab.Screen name='NewsScreen' component={News} ></Tab.Screen>
      <Tab.Screen name='SettingsStack' component={SettingsStack} ></Tab.Screen>
    </Tab.Navigator>
  )
}

export default Tabs;