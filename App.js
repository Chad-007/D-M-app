import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import FaceDetectionScreen from "./screens/FaceDetectionScreen";
import RequestItemScreen from "./screens/RequestItemScreen";
import PredictionScreen from "./screens/PredictionScreen";
import RescueScreen from "./screens/RescueScreen";
import SmsScreen from "./screens/SmsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Face Detection" component={FaceDetectionScreen} />
        <Stack.Screen name="Request Item" component={RequestItemScreen} />
        <Stack.Screen name="Prediction" component={PredictionScreen} />
        <Stack.Screen name="Rescue" component={RescueScreen} />
        <Stack.Screen name="SMS" component={SmsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
