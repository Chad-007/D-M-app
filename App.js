import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RequestItemScreen from "./screens/RequestItemScreen";
// import PredictionScreen from "./screens/PredictionScreen";
import RescueScreen from "./screens/RescueScreen";
import SmsScreen from "./screens/SmsScreen";
import RescueRequestsScreen from "./screens/RescueRequestsScreen"; // Import the new screen
import ViewRequests from "./screens/ViewRequests";
import ItemRequestForm from "./screens/ItemRequestForm";
import ChatBot from "./screens/ChatBot";
import Newweather from "./screens/Newweather";
import SearchCity from "./screens/SearchCity";
import UploadPersonScreen from "./screens/UploadPerson";
import MissingPerson from "./screens/MissingPerson";
import Prediction from "./screens/Prediction";
import BothScreen from "./screens/BothScreen";
import ImageAPI from "./screens/ImageApi";
import TipsScreen from "./screens/TipsScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="view" component={ViewRequests} />
        <Stack.Screen name="item" component={ItemRequestForm} />
        <Stack.Screen name="bot" component={ChatBot} />
        <Stack.Screen name="RequestItem" component={RequestItemScreen} />
        <Stack.Screen name="Rescue" component={RescueScreen} />
        <Stack.Screen name="RescueRequests" component={RescueRequestsScreen} />
        <Stack.Screen name="SMS" component={SmsScreen} />
        <Stack.Screen name="new" component={Newweather} />
        <Stack.Screen name="missing" component={MissingPerson} />
        <Stack.Screen name="prediction" component={Prediction} />
        <Stack.Screen name="upload" component={UploadPersonScreen} />
        <Stack.Screen name="search" component={SearchCity} />
        <Stack.Screen name="image" component={ImageAPI} />
        <Stack.Screen name="tips" component={TipsScreen} />

        <Stack.Screen name="both" component={BothScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//hey