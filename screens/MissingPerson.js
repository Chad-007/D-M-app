import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const MissingPerson = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch persons data from the server
    const fetchPersons = async () => {
      try {
        const response = await fetch("http://192.168.27.122:5000/api/person"); // Replace with your server URL
        const data = await response.json();
        setPersons(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching persons:", error);
        setLoading(false);
      }
    };

    fetchPersons();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (persons.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No missing persons found.</Text>
      </View>
    );
  }

  const renderPerson = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `http://192.168.27.122:5000${item.photoUrl}` }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>Address: {item.address}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={persons}
      keyExtractor={(item) => item._id}
      renderItem={renderPerson}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Dark background
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212", // Dark background
  },
  noDataText: {
    fontSize: 18,
    color: "#FFD700", // Gold text color
  },
  listContainer: {
    padding: 16,
    backgroundColor: "#121212", // Dark background
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#1C1C1C", // Dark card background
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 16,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700", // Gold text color
  },
  address: {
    fontSize: 14,
    color: "#aaa", // Lighter text color
  },
});

export default MissingPerson;
