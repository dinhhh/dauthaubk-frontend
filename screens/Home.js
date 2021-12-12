import * as React from "react";
import { Text, View, Button, useWindowDimensions, StyleSheet } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import InvestorHome from "./InvestorHome";
import ContractorHome from "./ContractorHome";

const renderScene = SceneMap({
  first: ContractorHome,
  second: InvestorHome
});

const Home = ({ navigation }) => {

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: "first", title: "NHA THAU"},
    {key: "second", title: "NHA DAU TU"},
  ]);

  const pressHandler = () => {
    navigation.navigate("BiddingDetails");
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
