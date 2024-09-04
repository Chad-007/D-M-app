import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function ViewRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://192.168.19.122/api/request-item");
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

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
      keyExtractor={(item) => item._id}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
