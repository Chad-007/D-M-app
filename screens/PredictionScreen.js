import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PredictionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prediction</Text>
      {/* Add your Prediction logic here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
  },
});
