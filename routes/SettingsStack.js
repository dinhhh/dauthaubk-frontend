import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Setting from "../screens/Settings";

const Stack = createNativeStackNavigator();

export default function SearchStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
  );
}