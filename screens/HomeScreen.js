import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // For icons

export default function HomeScreen({ navigation }) {
  const handleButtonPress = (screenName, feature) => {
    navigation.navigate(screenName); // Enable navigation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RescueMe - Disaster Management</Text>

      {/* Button Grid */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => handleButtonPress("RequestItem", "RequestItem")}
        >
          <Icon name="package" size={50} color="#FFD700" />
          <Text style={styles.buttonText}>Request Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => handleButtonPress("Rescue", "Rescue")}
        >
          <Icon name="life-buoy" size={50} color="#FFD700" />
          <Text style={styles.buttonText}>Rescue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => handleButtonPress("prediction", "prediction")}
        >
          <Icon name="trending-up" size={50} color="#FFD700" />
          <Text style={styles.buttonText}>Prediction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => handleButtonPress("both", "both")}
        >
          <Icon name="user" size={50} color="#FFD700" />
          <Text style={styles.buttonText}>Missing</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => handleButtonPress("tips", "tips")}
        >
          <Icon name="book-open" size={50} color="#FFD700" />
          <Text style={styles.buttonText}>Tips</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => handleButtonPress("search", "search")}
        >
          <Icon name="search" size={50} color="#FFD700" />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => handleButtonPress("image", "image")}
        >
          <Icon name="image" size={50} color="#FFD700" />
          <Text style={styles.buttonText}>Image</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700", // Gold text color
    marginBottom: 20,
  },
  buttonGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emergencyButton: {
    width: "45%",
    backgroundColor: "#1C1C1C", // Dark button background
    borderRadius: 10,
    padding: 20,
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
    fontSize: 16,
    color: "#FFD700", // Gold text color for buttons
    textAlign: "center",
  },
});
