import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FONT_SIZE } from "../constants/Size";
import CategoryLabel from "./CategoryLabel";
import { CATEGORY_NAME } from "../constants/CategoryName";

const BriefInfoContainer = ({ biddingName, bidSolicitor, publishDate, contractorWin, winCost, 
  biddingId, getBiddingId }) => {
  const LOG_TAG = "[BriefInfoContainer] ";

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
        <Text>Nhà thầu trúng thầu: <Text style={styles.highLightText}>{contractorWin}</Text></Text>
        <Text style={styles.biddingCost}>Giá trúng thầu: {winCost}</Text>
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

export default BriefInfoContainer;
