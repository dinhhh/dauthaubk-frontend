import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SCREEN_MESSAGE } from "../constants/ScreenMessage";
import { Table, Row } from "react-native-table-component";
import AppLoader from "../components/AppLoader";
import { postApiWithOutPaging } from "../utils/ApiCaller";
import { API_PATH } from "../config/Api";
import NoData from "../components/NoData";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TableView = ({ data, headerTitle }) => {

  if (data === undefined) {
    return <View></View>
  }

  if ( !Array.isArray(data) ) {
    const widthArr = [190, 220];
    const tableData = [];
    
    for (key in data) {
      const rowData = [];

      if (key === "_id" || Array.isArray(data[key])) {
        continue; // skip display object id
      }
      
      rowData.push(key);
      rowData.push(data[key]);
      tableData.push(rowData);
    }

    return (<View style={{flex: 1}}>
              <Text style={styles.headerTitle}>{headerTitle}</Text>
              <ScrollView >
                <Table>
                  {
                    tableData.map((rowData, index) => (
                      <Row 
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        textStyle={styles.basicText}
                        style={[styles.row, index % 2 && {backgroundColor: '#E7E6E1'}]}/>
                    ))
                  }
                </Table>
              </ScrollView>
            </View>);
  } else {

    if (data.length == 0) {
      return <View></View>
    }

    const tableHeader = [];
    const tableData = [];
    const widthArr = [];

    for (key in data[0]) {
      tableHeader.push(key);
      widthArr.push(190);
    }

    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      const rowData = [];
      for (var key in obj) {
        rowData.push(obj[key]);
      }
      tableData.push(rowData);
    }

    return (<View style={{flex: 1}}>
              <Text style={styles.headerTitle}>{headerTitle}</Text>
              <ScrollView horizontal={true}>
                <View>
                  <Table>
                    <Row data={tableHeader} widthArr={widthArr} 
                    style={{marginLeft: 2}}
                    textStyle={{textTransform: 'uppercase', fontWeight: "bold", backgroundColor: "#B3C100", paddingLeft: 10}}></Row>
                  </Table>
                
                  <ScrollView >
                    <Table>
                      {
                        tableData.map((rowData, index) => (
                          <Row 
                            key={index}
                            data={rowData}
                            widthArr={widthArr}
                            textStyle={styles.basicText}
                            style={[styles.row, index % 2 && {backgroundColor: '#E7E6E1'}]}/>
                        ))
                      }
                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>
            </View>);
  }
}

const BiddingDetails = ({ route }) => {

  const bidName = route?.params?.bidName;
  const solicitor = route?.params?.solicitor;
  const isPlan = route?.params?.isPlan === undefined ? false : route?.params?.isPlan;
  const defaultVisibleIndex = route?.params?.defaultVisibleIndex;
  console.log("Bid name: ", bidName, " Solicitor: ", solicitor, "Is plan: ", isPlan);

  const iconColor = "#000";
  const iconSize = 30;

  const totalSubView = 4;
  
  const initVisibleArr = [];
  for (var i = 0; i < totalSubView; i++) {
    initVisibleArr.push(false);
  }
  if (defaultVisibleIndex !== undefined) {
    initVisibleArr[defaultVisibleIndex] = true;
  }

  const [visibleArr, setVisibleArr] = useState(initVisibleArr);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const setVisibleArrCustom = ( index ) => {
    if (index > visibleArr.length - 1 || index < 0 ) {
      throw new Error("Invalid index parameter...");
    }

    const tempArr = [];
    for (var i = 0; i < visibleArr.length; i++) {
      tempArr.push(false);
    }
    tempArr[index] = true;

    setVisibleArr(tempArr);
  }

  useEffect(async () => {
    const requestBody = {
      "bidName": bidName,
      "solicitor": solicitor,
      "isPlan": isPlan
    };
    const response = await postApiWithOutPaging(API_PATH.SEARCH_BID_BY_NAME, requestBody);

    if (response.ok) {
      const resJson = await response.json();
      setData(resJson);
    }

    setLoading(false);
  }, []);

  return (
    isLoading ? <AppLoader /> :
    <View style={{ flex: 1, alignItems: "center" }}>

      <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 10}}>
        <TouchableOpacity 
          style={[styles.opacity, visibleArr[0] ? styles.opacitySelected : {}]} 
          onPress={() => setVisibleArrCustom(0)}>
          <Entypo name="text-document-inverted" size={32} color="black" />
          <Text style={styles.text}>{SCREEN_MESSAGE.KE_HOACH_CHON_NHA_THAU}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.opacity, visibleArr[1] ? styles.opacitySelected : {}]} 
          onPress={() => setVisibleArrCustom(1)}>
          <FontAwesome5 name="shopping-bag" size={32} color="black" />
          <Text style={styles.text}>{SCREEN_MESSAGE.THONG_BAO_MOI_SO_TUYEN}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.opacity, visibleArr[2] ? styles.opacitySelected : {}]} 
          onPress={() => setVisibleArrCustom(2)}>
          <MaterialCommunityIcons name="file-document" size={32} color="black" />
          <Text style={styles.text}>{SCREEN_MESSAGE.THONG_BAO_MOI_THAU}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.opacity, visibleArr[3] ? styles.opacitySelected : {}]} 
          onPress={() => setVisibleArrCustom(3)}>
          <MaterialIcons name="file-download-done" size={32} color="black" />
          <Text style={styles.text}>{SCREEN_MESSAGE.KET_QUA_TRUNG_THAU}</Text>
        </TouchableOpacity>
      </View>

      {visibleArr[0] && (data["Kế hoạch lựa chọn nhà thầu"] === null ? <NoData /> : <View style={styles.viewWrapper}>
        <TableView data={data["Kế hoạch lựa chọn nhà thầu"]["Thông tin chi tiết"]} headerTitle={"Thông tin chi tiết"} />
        <TableView data={data["Kế hoạch lựa chọn nhà thầu"]["Tham dự thầu"]} headerTitle={"Tham dự thầu"} />
      </View>)}

      {visibleArr[1] && (data["Kết quả sơ tuyển"] === null ? <NoData /> : <View style={styles.viewWrapper}>
        <TableView data={data["Kết quả sơ tuyển"]["Thông tin chi tiết"]} headerTitle={"Thông tin chi tiết"} />
      </View>)}

      {visibleArr[2] && (data["Thông báo mời thầu"] === null ? <NoData /> : <View style={styles.viewWrapper}>
        <TableView data={data["Thông báo mời thầu"]["Thông tin chi tiết"]} headerTitle={"Thông tin chi tiết"} />
        <TableView data={data["Thông báo mời thầu"]["Tham dự thầu"]} headerTitle={"Tham dự thầu"} />
        <TableView data={data["Thông báo mời thầu"]["Mở thầu"]} headerTitle={"Mở thầu"} />
        <TableView data={data["Thông báo mời thầu"]["Bảo đảm dự thầu"]} headerTitle={"Bảo đảm dự thầu"} />
      </View>)}

      {visibleArr[3] && (data["Kết quả trúng thầu"] === null ? <NoData /> : <View style={styles.viewWrapper}>
        <TableView data={data["Kết quả trúng thầu"]["Thông tin chi tiết"]} headerTitle={"Thông tin chi tiết"} />
        <TableView data={data["Kết quả trúng thầu"]["Kết quả"]} headerTitle={"Kết quả"} />
        <TableView data={data["Kết quả trúng thầu"]["Mô tả tóm tắt gói thầu"]} headerTitle={"Mô tả tóm tắt gói thầu"} />
        <TableView data={data["Kết quả trúng thầu"]["Các nhà thầu trúng thầu khác"]} headerTitle={"Các nhà thầu trúng thầu khác"} />
      </View>)}

    </View>
  );
};

const styles = StyleSheet.create({

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

  headerTitle: {
    textTransform: 'uppercase', 
    fontWeight: "bold",
    backgroundColor: "#B3C100",
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
  },

  basicText: {
    textAlign: "justify",
    marginRight: 10,
  },

  row: {
    maxHeight: 120,
  },

  viewWrapper: {
    flex: 1,
    flexDirection: "column"
  },

  text: {
    textAlign: "center"
  }

});

export default BiddingDetails;