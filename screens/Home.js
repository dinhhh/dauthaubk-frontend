import * as React from "react";
import { Text, View, Button, useWindowDimensions, StyleSheet } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import InvestorHome from "./InvestorHome";
import ContractorHome from "./ContractorHome";


const Home = ({ navigation }) => {

  const LOG_TAG = "[Home screen] ";
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: "first", title: "NHA THAU"},
    {key: "second", title: "NHA DAU TU"},
  ]);

  const pressHandler = (objId) => {
    console.log(LOG_TAG + "object id = " + objId);
    navigation.navigate("BiddingDetails", { id: objId });
  }

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <ContractorHome getObjId={pressHandler}/>
  
      case 'second':
        return <InvestorHome />
      default:
        return null;
    }
  }

  return (
    <TabView 
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={ styles.container }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 0 : 30, // TODO: hard code here
  }
});

export default Home;
