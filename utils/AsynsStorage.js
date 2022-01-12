import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearStorage = async () => {
  AsyncStorage.clear();
  console.log("Storage cleared ");
}

export const logStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    if (result.length == 0) {
      console.log("Storage is empty");
    }
    return result.forEach(console.log);
  } catch (error) {
    console.error(error);
  }
}
