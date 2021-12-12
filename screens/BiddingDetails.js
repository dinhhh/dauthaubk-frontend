import React from "react";
import { Text, View } from "react-native";
  
const BiddingDetails = ({ objId }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Bidding details {objId} screen!</Text>
    </View>
  );
};
  
export default BiddingDetails;