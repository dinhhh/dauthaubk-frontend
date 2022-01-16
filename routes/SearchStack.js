import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ContractorSearch from "../screens/ContractorSearch";
import ContractorDetails from "../screens/ContractorDetails";
import BiddingInvitationBubbleChart from "../screens/BiddingInvitationsBubbleChart";
import BiddingDetails from "../screens/BiddingDetails";

const Stack = createNativeStackNavigator();

export default function SearchStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchScreen" component={ContractorSearch}></Stack.Screen>
      <Stack.Screen name="ContractorDetails" component={ContractorDetails}></Stack.Screen>
      <Stack.Screen name="BiddingInvitationBubbleChart" component={BiddingInvitationBubbleChart}></Stack.Screen>
      <Stack.Screen name="BiddingDetails" component={BiddingDetails}></Stack.Screen>
    </Stack.Navigator>
  );
}