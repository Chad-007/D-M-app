import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export default function RescueScreen() {
  const [location, setLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleRescueMe = async () => {
    // Request location permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setStatusMessage(null);
      setError("Permission to access location was denied");
      return;
    }

    try {
      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      if (currentLocation) {
        setLocation(currentLocation);
        setShowLocation(true);

        // Generate a unique request number
        const requestNumber = Date.now();

        // Send the location and request number to the server
        const response = await fetch("http://192.168.19.122:5000/api/rescue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            requestNumber: requestNumber, // Include requestNumber
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setStatusMessage("Location successfully added!");
          setError(null); // Clear any previous error
          console.log("Rescue request submitted:", data);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        throw new Error("Failed to fetch location");
      }
    } catch (error) {
      console.error("Error submitting rescue request:", error);
      setError("Location not added. Please try again.");
      setStatusMessage(null); // Clear any previous success message
    }
  };

  const handleShowRescueRequests = () => {
    navigation.navigate("RescueRequests");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rescue</Text>
      <Button title="Rescue Me" onPress={handleRescueMe} />
      <Button title="Show Rescue Requests" onPress={handleShowRescueRequests} />
      {statusMessage && (
        <View style={styles.statusInfo}>
          <Text>{statusMessage}</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorInfo}>
          <Text>Error: {error}</Text>
        </View>
      )}
      {showLocation && location && (
        <View style={styles.locationInfo}>
          <Text>
            Location: Latitude {location.coords.latitude}, Longitude{" "}
            {location.coords.longitude}
          </Text>
        </View>
      )}
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
  locationInfo: {
    marginTop: 20,
  },
  statusInfo: {
    marginTop: 20,
    fontSize: 16,
    color: "green",
  },
  errorInfo: {
    marginTop: 20,
    color: "red",
  },
});
