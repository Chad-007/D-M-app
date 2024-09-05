import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RequestItemScreen from "./screens/RequestItemScreen";
import PredictionScreen from "./screens/PredictionScreen";
import RescueScreen from "./screens/RescueScreen";
import SmsScreen from "./screens/SmsScreen";
import RescueRequestsScreen from "./screens/RescueRequestsScreen"; // Import the new screen
import ViewRequests from "./screens/ViewRequests";
import ItemRequestForm from "./screens/ItemRequestForm";
import ChatBot from "./screens/ChatBot";
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
        <Stack.Screen name="Prediction" component={PredictionScreen} />
        <Stack.Screen name="Rescue" component={RescueScreen} />
        <Stack.Screen name="RescueRequests" component={RescueRequestsScreen} />
        <Stack.Screen name="SMS" component={SmsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
