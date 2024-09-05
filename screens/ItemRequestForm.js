import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function ItemRequestForm() {
  const [itemType, setItemType] = useState("Food"); // Default item type
  const [name, setName] = useState("");
  const [foodPackets, setFoodPackets] = useState("");
  const [utilities, setUtilities] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async () => {
    const requestData = {
      itemType,
      name,
      foodPackets: itemType === "Food" ? foodPackets : undefined,
      utilities: itemType === "Utilities" ? utilities : undefined,
      age: itemType === "Utilities" ? age : undefined,
    };

    try {
      const response = await fetch(
        "http://192.168.19.122:5000/api/request-item",
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
        console.log("Request saved:", result);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
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
      />
      {itemType === "Food" && (
        <TextInput
          placeholder="Number of Food Packets"
          value={foodPackets}
          onChangeText={setFoodPackets}
          style={styles.input}
        />
      )}
      {itemType === "Utilities" && (
        <>
          <TextInput
            placeholder="Required Items"
            value={utilities}
            onChangeText={setUtilities}
            style={styles.input}
          />
          <TextInput
            placeholder="Your Age"
            value={age}
            onChangeText={setAge}
            style={styles.input}
          />
        </>
      )}
      <Button title="Submit Request" onPress={handleSubmit} />
      <Button
        title="Switch to Utilities"
        onPress={() => setItemType("Utilities")}
      />
      <Button title="Switch to Food" onPress={() => setItemType("Food")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
