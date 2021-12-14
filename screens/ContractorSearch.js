import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SCREEN_MESSAGE } from '../constants/ScreenMessage';
import { getApi } from '../utils/ApiCaller';
import { API_PATH } from '../config/Api';
import SearchByGoodResult from '../components/SearchByGoodResult';

const data = [
  { label: SCREEN_MESSAGE.GIA_HANG_HOA, value: '1' },
  { label: SCREEN_MESSAGE.KE_HOACH_CHON_NHA_THAU, value: '2' },
  { label: SCREEN_MESSAGE.THONG_BAO_MOI_SO_TUYEN, value: '3' },
  { label: SCREEN_MESSAGE.THONG_BAO_MOI_THAU, value: '4' },
  { label: SCREEN_MESSAGE.KET_QUA_SO_TUYEN, value: '5' },
  { label: SCREEN_MESSAGE.KET_QUA_MO_THAU_DIEN_TU, value: '6' },
  { label: SCREEN_MESSAGE.KET_QUA_LUA_CHON_NHA_THAU, value: '7' },
];

const ContractorSearch = () => {
  
  const [value, setValue] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [fetchedData, setFetchedData] = useState([]);

  const renderItem = (item) => {
    return (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === value && (
      <AntDesign
        style={styles.icon}
        color="black"
        name="Safety"
        size={20}
      />
      )}
    </View>
    );
  };

  const searchBtnHandler = async () => {
    console.log("Start search keyword = " + keyword);
    if (keyword != '') {
      const response = await getApi(API_PATH.SEARCH_GOODS_BY_NAME + "/" + keyword);
      setFetchedData(prev => response["data"]);
    }
  }

  const resetBtnHandler = () => {
    setFetchedData(prev => []);
    setKeyword(prev => '');
  }

  const renderItemFlatList = ({ item }) => {
    return <SearchByGoodResult 
    biddingName={item["Tên gói thầu"]}
    bidSolicitor={item["Bên mời thầu"]}
    winContractor={item["Nhà thầu trúng thầu"]}
    goods={item["Hàng hóa"]} />
  } 

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={SCREEN_MESSAGE.LOAI_THONG_TIN}
        searchPlaceholder={SCREEN_MESSAGE.TIM_KIEM_DOT}
        value={value}
        onChange={item => {
            setValue(item.value);
        }}
        renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
        renderItem={renderItem}
      />

      <TextInput
      styles={styles.textInput}
      placeholder={SCREEN_MESSAGE.TU_KHOA}
      onChangeText={(text) => setKeyword(text)} 
      />

      <View style={{flexDirection: "row", justifyContent: 'space-around', marginTop: 15}}>
        <Button title={SCREEN_MESSAGE.XOA_BO_LOC} 
        color={"#B3C100"} 
        style={styles.button} 
        onPress={resetBtnHandler}></Button>
        <Button title={SCREEN_MESSAGE.NANG_CAO} 
        color={"#34675C"} 
        style={styles.button}></Button>
        <Button 
        title={SCREEN_MESSAGE.TIM_KIEM} 
        onPress={searchBtnHandler}></Button>
      </View>

      <FlatList
      data={fetchedData}
      keyExtractor={item => item["_id"]["$oid"]}
      renderItem={renderItemFlatList}></FlatList>

    </View>
  );
};

const styles = StyleSheet.create({

  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  icon: {
    marginRight: 5,
  },

  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textItem: {
    flex: 1,
    fontSize: 16,
  },

  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    fontSize: 16,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  textInput: {
    borderColor: "#777",
    borderWidth: 1,
    padding: 8,
    margin: 16,
    width: 400,
  },
  
});

export default ContractorSearch;