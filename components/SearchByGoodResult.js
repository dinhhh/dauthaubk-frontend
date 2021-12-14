import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Table } from "react-native-table-component";
import { Row } from "react-native-table-component";
import { FONT_SIZE } from "../constants/Size";

const SearchByGoodResult = ({ biddingName,
  bidSolicitor,
  winContractor,
  goods }) => {

  const [expanded, setExpanded] = React.useState(false);

  const onItemPress = () => {
    setExpanded(prev => !prev);
  }

  const tableHeader = ["Tên hàng hóa", "Số lượng", "Giá trúng thầu", "Công suất", "Thông số kỹ thuật"];
  const widthArr = [120, 60, 100, 70, 250];
  const tableData = [];
  goods.forEach(good => {
    const rowData = [];
    rowData.push(good["Tên hàng hóa"]);
    rowData.push(good["Số lượng"]);
    rowData.push(good["Giá/Đơn giá trúng thầu"]);
    rowData.push(good["Công suất"]);
    rowData.push(good["Tính năng, thông số kỹ thuật cơ bản"]);
    tableData.push(rowData);
  });

  return (
    <View>
      <TouchableOpacity onPress={onItemPress}>
        <View style={styles.container}>
          <Text style={styles.biddingName} numberOfLines={2} ellipsizeMode="tail">{biddingName}</Text>
          <Text style={styles.basicText} numberOfLines={1} ellipsizeMode="tail">Bên mời thầu: {bidSolicitor}</Text>
          <Text numberOfLines={2} ellipsizeMode="tail">Nhà thầu trúng thầu: <Text style={styles.highLightText}>{winContractor}</Text></Text>
        </View>
      </TouchableOpacity>

      {expanded && (
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
      )}

      <View style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 5,
        }} />
    </View>
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
    fontWeight: "bold",
  },

  row: {
    maxHeight: 120,
  },

  textHeader: {
    textAlign: "center",
  }
});

export default SearchByGoodResult;