import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RequestItemScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request or View Items</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("item")}
      >
        <Text style={styles.buttonText}>Request Item</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("view")}
      >
        <Text style={styles.buttonText}>View Item Requests</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Dark background
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700", // Gold text color
    marginBottom: 20,
  },
  button: {
    width: "80%",
    backgroundColor: "#1C1C1C", // Dark button background
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFD700", // Gold text color for buttons
  },
});
