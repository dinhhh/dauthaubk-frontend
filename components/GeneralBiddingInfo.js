import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { FONT_SIZE } from "../constants/Size";

const GeneralBiddingInfo = ({ objId, biddingName, bidSolicitor, publishDate }) => {
  return (
    <TouchableOpacity >
      <View style={styles.container}>
        <Text style={styles.biddingName} numberOfLines={2} ellipsizeMode="tail">{biddingName}</Text>
        <Text style={styles.basicText} numberOfLines={1} ellipsizeMode="tail">Bên mời thầu: {bidSolicitor}</Text>
        <Text style={styles.publishDate}>Thời điểm đăng tải: {publishDate}</Text>
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
});

export default GeneralBiddingInfo;