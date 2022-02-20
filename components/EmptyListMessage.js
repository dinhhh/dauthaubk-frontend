import React, { useState } from 'react';
import { Text } from 'react-native';

const EmptyListMessage = ({ item }) => {
  return (
    <Text
      onPress={() => console.log("Clicked on empty flat list")}>
      Không có dữ liệu
    </Text>
  );
};

export default EmptyListMessage;