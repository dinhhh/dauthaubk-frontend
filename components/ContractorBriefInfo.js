import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { BaseStyles } from "../constants/BaseStyles";

const ContractorBriefInfo = ({ data }) => {

  return (
    <TouchableOpacity>
      <View style={{marginLeft: 10, marginRight: 10, marginTop: 5}}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={BaseStyles.textHeader}>{data["Tên nhà thầu"]}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" >Số ĐKKD: <Text style={BaseStyles.textHighLight}>{data["Số ĐKKD"]}</Text></Text>
        <Text>Phân loại: {data["Phân loại doanh nghiệp"]}</Text>
        <View style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          }} />
      </View>
    </TouchableOpacity>
  );
}

export default ContractorBriefInfo;