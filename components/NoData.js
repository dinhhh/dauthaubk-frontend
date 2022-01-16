import React from 'react';
import { Text, View } from 'react-native';

const NoData = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        onPress={() => console.log("Clicked on empty flat list")}
        style={{color: "red", fontSize: 20}}>
        No Data Found
      </Text>
    </View>
  );
};

export default NoData;