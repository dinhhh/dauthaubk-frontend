import * as React from "react";
import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import ContractorButtonView from "../components/ContractorButtonView";
import { SCREEN_MESSAGE } from "../constants/ScreenMessage";
import BriefInfoContainer from "../components/BriefInfoContainer";
import { API_PATH } from "../config/Api";
import { getApi } from "../utils/ApiCaller";
import ContractorBiddingInvitation from "../components/ContractorBiddingInvitationsContainer";
import ContractorSelectionPlan from "../components/ContractorSelectionPlanContainer";
import EmptyListMessage from "../components/EmptyListMessage";
import AppLoader from "../components/AppLoader";

const ContractorHome = ({ navigate, destination }) => {

  const LOG_TAG = "[ContractorHome] ";

  const [data, setData] = React.useState(-1);
  const [fetchedData, setFetchedData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [headerMessage, setHeaderMessage] = React.useState(SCREEN_MESSAGE.KET_QUA_TRUNG_THAU);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

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
    setLoading(true);
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
    setLoading(false);
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

  const onRefresh = async () => {
    setPage(0);
    setFetchedData(prev => []);
    getData(data, 0);
  }

  const renderItem = ({ item }) => {
    try {
      switch (data) {
        case 3:
          return <BriefInfoContainer 
          biddingName={item["Th??ng tin chi ti???t"]["T??n g??i th???u"]} 
          bidSolicitor={item["Th??ng tin chi ti???t"]["B??n m???i th???u"]}
          publishDate={item["Ng??y ????ng t???i"]}
          contractorWin={item["K???t qu???"]["Nh?? th???u tr??ng th???u"]}
          winCost={item["K???t qu???"]["Gi?? tr??ng th???u"]}
          biddingId={item["_id"]["$oid"]}
          getBiddingId={getBiddingId} 
          navigate={navigate}
          destination={destination} />
        
        case 2:
          return <ContractorBiddingInvitation 
          biddingName={item["Th??ng tin chi ti???t"]["T??n g??i th???u"]} 
          bidSolicitor={item["Th??ng tin chi ti???t"]["B??n m???i th???u"]}
          publishDate={item["Ng??y ????ng t???i"]}
          category={item["H??nh th???c d??? th???u"]}
          location={item["?????a ??i???m th???c hi???n g??i th???u"]}
          navigate={navigate}
          destination={destination} />

        case 0:
          return <ContractorSelectionPlan 
          biddingName={item["Th??ng tin chi ti???t"]["T??n KHLCNT"]} 
          bidSolicitor={item["Th??ng tin chi ti???t"]["B??n m???i th???u"]}
          publishDate={item["Ng??y ????ng t???i"]}
          category={item["Th??ng tin chi ti???t"]["Ph??n lo???i"]}
          cost={item["Gi?? d??? to??n"]} 
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
      {loading ? <AppLoader /> : <View></View>}
      <ContractorButtonView getChildData={getChildData}></ContractorButtonView>
      <Text style={styles.headerMessage}>{headerMessage}</Text>
      <FlatList
      data={fetchedData}
      renderItem={renderItem}
      keyExtractor={item => item["_id"]["$oid"]}
      onEndReached={getMoreData}
      ListEmptyComponent={EmptyListMessage}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      } ></FlatList>
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