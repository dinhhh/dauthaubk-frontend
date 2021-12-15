import React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Table } from "react-native-table-component";
import { Row } from "react-native-table-component";
import { SCREEN_MESSAGE } from "../constants/ScreenMessage";

const ContractorDetails = ({ route }) => {

  const [expandGenInfo, setExpandGenInfo] = useState(true);
  const [expandHistory, setExpandHistory] = useState(true);

  const generalInfo = route.params.data;
  const genInfoTableData = [];
  for (const key in generalInfo["Thông tin chung"]) {
    console.log(`${key}: ${generalInfo["Thông tin chung"][key]}`);
    const row = [];
    row.push(`${key}`);
    row.push(`${generalInfo["Thông tin chung"][key]}`);
    genInfoTableData.push(row);
  }

  const historyTableHeader = ["Số hiệu KHLCNT", "Tên gói thầu", "Bên mời thầu", "Lĩnh vực", "Kết quả", "Giá gói thầu"];
  const historyTableData = [];
  const widthArr = [60, 150, 100, 70, 100, 100];
  generalInfo["Gói thầu đã tham gia"].forEach(history => {
    const row = [];
    row.push(history["Số hiệu KHLCNT"]);
    row.push(history["Tên gói thầu"]);
    row.push(history["Bên mời thầu"]);
    row.push(history["Lĩnh vực"]);
    row.push(history["Kết quả"]);
    row.push(history["Giá gói thầu"]);
    historyTableData.push(row);
  });
  console.log("History table data " + historyTableData);

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={() => setExpandGenInfo( prev => !prev )}>
        <Text style={styles.textHeader}>{SCREEN_MESSAGE.THONG_TIN_CHUNG}</Text>
        {expandGenInfo && 
          (<ScrollView >
            <Table>
              {
                genInfoTableData.map((rowData, index) => (
                  <Row 
                    key={index}
                    data={rowData}
                    textStyle={styles.basicText}
                    style={[styles.row, index % 2 && {backgroundColor: '#E7E6E1'}]}/>
                ))
              }
            </Table>
          </ScrollView>
        )}
      </TouchableOpacity>

      <View style={styles.container}>
        <TouchableOpacity onPress={() => setExpandHistory( prev => !prev )}>
          <Text style={styles.textHeader}>{SCREEN_MESSAGE.GOI_THAU_DA_THAM_GIA}</Text>
        </TouchableOpacity>
        {expandHistory &&
          <ScrollView horizontal={true}>
          <View>
            <Table>
              <Row data={historyTableHeader} widthArr={widthArr} style={styles.header}></Row>
            </Table>

            <ScrollView>
              <Table>
                {
                  historyTableData.map((rowData, index) => (
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
        </ScrollView>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    paddingLeft: 10,
    paddingRight: 10
  },
  
  textHeader: {
    textTransform: "uppercase",
    fontWeight: "bold",
    backgroundColor: "#B3C100",
    paddingTop: 10,
    paddingBottom: 10,
  },

  basicText: {
    textAlign: "left",
  },

  row: {
    maxHeight: 120,
  },

  header: { 
    backgroundColor: "#bfbfbb",
  },

});

export default ContractorDetails;