import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // For icons

const BothScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("upload")}
      >
        <Icon name="upload" size={30} color="#FFD700" />
        <Text style={styles.buttonText}>Upload Person</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("missing")}
      >
        <Icon name="search" size={30} color="#FFD700" />
        <Text style={styles.buttonText}>Search Missing People</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Dark background
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 10,
    fontSize: 18,
    color: "#FFD700", // Gold text color for buttons
    textAlign: "center",
  },
});

export default BothScreen;
