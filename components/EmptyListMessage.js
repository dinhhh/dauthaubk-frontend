import React, { useState } from 'react';
import { Text } from 'react-native';

export default EmptyListMessage = ({ item }) => {
  return (
    <Text
      style={styles.emptyListStyle}
      onPress={() => getItem( item )}>
      No Data Found
    </Text>
  );
};