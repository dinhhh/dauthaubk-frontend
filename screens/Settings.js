import React from "react";
import { Button, Text, View } from "react-native";
import { clearStorage, logStorage } from "../utils/AsynsStorage";
  
const Settings = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Settings Screen!</Text>
      
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