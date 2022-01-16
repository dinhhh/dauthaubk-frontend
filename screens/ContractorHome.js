import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ContractorButtonView from "../components/ContractorButtonView";
import { SCREEN_MESSAGE } from "../constants/ScreenMessage";
import BriefInfoContainer from "../components/BriefInfoContainer";
import { API_PATH } from "../config/Api";
import { getApi } from "../utils/ApiCaller";
import ContractorBiddingInvitation from "../components/ContractorBiddingInvitationsContainer";
import ContractorSelectionPlan from "../components/ContractorSelectionPlanContainer";
import EmptyListMessage from "../components/EmptyListMessage";

const ContractorHome = ({ navigate, destination }) => {

  const LOG_TAG = "[ContractorHome] ";

  const [data, setData] = React.useState(-1);
  const [fetchedData, setFetchedData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [headerMessage, setHeaderMessage] = React.useState(SCREEN_MESSAGE.KET_QUA_TRUNG_THAU);

  const getChildData = async (childData) => {
    if (childData != data) {
      setFetchedData(prev => {
        return [];
      });
      setPage(0);
      setData(prev => childData);
      getData(childData, 0);
    }
  }

  const getData = async (index, page) => {
    var path = '';
    switch (index) {
      case 3:
        path = API_PATH.CONTRACTOR_SELECTION_RESULTS;
        setHeaderMessage(SCREEN_MESSAGE.KET_QUA_TRUNG_THAU);
        break;
      case 2:
        path = API_PATH.CONTRACTOR_BIDDING_INVITATIONS;
        setHeaderMessage(SCREEN_MESSAGE.THONG_BAO_MOI_THAU);
        break;
      case 0:
        path = API_PATH.CONTRACTOR_SELECTION_PLANS;
        setHeaderMessage(SCREEN_MESSAGE.KE_HOACH_CHON_NHA_THAU);
        break;
      default:
        break;
    }

    let tempData = await getApi(path, page);
    setData(index); 
    setFetchedData(prev => {
      const x = [...prev, ...tempData["data"]];
      return x;
    });
  }

  const getBiddingId = (biddingId) => {
    console.log(LOG_TAG + " bidding id = " + biddingId);
  }

  const getMoreData = async () => {
    setPage(page + 1);
    getData(data, page + 1);
  }

  const renderItem = ({ item }) => {
    try {
      switch (data) {
        case 3:
          return <BriefInfoContainer 
          biddingName={item["Thông tin chi tiết"]["Tên gói thầu"]} 
          bidSolicitor={item["Thông tin chi tiết"]["Bên mời thầu"]}
          publishDate={item["Ngày đăng tải"]}
          contractorWin={item["Kết quả"]["Nhà thầu trúng thầu"]}
          winCost={item["Kết quả"]["Giá trúng thầu"]}
          biddingId={item["_id"]["$oid"]}
          getBiddingId={getBiddingId} 
          navigate={navigate}
          destination={destination} />
        
        case 2:
          return <ContractorBiddingInvitation 
          biddingName={item["Thông tin chi tiết"]["Tên gói thầu"]} 
          bidSolicitor={item["Thông tin chi tiết"]["Bên mời thầu"]}
          publishDate={item["Ngày đăng tải"]}
          category={item["Hình thức dự thầu"]}
          location={item["Địa điểm thực hiện gói thầu"]}
          navigate={navigate}
          destination={destination} />

        case 0:
          return <ContractorSelectionPlan 
          biddingName={item["Thông tin chi tiết"]["Tên KHLCNT"]} 
          bidSolicitor={item["Thông tin chi tiết"]["Bên mời thầu"]}
          publishDate={item["Ngày đăng tải"]}
          category={item["Thông tin chi tiết"]["Phân loại"]}
          cost={item["Giá dự toán"]} 
          navigate={navigate}
          destination={destination} />
        default:
          break;
      }
      
    } catch (error) {
      return <Text>Error when render item in flat list</Text>
    }
  }

  return (
    <View>
      <ContractorButtonView getChildData={getChildData}></ContractorButtonView>
      <Text style={styles.headerMessage}>{headerMessage}</Text>
      <FlatList
      data={fetchedData}
      renderItem={renderItem}
      keyExtractor={item => item["_id"]["$oid"]}
      onEndReached={getMoreData}
      ListEmptyComponent={EmptyListMessage} ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({

  headerMessage: {
    textTransform: 'uppercase', 
    fontWeight: "bold",
    backgroundColor: "#B3C100",
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
  }

});

export default ContractorHome;