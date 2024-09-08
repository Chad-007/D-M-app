import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function ItemRequestForm() {
  const [itemType, setItemType] = useState("Food"); // Default item type
  const [name, setName] = useState("");
  const [foodPackets, setFoodPackets] = useState("");
  const [utilities, setUtilities] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState(""); // Address field
  const [phone, setPhone] = useState(""); // Phone field

  const handleSubmit = async () => {
    const requestData = {
      itemType,
      name,
      foodPackets: itemType === "Food" ? foodPackets : undefined,
      utilities: itemType === "Utilities" ? utilities : undefined,
      age: itemType === "Utilities" ? age : undefined,
      address, // Always included
      phone, // Always included
    };

    console.log("Sending request data:", requestData); // Debugging log

    try {
      const response = await fetch(
        "http://192.168.27.122:5000/api/request-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      const result = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Your request has been submitted.");
        console.log("Request saved:", result);
      } else {
        Alert.alert("Error", result.error || "Failed to submit request.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while submitting the request.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request {itemType}</Text>
      <TextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor="#FFF" // Set placeholder text color to white
      />
      {itemType === "Food" && (
        <TextInput
          placeholder="Number of Food Packets"
          value={foodPackets}
          onChangeText={setFoodPackets}
          style={styles.input}
          placeholderTextColor="#FFF" // Set placeholder text color to white
        />
      )}
      {itemType === "Utilities" && (
        <>
          <TextInput
            placeholder="Required Items"
            value={utilities}
            onChangeText={setUtilities}
            style={styles.input}
            placeholderTextColor="#FFF" // Set placeholder text color to white
          />
          <TextInput
            placeholder="Your Age"
            value={age}
            onChangeText={setAge}
            style={styles.input}
            placeholderTextColor="#FFF" // Set placeholder text color to white
          />
        </>
      )}
      {/* These fields should always be visible */}
      <TextInput
        placeholder="Your Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        placeholderTextColor="#FFF" // Set placeholder text color to white
      />
      <TextInput
        placeholder="Your Phone Number"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        placeholderTextColor="#FFF" // Set placeholder text color to white
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Request</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setItemType("Utilities")}
      >
        <Text style={styles.switchButtonText}>Switch to Utilities</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setItemType("Food")}
      >
        <Text style={styles.switchButtonText}>Switch to Food</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Dark background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700", // Gold text color
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#FFF", // Text color for input fields
  },
  submitButton: {
    backgroundColor: "#1C1C1C", // Dark button background
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#FFD700", // Gold text color for buttons
  },
  switchButton: {
    backgroundColor: "#1C1C1C", // Dark button background
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  switchButtonText: {
    fontSize: 16,
    color: "#FFD700", // Gold text color for buttons
  },
});
