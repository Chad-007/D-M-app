import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
export default function RescueRequestsScreen() {
  const [rescueRequests, setRescueRequests] = useState([]);

  useEffect(() => {
    fetch("http://192.168.19.122:5000/api/rescue")
      .then((response) => response.json())
      .then((data) => {
        setRescueRequests(data);
      })
      .catch((error) => {
        console.error("Error fetching rescue requests:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rescue Requests</Text>
      <FlatList
        data={rescueRequests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <Text>Request No: {item._id}</Text>
            <Text>
              Location: Latitude {item.latitude}, Longitude {item.longitude}
            </Text>
          </View>
        )}
      />
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
    marginBottom: 20,
  },
  requestItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
