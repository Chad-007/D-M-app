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
        const response = await fetch("http://192.168.19.122:5000/api/person"); // Replace with your server URL
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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (persons.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text>No missing persons found.</Text>
      </View>
    );
  }

  const renderPerson = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `http://192.168.19.122:5000${item.photoUrl}` }}
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
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  infoContainer: {
    marginLeft: 16,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  address: {
    fontSize: 14,
    color: "#666",
  },
});

export default MissingPerson;
