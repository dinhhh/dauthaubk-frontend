import React from "react";
import { Button, Text, View } from "react-native";
import { SCREEN_MESSAGE } from "../constants/ScreenMessage";
  
const Register = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Register Screen!</Text>
      <Button title={SCREEN_MESSAGE.REGISTER}></Button>
    </View>
  );
};

export default Register;