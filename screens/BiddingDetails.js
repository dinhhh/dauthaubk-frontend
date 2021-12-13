import React from "react";
import { Text, View } from "react-native";
  
const BiddingDetails = ({ route }) => {

  const LOG_TAG = "[BiddingDetails] ";
  // console.log(LOG_TAG + "obj id = " + route.params.id);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Bidding details {route.params.id} screen!</Text>
    </View>
  );
};
  
export default BiddingDetails;