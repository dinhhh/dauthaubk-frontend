import React, { useState } from 'react';
import { Text } from 'react-native';

const EmptyListMessage = ({ item }) => {
  return (
    <Text
      onPress={() => console.log("Clicked on empty flat list")}>
      No Data Found
    </Text>
  );
};

export default EmptyListMessage;