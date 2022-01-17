import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Button } from "react-native"
import { VictoryScatter, VictoryChart, VictoryTheme } from "victory-native";
import { generateColor } from "../utils/Random";
import { Table, Row, Rows, TableWrapper, Cell } from "react-native-table-component";
import { FONT_SIZE } from "../constants/Size";
import { postApiWithOutPaging } from "../utils/ApiCaller";
import { API_PATH } from "../config/Api";
import AppLoader from "../components/AppLoader";
import { BaseStyles } from "../constants/BaseStyles";
import { SORT_ORDER } from "../constants/NameConstants";

const TableView = ({ tableData, setFetched, widthArr }) => {
  
  if (tableData === null || tableData === undefined || tableData.length === 0) {
    setFetched(false);
    return <View></View>
  }

  return (<Table>
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
  </Table>);
}

const ChartView = ({ data, setFetched }) => {
  if (data === null || data === undefined || data.length === 0) {
    setFetched(false);
    console.log("Data in chart view is empty....");
    return <View></View>
  }

  return (<VictoryScatter
    style={{ data: { fill: ({ datum }) => generateColor() } }}
    bubbleProperty="y"
    maxBubbleSize={25}
    minBubbleSize={5}
    data={data?.data}
    labels={ ({ datum }) => `${datum.province}` }
  />);
}

const BUTTON = {
  DIA_PHUONG: 'Địa phương',
  SO_LUONG_GOI_THAU: 'Số lượng gói thầu',
  TONG_GIA_TRI: 'Tổng giá trị gói thầu'
}

const reverseStringToNumber = ( s ) => {
  return parseInt(s.replace(/,/g, "").replace(/₫/g, ""));
}

const BiddingInvitationBubbleChart = ({ route }) => {
  
  console.log("Route param keyword ", route?.params?.keyword);

  const [data, setData] = useState([]);
  const widthArr = [150, 120, 150];
  const [tableData, setTableData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [sortOrderArr, setOrderArr] = useState([SORT_ORDER.ASC, SORT_ORDER.ASC, SORT_ORDER.ASC]);
  const [isEmptyData, setEmpty] = useState(false);

  const customSort = ( value, index ) => {
    console.log("Clicked on button has value ", value);
    const temp = tableData;

    switch (value) {
      case BUTTON.DIA_PHUONG:
        temp.sort((a, b) => {
                              var nameA = a[0].toUpperCase();
                              var nameB = b[0].toUpperCase();
                              if (nameA < nameB) {
                                return -1;
                              }
                              if (nameA > nameB) {
                                return 1;
                              }
                              return 0;
                            });
        break;
      
      case BUTTON.SO_LUONG_GOI_THAU:
        temp.sort((a, b) => a[1] - b[1]);
        break;

      case BUTTON.TONG_GIA_TRI:
        temp.sort((a, b) => reverseStringToNumber(a[2]) - reverseStringToNumber(b[2]));
        break;

      default:
        break;
    }

    const newSortOrder = [...sortOrderArr];
    if (sortOrderArr[index] == SORT_ORDER.ASC) {
      newSortOrder[index] = SORT_ORDER.DESC;
    } else {
      temp.reverse();
      newSortOrder[index] = SORT_ORDER.ASC;
    }

    setOrderArr([...newSortOrder]);
    setTableData([...temp]);
  }

  const elementButton = ( value, index ) => (
    <TouchableOpacity onPress={ () => customSort(value, index) }>
      <View style={styles.btn}>
        <Text style={styles.btnText}>{value}</Text>
      </View>
    </TouchableOpacity>
  );

  const tableHeader = [elementButton(BUTTON.DIA_PHUONG, 0), elementButton(BUTTON.SO_LUONG_GOI_THAU, 1), elementButton(BUTTON.TONG_GIA_TRI, 2)];

  useEffect(async () => {
    if ( true ) {
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
  }, []);
  
  return (
    fetched ? 
    <ScrollView>
      <View>
        <ChartView data={data} setFetched={setFetched} />
        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table>
                <Row data={tableHeader} widthArr={widthArr} style={styles.header} textStyle={styles.textHeader}></Row>
              </Table>
            
              <TableView tableData={tableData} setFetched={setFetched} widthArr={widthArr} />
            </View>
          </ScrollView>
        </View>
      </View> 
    </ScrollView>
    : <AppLoader />
  );
}

const styles = StyleSheet.create({
  
  container: {
    // marginTop: 5,
    // marginLeft: 10,
    // marginRight: 10,
  },

  biddingName: {
    fontSize: FONT_SIZE.NORMAL,
    fontWeight: "bold",
    color: "#34675C",
  },

  basicText: {
    textAlign: "justify",
    marginRight: 5,
    marginLeft: 5
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
    height: 30,
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
