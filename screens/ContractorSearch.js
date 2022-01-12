import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, FlatList } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SCREEN_MESSAGE } from '../constants/ScreenMessage';
import { getApi, postApi } from '../utils/ApiCaller';
import { API_PATH } from '../config/Api';
import SearchByGoodResult from '../components/SearchByGoodResult';
import BriefInfoContainer from '../components/BriefInfoContainer';
import ContractorBriefInfo from '../components/ContractorBriefInfo';

const data = [
  { label: SCREEN_MESSAGE.GIA_HANG_HOA, value: '1', api_path: API_PATH.SEARCH_GOODS_BY_NAME },
  // { label: SCREEN_MESSAGE.KE_HOACH_CHON_NHA_THAU, value: '2', api_path: API_PATH.CONTRACTOR_SELECTION_PLANS },
  // { label: SCREEN_MESSAGE.THONG_BAO_MOI_SO_TUYEN, value: '3' },
  // { label: SCREEN_MESSAGE.THONG_BAO_MOI_THAU, value: '4' },
  // { label: SCREEN_MESSAGE.KET_QUA_SO_TUYEN, value: '5' },
  // { label: SCREEN_MESSAGE.KET_QUA_MO_THAU_DIEN_TU, value: '6' },
  { label: SCREEN_MESSAGE.KET_QUA_LUA_CHON_NHA_THAU, value: '7', api_path: API_PATH.CONTRACTOR_SELECTION_RESULTS },
  { label: SCREEN_MESSAGE.NHA_THAU, value: '8', api_path: API_PATH.SEARCH_CONTRACTOR_INFO }
];

const ContractorSearch = ({ navigation }) => {

  const [value, setValue] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [fetchedData, setFetchedData] = useState([]);
  const [page, setPage] = useState(0);
  const textRef = useRef();

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

  const searchBtnHandler = async (page = 0) => {
    console.log("Start search by page " + page);
    if (keyword != '' && value == '1') {
      const response = await getApi(API_PATH.SEARCH_GOODS_BY_NAME + "/" + keyword, page);
      setFetchedData(prev => {
        const x = [...prev, ...response["data"]];
        return x;
      });
      return;
    } 
    if (keyword != '') {
      const obj = getObjByValue(value);
      if (obj !== undefined) {
        const path = obj["api_path"];
        const requestBody = {
          "keyword": keyword,
        };
        const response = await postApi(path, requestBody, page);
        setFetchedData(prev => {
          const x = [...prev, ...response["data"]];
          return x;
        });
        return;
      }
    }
  }

  const resetBtnHandler = () => {
    setFetchedData(prev => []);
    const obj = getObjByValue(value);
    console.log(JSON.stringify(obj));
    textRef.current.clear();
  }

  const getContractorDetailsId = async (objId) => {
    console.log("getContractorDetailsId in Contractor Search with object id = " + objId);
    const data = await getApi(API_PATH.GET_CONTRACTOR_BY_OBJ_ID + "/" + objId)
    navigation.navigate("ContractorDetails", { data: data });
  }

  const renderItemFlatList = ({ item }) => {
    console.log("render flat list with value " + value);
    switch (value) {
      case '1':
        return <SearchByGoodResult 
          biddingName={item["Tên gói thầu"]}
          bidSolicitor={item["Bên mời thầu"]}
          winContractor={item["Nhà thầu trúng thầu"]}
          goods={item["Hàng hóa"]} />
    
      case '7':
        return <BriefInfoContainer 
          biddingName={item["Thông tin chi tiết"]["Tên gói thầu"]} 
          bidSolicitor={item["Thông tin chi tiết"]["Bên mời thầu"]}
          publishDate={item["Ngày đăng tải"]}
          contractorWin={item["Kết quả"]["Nhà thầu trúng thầu"]}
          winCost={item["Kết quả"]["Giá trúng thầu"]}
          biddingId={item["_id"]["$oid"]} />

      case '8':
        return <ContractorBriefInfo 
          data={item} 
          getContractorDetailsId={getContractorDetailsId} />
      default:
        break;
    }
    
  } 

  const getMoreData = async () => {
    console.log("Start get more data");
    setPage(prev => {
      const x = prev + 1;
      return x;
    });
    await searchBtnHandler(page + 1);
  }

  const getObjByValue = (v) => {
    var res = {};
    data.forEach((obj, index) => {
      if (obj["value"] === v) {
        res = obj;
      }
    })
    return res;
  }

  const EmptyListMessage = ({ item }) => {
    return (
      <Text
        style={styles.emptyListStyle}
        onPress={() => getItem( item )}>
        No Data Found
      </Text>
    );
  };

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
          setFetchedData(prev => []);
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
      ref={textRef}
      />

      <View style={{flexDirection: "row", justifyContent: 'space-around', marginTop: 15, paddingBottom: 5}}>
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
      renderItem={renderItemFlatList} 
      ListEmptyComponent={EmptyListMessage}
      onEndReached={getMoreData} ></FlatList>

    </View>
  );
};

export const styles = StyleSheet.create({

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
  },
  
});

export default ContractorSearch;