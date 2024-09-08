import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SearchCity() {
  const [city, setCity] = useState("");
  const navigation = useNavigation();

  const handleSearch = () => {
    if (city.trim()) {
      navigation.navigate("new", { name: city });
    } else {
      alert("Please enter a city name");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter city name"
        placeholderTextColor="#FFF" // White placeholder text
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212", // Dark background to match other screens
  },
  searchInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#FFF", // White text color
  },
  button: {
    backgroundColor: "#FFD700", // Gold color
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#121212", // Dark text color for contrast
    fontSize: 16,
    fontWeight: "bold",
  },
});
