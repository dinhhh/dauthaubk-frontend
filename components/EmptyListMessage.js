import React, { useState } from 'react';
import { Text } from 'react-native';

const EmptyListMessage = ({ item }) => {
  return (
    <Text
      onPress={() => getItem( item )}>
      No Data Found
    </Text>
  );
};

export default EmptyListMessage;