import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
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
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <TextInput
        style={{
          height: 50,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 10,
          marginBottom: 20,
        }}
        placeholder="Enter city name"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}
