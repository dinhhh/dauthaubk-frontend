import React, { useState } from "react";
import { View, TextInput, Alert, StyleSheet, Button } from "react-native";
import { API_URL } from "../config/Api";
import { storeToken, AUTH_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY, getToken } from "../utils/AuthToken";
import { FONT_SIZE } from "../constants/Size";

const LOGIN_API_PATH = "/user/login";

export const login = async (email, pw) => {

  if ( !(email && pw) ) {
    throw new Error("Email and pw must not be null")
  }
  
  const requestBody = {
    "password": pw,
    "email": email
  }

  const response = await fetch (API_URL + LOGIN_API_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
  .then(async (response) => {
    if (response.ok) {
      console.log("Login success");
      const myJson = await response.json();

      await storeToken(AUTH_TOKEN_STORAGE_KEY, myJson.access_token);
      await storeToken(REFRESH_TOKEN_STORAGE_KEY, myJson.refresh_token);
    } else {
      throw new Error("Login fail...")
    }
  })
}


const Login = ({ navigation }) => {
  
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const signIn = async () => {
    try {
      await login(email, pw);
      navigation.navigate("SubscribeListing", { logged: true });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize="none"
        placeholderTextColor='black'
        onChangeText={val => setEmail(val)}
      />

      <TextInput
        style={styles.input}
        placeholder='Mật khẩu'
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor='black'
        onChangeText={val => setPw(val)}
      />

      <Button
        title='Đăng nhập'
        onPress={signIn}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: FONT_SIZE.NORMAL,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column"
  },
})

export default Login;
