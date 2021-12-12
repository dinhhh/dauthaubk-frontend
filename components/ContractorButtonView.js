import * as React from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SCREEN_MESSAGE } from "../constants/ScreenMessage";

const ContractorButtonView = ({ getData }) => {
  
  const LOG_TAG = "[ContractorButtonView] ";
  const NUM_BTN = 4;
  const [indexSelected, setIndexSelected] = React.useState([false, false, false, true]);

  const selectedHandler = async (index) => {
    console.log(LOG_TAG + "Click btn index " + index);
    await getData(index);
    newArr = [];
    for (let i = 0; i < NUM_BTN; i++) {
      newArr.push(false);
    }
    newArr[index] = true;
    setIndexSelected([...newArr]);
  }

    return (
    <View style={styles.container}>
        
      <TouchableOpacity 
      style={[styles.opacity, indexSelected[0] ? styles.opacitySelected : {}]} 
      onPress={() => selectedHandler(0)}>
        <Entypo name="text-document-inverted" size={32} color="black" />
        <Text style={styles.text}>{SCREEN_MESSAGE.KE_HOACH_CHON_NHA_THAU}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={[styles.opacity, indexSelected[1] ? styles.opacitySelected : {}]} 
      onPress={() => selectedHandler(1)}>
        <FontAwesome5 name="shopping-bag" size={32} color="black" />
        <Text style={styles.text}>{SCREEN_MESSAGE.THONG_BAO_MOI_SO_TUYEN}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={[styles.opacity, indexSelected[2] ? styles.opacitySelected : {}]} 
      onPress={() => selectedHandler(2)}>
        <MaterialCommunityIcons name="file-document" size={32} color="black" />
        <Text style={styles.text}>{SCREEN_MESSAGE.THONG_BAO_MOI_THAU}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={[styles.opacity, indexSelected[3] ? styles.opacitySelected : {}]} 
      onPress={() => selectedHandler(3)}>
        <MaterialIcons name="file-download-done" size={32} color="black" />
        <Text style={styles.text}>{SCREEN_MESSAGE.KET_QUA_TRUNG_THAU}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  opacity: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    color: "red"
  },

  opacitySelected: {
    borderWidth: 1,
    borderRadius: 10,
  },

  text: {
    textAlign: "center"
  }
});

export default ContractorButtonView;