import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import CATEGORY_NAME from "../constants/CategoryName";

const CategoryLabel = ({ name }) => {
  const LOG_TAG = "[CategoryLabel] ";
  console.log(LOG_TAG + "name " + name);
  switch (name) {
    case CATEGORY_NAME.TRUC_TIEP:
      return (<View style={styles.label}>{name}</View>);
    
    case CATEGORY_NAME.TU_VAN:
      return (<View style={styles.label}>{name}</View>);
    
    case CATEGORY_NAME.QUA_MANG:
      return (<View style={styles.label}>{name}</View>);
    
    default:
      break;
  }
};

const styles = StyleSheet.create({
  label: {
    borderWidth: 5,
    borderRadius: 10,
  }
});

export default CategoryLabel;
