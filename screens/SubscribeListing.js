import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { isLoggedIn } from "../utils/AuthToken";
import { SCREEN_MESSAGE } from "../constants/ScreenMessage";
import { FONT_SIZE } from "../constants/Size";
import GeneralBiddingInfo from "../components/GeneralBiddingInfo";
import EmptyListMessage from "../components/EmptyListMessage";
import { postApiWithAuth } from "../utils/ApiCaller";
import { API_PATH } from "../config/Api";
import BriefInfoContainer from "../components/BriefInfoContainer";
import ContractorSelectionPlan from "../components/ContractorSelectionPlanContainer";
import ContractorBiddingInvitation from "../components/ContractorBiddingInvitationsContainer";
import AppLoader from "../components/AppLoader";

const SubscribeListing = ({ navigation, route }) => {

  const [logged, setLogged] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(async () => {
    const logged = await isLoggedIn();
    console.log("Is logged = ", logged);
    setLogged(logged);
  }, [logged]);

  const [biddingResults, setBiddingResults] = useState([]);
  const [showBiddingResults, setShowBiddingResults] = useState(true);

  const [biddingSelectPlan, setBiddingSelectPlan] = useState([]);
  const [showBiddingSelectPlan, setShowBiddingSelectPlan] = useState(true);

  const [biddingInvitations, setBiddingInvitations] = useState([]);
  const [showBiddingInvitations, setShowBiddingInvitations] = useState(true);

  const callApi = async () => {
    const response = await postApiWithAuth(API_PATH.GET_SUBS, {});
    
    if (response.ok) {
      const responseJson = await response.json();
      setBiddingResults(responseJson["Thông báo trúng thầu"]);
      setBiddingSelectPlan(responseJson["Kế hoạch lựa chọn nhà thầu"]);
      setBiddingInvitations(responseJson["Thông báo mời thầu"]);
    } else {
      console.error("Error when fetch data from ", API_PATH.GET_SUBS);
    }
  }

  useEffect(async () => {
    await callApi();
    setLoading(false);
  }, [isLoading]);

  const onRefresh = async () => {
    setRefreshing(true);
    await callApi();
  }

  const notLoggedView = (
    <View style={{flex: 1, flexDirection: "row"}}>
      
      <Text style={styles.errorMessage}>{SCREEN_MESSAGE.DANG_NHAP_DE_SU_DUNG_TINH_NANG}</Text>
      
      <Button title="Login" onPress={() => navigation.navigate("Login")}/>
      
      <Button title="Register" onPress={() => navigation.navigate("Register")}/>

    </View>
  );

  const renderBidResultItems = ({ item }) => {
    try {
      return <BriefInfoContainer 
        biddingName={item["Thông tin chi tiết"]["Tên gói thầu"]} 
        bidSolicitor={item["Thông tin chi tiết"]["Bên mời thầu"]}
        publishDate={item["Ngày đăng tải"]}
        contractorWin={item["Kết quả"]["Nhà thầu trúng thầu"]}
        winCost={item["Kết quả"]["Giá trúng thầu"]}
        biddingId={item["Thông tin chi tiết"]["Số TBMT"]}
        getBiddingId={() => console.log("Clicked on")}
      />
    } catch (e) {
      return <Text>Error when render item in flat list</Text>
    }
  }

  const renderBidSelectPlanItems = ({ item }) => {
    try {
      return <ContractorSelectionPlan 
        biddingName={item["Thông tin chi tiết"]["Tên KHLCNT"]} 
        bidSolicitor={item["Thông tin chi tiết"]["Bên mời thầu"]}
        publishDate={item["Ngày đăng tải"]}
        category={item["Thông tin chi tiết"]["Phân loại"]}
        cost={item["Giá dự toán"]} />
    } catch (e) {
      console.error(e);
    }
  }

  const renderBidInvitationsItems = ({ item }) => {
    try {
      return <ContractorBiddingInvitation 
        biddingName={item["Thông tin chi tiết"]["Tên gói thầu"]} 
        bidSolicitor={item["Thông tin chi tiết"]["Bên mời thầu"]}
        publishDate={item["Ngày đăng tải"]}
        category={item["Hình thức dự thầu"]}
        location={item["Địa điểm thực hiện gói thầu"]} />
    } catch (e) {
      console.error(e);
    }
  }

  const loggedView = <View>

    <Button 
      onPress={() => navigation.navigate("Subscribe")}
      title={SCREEN_MESSAGE.CAI_DAT_THEO_DOI_THONG_TIN}
    />

    <Text style={{textAlign: "center", fontSize: FONT_SIZE.NORMAL}}>{SCREEN_MESSAGE.CAC_GOI_THAU_DANG_KY_NHAN_THONG_BAO}</Text>
    
    <TouchableOpacity onPress={() => setShowBiddingResults(!showBiddingResults)}>
      <Text style={styles.headerMessage}>{SCREEN_MESSAGE.KET_QUA_TRUNG_THAU}</Text>
    </TouchableOpacity>
    { showBiddingResults &&
      <FlatList 
        data={biddingResults}
        renderItem={renderBidResultItems}
        keyExtractor={item => item["Thông tin chi tiết"]["Số TBMT"]}
        ListEmptyComponent={EmptyListMessage}
        style={styles.flatList} // TODO: Hard code here
        refreshControl={
          <RefreshControl 
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
        />
    }

    <TouchableOpacity onPress={() => setShowBiddingSelectPlan(!showBiddingSelectPlan)}>
      <Text style={styles.headerMessage}>{SCREEN_MESSAGE.KE_HOACH_CHON_NHA_THAU}</Text>
    </TouchableOpacity>
    { showBiddingSelectPlan &&
      <FlatList 
        data={biddingSelectPlan}
        renderItem={renderBidSelectPlanItems}
        keyExtractor={item => item["Thông tin chi tiết"]["Số KHLCNT"]}
        ListEmptyComponent={EmptyListMessage}
        style={styles.flatList}
        refreshControl={
          <RefreshControl 
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
      />
    }

    <TouchableOpacity onPress={() => setShowBiddingInvitations(!showBiddingInvitations)}>
      <Text style={styles.headerMessage}>{SCREEN_MESSAGE.THONG_BAO_MOI_THAU}</Text>
    </TouchableOpacity>
    { showBiddingInvitations &&
      <FlatList 
        data={biddingInvitations}
        renderItem={renderBidInvitationsItems}
        keyExtractor={item => item["Thông tin chi tiết"]["Số TBMT"]}
        ListEmptyComponent={EmptyListMessage}
        style={styles.flatList}
        refreshControl={
          <RefreshControl 
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
      />
    }

  </View>;

  return (
    isLoading ? <AppLoader /> :
    <View style={styles.container}>
      {/* {logged ? loggedView : notLoggedView} */}
      {loggedView}
    </View>
  );

};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },

  errorMessage: {
    fontSize: FONT_SIZE.BIG, 
  },

  headerMessage: {
    textTransform: 'uppercase', 
    fontWeight: "bold",
    backgroundColor: "#B3C100",
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    width: 420
  },

  flatList: {
    width: 420,
  }
});

export default SubscribeListing;
