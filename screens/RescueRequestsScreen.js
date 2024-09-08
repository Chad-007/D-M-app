import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function RescueRequestsScreen() {
  const [rescueRequests, setRescueRequests] = useState([]);

  useEffect(() => {
    fetch("http://192.168.27.122:5000/api/rescue")
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
        keyExtractor={(item) => item._id.toString()} // Ensure _id is converted to string
        renderItem={({ item }) => (
          <View style={styles.requestItem}>
            <Text style={styles.requestTitle}>Request No: {item._id}</Text>
            <Text style={styles.requestText}>
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
    backgroundColor: "#121212", // Dark background to match RescueScreen
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#FFD700", // Gold color for title
  },
  requestItem: {
    backgroundColor: "#1C1C1C", // Dark card background
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for request number
  },
  requestText: {
    fontSize: 16,
    color: "#FFF", // White color for text
  },
});
