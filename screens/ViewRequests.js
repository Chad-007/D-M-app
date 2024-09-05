import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export default function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Use correct IP address and port. If using Android emulator, use '10.0.2.2'.
        const response = await fetch(
          "http://192.168.19.122:5000/api/request-item"
        );

        // Check for a successful response
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false); // Stop loading whether successful or not
      }
    };

    fetchRequests();
  }, []);

  // If loading, show a spinner
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If there's an error, show an error message
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Item Type: {item.itemType}</Text>
      <Text>Name: {item.name}</Text>
      {item.itemType === "Food" && (
        <Text>Food Packets: {item.foodPackets}</Text>
      )}
      {item.itemType === "Utilities" && (
        <>
          <Text>Utilities: {item.utilities}</Text>
          <Text>Age: {item.age}</Text>
        </>
      )}
    </View>
  );

  return (
    <FlatList
      data={requests}
      renderItem={renderItem}
      keyExtractor={(item) => item._id} // Ensure the key is unique
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});
