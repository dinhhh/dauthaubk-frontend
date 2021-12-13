import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FONT_SIZE } from "../constants/Size";

const ContractorSelectionPlan = ({ biddingName, 
  bidSolicitor,
  publishDate,
  category,
  cost }) => {
  const LOG_TAG = "[ContractorSelectionPlan] ";

  const clickOpacityHandler = () => {
    console.log(LOG_TAG + "User click bidding id = " + biddingId);
    getBiddingId(biddingId);
  }

  return (
    <TouchableOpacity onPress={clickOpacityHandler}>
      <View style={styles.container}>
        <Text style={styles.biddingName} numberOfLines={2} ellipsizeMode="tail">{biddingName}</Text>
        <Text style={styles.basicText} numberOfLines={1} ellipsizeMode="tail">Bên mời thầu: {bidSolicitor}</Text>
        <Text style={styles.publishDate}>Thời điểm đăng tải: {publishDate}</Text>
        <Text>Phân loại: {category}</Text>
        <Text style={styles.biddingCost}>Giá dự toán:  
          <Text style={styles.highLightText}>{cost}</Text>
        </Text>
        <View style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            }} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  
  container: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },

  biddingName: {
    fontSize: FONT_SIZE.NORMAL,
    fontWeight: "bold",
    color: "#34675C",
  },

  basicText: {

  },

  publishDate: {
    color: "#757575",
  },

  highLightText: {
    color: "#FA4848",
    fontWeight: "bold"
  },

  biddingCost: {
    fontStyle: "italic"
  }
});

export default ContractorSelectionPlan;