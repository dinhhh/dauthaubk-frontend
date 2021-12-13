import * as React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ContractorButtonView from "../components/ContractorButtonView";
import { SCREEN_MESSAGE } from "../constants/ScreenMessage";
import BriefInfoContainer from "../components/BriefInfoContainer";
import { API_PATH } from "../config/Api";
import { getApi } from "../utils/ApiCaller";
import ContractorBiddingInvitation from "../components/ContractorBiddingInvitationsContainer";

const ContractorHome = () => {

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
      setData(childData);
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
          getBiddingId={getBiddingId} />
        
        case 2:
          return <ContractorBiddingInvitation 
          biddingName={item["Thông tin chi tiết"]["Tên gói thầu"]} 
          bidSolicitor={item["Thông tin chi tiết"]["Bên mời thầu"]}
          publishDate={item["Ngày đăng tải"]}
          category={item["Hình thức dự thầu"]}
          location={item["Địa điểm thực hiện gói thầu"]} />
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
      <Text style={{ textTransform: 'uppercase'}}>{headerMessage}</Text>
      <FlatList
      data={fetchedData}
      renderItem={renderItem}
      keyExtractor={item => item["_id"]["$oid"]}
      onEndReached={getMoreData} ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ContractorHome;