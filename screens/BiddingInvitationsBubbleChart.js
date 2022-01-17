import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Modal } from "react-native"
import { VictoryScatter, VictoryChart, VictoryContainer } from "victory-native";
import { generateColor } from "../utils/Random";
import { Table, Row } from "react-native-table-component";
import { FONT_SIZE } from "../constants/Size";
import { postApiWithOutPaging } from "../utils/ApiCaller";
import { API_PATH } from "../config/Api";
import AppLoader from "../components/AppLoader";
import { SORT_ORDER } from "../constants/NameConstants";
import NoData from "../components/NoData";
import { convertCostToString } from "../utils/CurrencyFormat";
import { MaterialIcons } from '@expo/vector-icons';

const TableView = ({ tableData, setFetched, widthArr }) => {
  
  if (tableData === null || tableData === undefined || tableData.length === 0) {
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

const ChartView = ({ data, setFetched, bubbleProperty, setModalVisible, setModelData, setProvinceModal }) => {
  if (data === null || data === undefined || data.length === 0) {
    setFetched(false);
    console.log("Data in chart view is empty....");
    return <View></View>
  }

  const getLabel = ({ datum }) => {
    if (bubbleProperty === "x") {
      return `${datum.province}\n${datum.x}`
    }

    if (bubbleProperty === "y") {
      return `${datum.province}\n${convertCostToString(datum.y)}`
    }

    return `${datum.province}`
  }

  return (<VictoryChart containerComponent={<VictoryContainer disableContainerEvents />}>
  <VictoryScatter
    style={{ data: { fill: ({ datum }) => generateColor() } }}
    bubbleProperty={bubbleProperty}
    maxBubbleSize={25}
    minBubbleSize={5}
    data={data?.data}
    labels={ ({ datum }) => getLabel({ datum }) }
    events={[
      {
        target: "data",
        eventHandlers: {
          onPressIn: () => {
            return [
              {
                target: "data",
                mutation: ( props ) => {
                  const provinceObj = getProvinceObjByName(props.data, props.datum?.province);
                  setModelData(provinceObj["details"]);
                  setModalVisible(true);
                  setProvinceModal(provinceObj["province"]);
                }
              }
            ];
          }
        }
      }
    ]}
  />
  </VictoryChart>
  );
}

const ModalView = ({ provinceModal, modalData, modalVisible, setModalVisible }) => {
  console.log("Modal data ", modalData);
  const tableHeader = ["Tên gói thầu", "Giá gói thầu"];
  const widthArr = [200, 120];
  const tableData = [];

  let totalCost = 0;
  if (Array.isArray(modalData)) {
    modalData.forEach(e => {
      const rowData = [];
      rowData.push(e["Tên gói thầu"]);
      rowData.push(convertCostToString(e["Giá gói thầu"]));
      totalCost += e["Giá gói thầu"];
      
      tableData.push(rowData);
    });
  }

  tableData.push(["TỔNG", convertCostToString(totalCost)]);

  return (<View>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            
            <View style={styles.closeModalBtn}>
              <TouchableOpacity style={{alignSelf: "flex-end"}} onPress={ () => setModalVisible(!modalVisible) }>
                <MaterialIcons name="close" size={30} color="black" />
              </TouchableOpacity>
              <Text style={{alignSelf: "flex-start"}} >{provinceModal}</Text>
            </View>

            <View style={styles.container}>
              <ScrollView>
                <TouchableOpacity>
                <View>
                  <Table>
                    <Row data={tableHeader} widthArr={widthArr} style={styles.header} textStyle={styles.textHeader}></Row>
                  </Table>
                
                  <TableView tableData={tableData} widthArr={widthArr} />
                </View>
                </TouchableOpacity>
              </ScrollView>
            </View>
            
          </View>
        </View>
      </Modal>
  </View>);
}

const getProvinceObjByName = (arr, name) => {
  if (Array.isArray(arr)) {
    var res = arr.find(obj => obj.province.localeCompare(name) == 0);
    return res;
  }

  console.log("Not found ", name, "in", arr);
  return null;
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
  const [bubbleProperty, setBubbleProperty] = useState("x");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModelData] = useState([]);
  const [provinceModal, setProvinceModal] = useState("");

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
        setBubbleProperty("x");
        temp.sort((a, b) => a[1] - b[1]);
        break;

      case BUTTON.TONG_GIA_TRI:
        setBubbleProperty("y");
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
    const requestBody = {
      "keyword": route?.params?.keyword
    }
    
    const response = await postApiWithOutPaging(API_PATH.BUBBLE_CHART_INVITATIONS, requestBody);

    if (response.ok) {
      const resData = await response.json();
      
      const temp = [];
      if (resData["data"].length === 0) {
        setEmpty(true);
      }
      resData["data"].forEach(element => {
        const rowData = [];
        rowData.push(element["province"]);
        rowData.push(element["x"]);
        rowData.push(convertCostToString(element["y"]));

        temp.push(rowData);
      });

      setTableData(temp);
      setData(resData);
      setFetched(true);
      }
  }, []);

  if (isEmptyData) {
    return <NoData />;
  }
  
  return (
    fetched ? 
    <ScrollView>
      <View>
        <View style={styles.centeredView}>
          <ModalView provinceModal={provinceModal} modalData={modalData} modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </View>

        <ScrollView horizontal={true} >
          <ChartView data={data} setFetched={setFetched} bubbleProperty={bubbleProperty} setModalVisible={setModalVisible} setModelData={setModelData} setProvinceModal={setProvinceModal} />
        </ScrollView>
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
    marginTop: 10,
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
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: "center",
    justifyContent: "center",
  },

  modalContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 10,
    borderRadius: 15,
    height: 400,
  },

  closeModalBtn: {
    // alignItems: "flex-end",
    height: 23,
    justifyContent: "center",
  }
});

export default BiddingInvitationBubbleChart;
