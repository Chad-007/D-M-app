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
        const response = await fetch(
          "http://192.168.27.122:5000/api/request-item"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemType}>Item Type: {item.itemType}</Text>
      <Text style={styles.text}>Name: {item.name}</Text>
      {item.itemType === "Food" && (
        <Text style={styles.text}>Food Packets: {item.foodPackets}</Text>
      )}
      {item.itemType === "Utilities" && (
        <>
          <Text style={styles.text}>Utilities: {item.utilities}</Text>
          <Text style={styles.text}>Age: {item.age}</Text>
        </>
      )}
      <Text style={styles.text}>Address: {item.address}</Text>
      <Text style={styles.text}>Phone: {item.phone}</Text>
    </View>
  );

  return (
    <FlatList
      data={requests}
      renderItem={renderItem}
      keyExtractor={(item) => item._id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1C1C1C",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  itemType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
  },
  text: {
    fontSize: 16,
    color: "#FFF",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  errorText: {
    color: "#FFD700",
    fontSize: 18,
  },
  listContainer: {
    padding: 16,
  },
});
