import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disaster Management</Text>

      <Button
        title="Request Item"
        onPress={() => navigation.navigate("Request Item")}
      />
      <Button
        title="Prediction"
        onPress={() => navigation.navigate("Prediction")}
      />
      <Button title="Rescue" onPress={() => navigation.navigate("Rescue")} />
      <Button title="SMS" onPress={() => navigation.navigate("SMS")} />
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
    marginBottom: 20,
  },
});
