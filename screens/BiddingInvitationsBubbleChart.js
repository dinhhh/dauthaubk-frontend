import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Button } from "react-native"
import { VictoryScatter, VictoryChart, VictoryTheme } from "victory-native";
import { generateColor } from "../utils/Random";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";
import { FONT_SIZE } from "../constants/Size";
import { postApiWithOutPaging } from "../utils/ApiCaller";
import { API_PATH } from "../config/Api";
import AppLoader from "../components/AppLoader";

const BiddingInvitationBubbleChart = ({ route }) => {
  
  console.log("Route param keyword ", route?.params?.keyword);

  const [data, setData] = useState([]);
  const tableHeader = ["Địa phương", "Số lượng gói thầu", "Tổng giá trị gói thầu"];
  const widthArr = [120, 120, 150];
  const [tableData, setTableData] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(async () => {
    if ( !fetched ) {
      const requestBody = {
        "keyword": route?.params?.keyword
      }
      
      const response = await postApiWithOutPaging(API_PATH.BUBBLE_CHART_INVITATIONS, requestBody);

      if (response.ok) {
        const resData = await response.json();
        
        const temp = [];
        resData["data"].forEach(element => {
          const rowData = [];
          rowData.push(element["province"]);
          rowData.push(element["x"]);
    
          var formatter = new Intl.NumberFormat('vn-VN', {
            style: 'currency',
            currency: 'VND',
          });
          rowData.push(formatter.format(element["y"]));
          temp.push(rowData);
        });

        setTableData(temp);
        setData(resData);
        setFetched(true);
      }
    }
  }, [fetched]);
  
  return (
    fetched ? 
    <View>
      <VictoryScatter
        // style={{ data: { fill: "#c43a31" } }}
        style={{ data: { fill: ({ datum }) => generateColor() } }}
        bubbleProperty="y"
        maxBubbleSize={25}
        minBubbleSize={5}
        data={data.data}
        labels={ ({ datum }) => `${datum.province}` }
      />

        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table>
                <Row data={tableHeader} widthArr={widthArr} style={styles.header} textStyle={styles.textHeader}></Row>
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
        </View>
    </View> 
    : <AppLoader />
  );
}

const styles = StyleSheet.create({
  
  container: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },

  biddingName: {
    fontSize: FONT_SIZE.NORMAL,
    fontWeight: "bold",
    color: "#34675C",
  },

  basicText: {
    textAlign: "justify",
    marginRight: 10,
  },

  publishDate: {
    color: "#757575",
  },

  highLightText: {
    color: "#FA4848",
    fontWeight: "bold"
  },

  biddingCost: {
    fontStyle: "italic"
  },

  header: { 
    height: 50,
    backgroundColor: "#bfbfbb",
  },

  row: {
    maxHeight: 120,
  },

  textHeader: {
    textAlign: "justify",
    marginRight: 5,
    marginLeft: 5,
  }
});

export default BiddingInvitationBubbleChart;
