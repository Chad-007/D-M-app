import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RequestItemScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Item</Text>
      {/* Add your Request Item logic here */}
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
