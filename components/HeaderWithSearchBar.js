import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"


export default function HeaderWithSearchBar() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchIcon}>
        {!isQuerying ? (
          <AntDesign name="search1" size={24} color="black" />
        ) : (
          <TouchableOpacity onPress={cancelQuery}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.searchBar}>
        <TextInput
          onTouchStart={onPressSearchBar}
          value={query}
          placeholder="Tìm kiếm bạn bè , tin nhắn"
          onChangeText={onChangeText}
        />
      </View>
      <View style={styles.qrIcon}>
        <AntDesign name="qrcode" size={24} color="black" />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 10,
  },

  searchIcon: {
    padding: 5,
    marginLeft: 10,
  },
  searchBar: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    marginLeft: 10,
    marginRight: 10,
  },
  qrIcon: {
    padding: 5,
  },
})