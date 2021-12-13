import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FONT_SIZE } from "../constants/Size";

const SearchByGoodResult = ({ biddingName,
  bidSolicitor,
  winContractor }) => {

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.biddingName} numberOfLines={2} ellipsizeMode="tail">{biddingName}</Text>
        <Text style={styles.basicText} numberOfLines={1} ellipsizeMode="tail">Bên mời thầu: {bidSolicitor}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail">Nhà thầu trúng thầu: {winContractor}</Text>
      </View>
      <View style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        }} />
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

export default SearchByGoodResult;