import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, RefreshControl, FlatList, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SCREEN_MESSAGE } from '../constants/ScreenMessage';
import { getApi, postApi } from '../utils/ApiCaller';
import { API_PATH } from '../config/Api';
import SearchByGoodResult from '../components/SearchByGoodResult';
import BriefInfoContainer from '../components/BriefInfoContainer';
import ContractorBriefInfo from '../components/ContractorBriefInfo';
import ContractorBiddingInvitation from '../components/ContractorBiddingInvitationsContainer';
import ContractorSelectionPlan from '../components/ContractorSelectionPlanContainer';
import { FONT_SIZE } from '../constants/Size';
import AppLoader from '../components/AppLoader';

const data = [
  { label: SCREEN_MESSAGE.GIA_HANG_HOA, value: '1', api_path: API_PATH.SEARCH_GOODS_BY_NAME },
  { label: SCREEN_MESSAGE.KE_HOACH_CHON_NHA_THAU, value: '2', api_path: API_PATH.CONTRACTOR_SELECTION_PLANS },
  // { label: SCREEN_MESSAGE.THONG_BAO_MOI_SO_TUYEN, value: '3' },
  { label: SCREEN_MESSAGE.THONG_BAO_MOI_THAU, value: '4', api_path: API_PATH.CONTRACTOR_BIDDING_INVITATIONS },
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
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

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
    // setFetchedData(prev => []);
    if (keyword != '' && value == '1') {
      setLoading(true);
      const response = await getApi(API_PATH.SEARCH_GOODS_BY_NAME + "/" + keyword, page);
      setFetchedData(prev => {
        const x = [...prev, ...response["data"]];
        setLoading(false);
        return x;
      });
      setLoading(false);
      return;
    } 
    if (keyword != '') {
      const obj = getObjByValue(value);
      if (obj !== undefined) {
        setLoading(true);
        const path = obj["api_path"];
        const requestBody = {
          "keyword": keyword,
        };
        const response = await postApi(path, requestBody, page);
        setFetchedData(prev => {
          const x = [...prev, ...response["data"]];
          setLoading(false);
          return x;
        });
        setLoading(false);
        return;
      }
    } else {
      Alert.alert(SCREEN_MESSAGE.NHAP_TU_KHOA_DE_TIM_KIEM)
    }
  }

  const onRefresh = async () => {
    setFetchedData([]); // remove duplicate item
    await searchBtnHandler();
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
          biddingName={item["T??n g??i th???u"]}
          bidSolicitor={item["B??n m???i th???u"]}
          winContractor={item["Nh?? th???u tr??ng th???u"]}
          goods={item["H??ng h??a"]} />

      case '2':
        return <ContractorSelectionPlan 
          biddingName={item["Th??ng tin chi ti???t"]["T??n KHLCNT"]} 
          bidSolicitor={item["Th??ng tin chi ti???t"]["B??n m???i th???u"]}
          publishDate={item["Ng??y ????ng t???i"]}
          category={item["Th??ng tin chi ti???t"]["Ph??n lo???i"]}
          cost={item["Gi?? d??? to??n"]}
          navigate={navigation.navigate}
          destination={"BiddingDetails"} />
    
      case '4':
        return <ContractorBiddingInvitation 
          biddingName={item["Th??ng tin chi ti???t"]["T??n g??i th???u"]} 
          bidSolicitor={item["Th??ng tin chi ti???t"]["B??n m???i th???u"]}
          publishDate={item["Ng??y ????ng t???i"]}
          category={item["H??nh th???c d??? th???u"]}
          location={item["?????a ??i???m th???c hi???n g??i th???u"]}
          navigate={navigation.navigate}
          destination={"BiddingDetails"} />

      case '7':
        return <BriefInfoContainer 
          biddingName={item["Th??ng tin chi ti???t"]["T??n g??i th???u"]} 
          bidSolicitor={item["Th??ng tin chi ti???t"]["B??n m???i th???u"]}
          publishDate={item["Ng??y ????ng t???i"]}
          contractorWin={item["K???t qu???"]["Nh?? th???u tr??ng th???u"]}
          winCost={item["K???t qu???"]["Gi?? tr??ng th???u"]}
          biddingId={item["_id"]["$oid"]}
          navigate={navigation.navigate}
          destination={"BiddingDetails"} />

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
        Kh??ng c?? d??? li???u
      </Text>
    );
  };

  const navigateToBubbleChart = () => {
    if (keyword !== '' && value !== null) {
      switch (value) {
        case '4':
          navigation.navigate("BiddingInvitationBubbleChart", { keyword: keyword });
          break;
      
        default:
          Alert.alert(SCREEN_MESSAGE.CHUA_HO_TRO_XEM_BIEU_DO_VOI_LOAI_THONG_TIN_NAY);
          break;
      }
    } else {
      Alert.alert(SCREEN_MESSAGE.CHON_LOAI_THONG_TIN_VA_TU_KHOA)
    }
  }

  return (
    
    <View>
      {loading ? <AppLoader /> : <View></View>}
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
      style={styles.textInput}
      placeholder={SCREEN_MESSAGE.TU_KHOA}
      onChangeText={(text) => setKeyword(text)} 
      ref={textRef}
      />

      <View style={{flexDirection: "row", justifyContent: 'space-around', marginTop: 5, paddingBottom: 5}}>
        <Button title={SCREEN_MESSAGE.XOA_BO_LOC} 
        color={"#B3C100"} 
        style={styles.button} 
        onPress={resetBtnHandler}></Button>
        <Button title={SCREEN_MESSAGE.NANG_CAO} 
        color={"#34675C"} 
        style={styles.button}
        onPress={navigateToBubbleChart}></Button>
        <Button 
        title={SCREEN_MESSAGE.TIM_KIEM} 
        onPress={searchBtnHandler}></Button>
      </View>

      <FlatList
      data={fetchedData}
      keyExtractor={item => item["_id"]["$oid"]}
      renderItem={renderItemFlatList} 
      ListEmptyComponent={EmptyListMessage}
      onEndReached={getMoreData} 
      refreshControl={
        <RefreshControl 
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      ></FlatList>

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
    padding: 5,
    margin: 6,
    fontSize: FONT_SIZE.NORMAL,
    borderRadius: 5
  },
  
  button: {
    backgroundColor: "red",
  }
});

export default ContractorSearch;