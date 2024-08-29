import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SmsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SMS</Text>
      {/* Add your SMS logic here */}
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
