import React, { useState } from "react";
import { Button, Text, View, TextInput, StyleSheet, Alert, ScrollView } from "react-native";
import { FONT_SIZE } from "../constants/Size";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { postApi } from "../utils/ApiCaller";
import { API_PATH, API_URL } from "../config/Api";
import { login } from "./Login";
import { NavigationContainer } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker'; // https://github.com/hossein-zare/react-native-dropdown-picker
import { SCREEN_MESSAGE } from "../constants/ScreenMessage";
import { NAME_CONSTANTS } from "../constants/NameConstants";
import { postApiWithAuth } from "../utils/ApiCaller";

const Register = ({ navigation }) => {
  const contractor = "Nhà thầu";
  const investor = "Nhà đầu tư";
  const typeData = [{label: contractor, value: contractor}, {label: investor, value: investor}];

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState(contractor);
  const [solicitor, setSolicitor] = useState("");

  const [bidCategoryOpen, setBidCategoryOpen] = useState(false);
  const [bidCategoryValue, setBidCategoryValue] = useState([]);
  const [bidCategoryItems, setBidCategoryItems] = useState([
    {label: SCREEN_MESSAGE.XAY_LAP, value: SCREEN_MESSAGE.XAY_LAP},
    {label: SCREEN_MESSAGE.HANG_HOA, value: SCREEN_MESSAGE.HANG_HOA},
    {label: SCREEN_MESSAGE.HON_HOP, value: SCREEN_MESSAGE.HON_HOP},
    {label: SCREEN_MESSAGE.TU_VAN, value: SCREEN_MESSAGE.TU_VAN},
    {label: SCREEN_MESSAGE.PHI_TU_VAN, value: SCREEN_MESSAGE.PHI_TU_VAN},
  ]);

  const [provincesOpen, setProvincesOpen] = useState(false);
  const [provincesValue, setProvincesValue] = useState([]);
  const [provincesItems, setProvincesItems] = useState(NAME_CONSTANTS.PROVINCES.map(province => ({label: province, value: province})));

  const [bidFormOpen, setBidFormOpen] = useState(false);
  const [bidFormValue, setBidFormValue] = useState([]);
  const [bidFormItems, setBidFormItems] = useState([
    {label: SCREEN_MESSAGE.TRUC_TIEP, value: SCREEN_MESSAGE.TRUC_TIEP},
    {label: SCREEN_MESSAGE.QUA_MANG, value: SCREEN_MESSAGE.QUA_MANG},
  ])

  DropDownPicker.setMode("BADGE");

  const signUp = async () => {

    if ( !(userName && password && email) ) {
      Alert.alert("Empty field", "Please fill in all required field")
    } else {
      const requestBody = {
        "password": password,
        "email": email,
        "type": type,
        "username": userName
      }

      const response = await fetch(API_URL + API_PATH.USER_REGISTER,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        })
        .then(async (response) => {
          
          if (response.ok) {
            Alert.alert("Kết quả", "Tạo tài khoản thành công");
          
            try {
              login(email, password);
              // TODO: redirect to result screen....
              navigation.navigate("SubscribeListing");
            } catch {
              console.log("Login fail...");
            }
          
          } else {
            Alert.alert("Kết quả", "Email của bạn đã được đăng ký trên hệ thống");
          }

        });

      console.log(response);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Tài khoản'
        autoCapitalize="none"
        placeholderTextColor='black'
        onChangeText={val => setUserName(val)}
      />
      <TextInput
        style={styles.input}
        placeholder='Mật khẩu'
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor='black'
        onChangeText={val => setPassword(val)}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        autoCapitalize="none"
        placeholderTextColor='black'
        onChangeText={val => setEmail(val)}
      />
      <RadioForm 
        radio_props={typeData}
        onPress={(value) => setType(value)}
        formHorizontal={true}
      />
      {/* <TextInput
        style={styles.input}
        placeholder='Bên mời thầu quan tâm'
        autoCapitalize="none"
        placeholderTextColor='black'
        onChangeText={val => setSolicitor(val)}
      />

      <DropDownPicker
        open={bidCategoryOpen}
        value={bidCategoryValue}
        items={bidCategoryItems}
        setOpen={setBidCategoryOpen}
        setValue={setBidCategoryValue}
        setItems={setBidCategoryItems}
        multiple={true}
        min={0}
        max={10}
        placeholder={SCREEN_MESSAGE.LINH_VUC_QUAN_TAM}
        style={{borderRadius: 14, borderWidth: 0, width: 350, height: 55, alignSelf: "center", margin: 10, marginBottom: bidCategoryOpen ? 180 : 10}}
        dropDownDirection="BOTTOM"
        dropDownContainerStyle={{borderRadius: 14, borderWidth: 0, width: 350, alignSelf: "center"}}
        closeOnBackPressed={true}
        badgeDotColors={["red", "blue", "orange"]}
        textStyle={{fontSize: FONT_SIZE.NORMAL}}
        flatListProps={{height: 150}}
        translation={{
          PLACEHOLDER: SCREEN_MESSAGE.LINH_VUC_QUAN_TAM,
          SEARCH_PLACEHOLDER: SCREEN_MESSAGE.TIM_KIEM,
          SELECTED_ITEMS_COUNT_TEXT: "Đã chọn {count}",
          NOTHING_TO_SHOW: SCREEN_MESSAGE.KHONG_CO_DU_LIEU,
        }}
        searchable={true}
        searchContainerStyle={{borderWidth: 0, borderBottomWidth: 0, padding: 5}}
        searchTextInputStyle={{
          borderWidth: 0.3,
          paddingLeft: 3,
        }}
      />

      <DropDownPicker
        open={provincesOpen}
        value={provincesValue}
        items={provincesItems}
        setOpen={setProvincesOpen}
        setValue={setProvincesValue}
        setItems={setProvincesItems}
        multiple={true}
        min={0}
        max={63}
        placeholder={SCREEN_MESSAGE.DIA_PHUONG}
        style={{borderRadius: 14, borderWidth: 0, width: 350, height: 55, alignSelf: "center", margin: provincesOpen ? 180 : 10}}
        dropDownDirection="BOTTOM"
        dropDownContainerStyle={{borderRadius: 14, borderWidth: 0, width: 350, alignSelf: "center"}}
        closeOnBackPressed={true}
        badgeDotColors={["red", "blue", "orange"]}
        textStyle={{fontSize: FONT_SIZE.NORMAL}}
        flatListProps={{height: 100}}
        translation={{
          PLACEHOLDER: SCREEN_MESSAGE.DIA_PHUONG,
          SEARCH_PLACEHOLDER: SCREEN_MESSAGE.TIM_KIEM,
          SELECTED_ITEMS_COUNT_TEXT: "Đã chọn {count}",
          NOTHING_TO_SHOW: SCREEN_MESSAGE.KHONG_CO_DU_LIEU,
        }}
        searchable={true}
        searchContainerStyle={{borderWidth: 0, borderBottomWidth: 0, padding: 5}}
        searchTextInputStyle={{
          borderWidth: 0.3,
          paddingLeft: 3,
        }}
      />

      <DropDownPicker
        open={bidFormOpen}
        value={bidFormValue}
        items={bidFormItems}
        setOpen={setBidFormOpen}
        setValue={setBidFormValue}
        setItems={setBidFormItems}
        multiple={true}
        min={0}
        max={63}
        placeholder={SCREEN_MESSAGE.HINH_THUC_THAM_DU_THAU}
        style={{borderRadius: 14, borderWidth: 0, width: 350, height: 55, alignSelf: "center", margin: 10}}
        dropDownDirection="BOTTOM"
        dropDownContainerStyle={{borderRadius: 14, borderWidth: 0, width: 350, alignSelf: "center"}}
        closeOnBackPressed={true}
        badgeDotColors={["red", "blue", "orange"]}
        textStyle={{fontSize: FONT_SIZE.NORMAL}}
        flatListProps={{height: 100}}
        translation={{
          PLACEHOLDER: SCREEN_MESSAGE.HINH_THUC_THAM_DU_THAU,
          SEARCH_PLACEHOLDER: SCREEN_MESSAGE.TIM_KIEM,
          SELECTED_ITEMS_COUNT_TEXT: "Đã chọn {count}",
          NOTHING_TO_SHOW: SCREEN_MESSAGE.KHONG_CO_DU_LIEU,
        }}
        searchable={true}
        searchContainerStyle={{borderWidth: 0, borderBottomWidth: 0, padding: 5}}
        searchTextInputStyle={{
          borderWidth: 0.3,
          paddingLeft: 3,
        }}
      /> */}
      <Button
        title='Đăng ký'
        onPress={signUp}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  label: {
    fontSize: FONT_SIZE.NORMAL,
    textAlign: "left"
  },
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 14,
    fontSize: FONT_SIZE.NORMAL,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column"
  },
})

export default Register;
