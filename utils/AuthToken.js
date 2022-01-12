import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config/Api';

export const AUTH_TOKEN_STORAGE_KEY = "authTokenKey";
export const REFRESH_TOKEN_STORAGE_KEY = "refreshTokenKey";
const REFRESH_TOKEN_PATH = "/user/refresh";

export const storeToken = async (key, value) => {
  try {
    console.log("Save token: ", key, value);
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("Error when save auth token...");
  }
}

export const getToken = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // TODO: implement get auth token by refresh token
      console.log("Auth token is ", value);
      return value;
    }
  } catch(e) {
    console.log("Error when get auth token...");
    throw new Error("Error when get auth token");
  }
}

const refreshToken = async () => {
  const errorMessage = "Error when refresh token";
  try {
    const refreshToken = await getToken(REFRESH_TOKEN_STORAGE_KEY);

    if (refreshToken !== null) {
      const refreshToken = await getToken(REFRESH_TOKEN_STORAGE_KEY);

      const response = await fetch(API_URL + REFRESH_TOKEN_PATH, {
        method: 'POST',
        headers: {
          "Authorization": refreshToken
        }
      })
      .then(response => {
        if (response.ok) {
          const myJson = response.json();
          storeToken(AUTH_TOKEN_STORAGE_KEY, myJson.access_token);
        } else {
          console.log(errorMessage);
        }
      });
    }

  } catch(e) {
    console.log(errorMessage);
  }
}

export const isLoggedIn = async () => {
  const authToken = await getToken(AUTH_TOKEN_STORAGE_KEY);
  if (authToken) {
    console.log("Auth token is ", authToken);
    return true;
  }
  return false;
}
