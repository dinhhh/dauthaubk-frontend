import React from "react";
import { Button, Text, View } from "react-native";
import { clearStorage, logStorage } from "../utils/AsynsStorage";
  
const Settings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Settings Screen!</Text>
      
      <Button 
        onPress={() => navigation.navigate("Login")}
        title="Login"
      />

      <Button 
        onPress={() => navigation.navigate("Register")}
        title="Register"
      />

      <Button 
        onPress={clearStorage}
        title="Clear storage"
      />

      <Button 
        onPress={logStorage}
        title="Log storage"
      />
    </View>
  );
};

export default Settings;