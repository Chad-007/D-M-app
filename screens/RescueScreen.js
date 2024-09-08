import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export default function RescueScreen() {
  const [location, setLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [error, setError] = useState(null);
  const [intervalId, setIntervalId] = useState(null); // To store the interval ID
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clean up the interval on unmount
      }
    };
  }, [intervalId]);

  const startRescueUpdates = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setStatusMessage(null);
      setError("Permission to access location was denied");
      return;
    }

    // Clear any existing interval
    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(async () => {
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        if (currentLocation) {
          setLocation(currentLocation);
          setShowLocation(true);

          const requestNumber = Date.now();

          const response = await fetch(
            "http://192.168.27.122:5000/api/rescue",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                requestNumber: requestNumber,
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            setStatusMessage("Location successfully updated!");
            setError(null);
            console.log("Rescue request submitted:", data);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          throw new Error("Failed to fetch location");
        }
      } catch (error) {
        console.error("Error submitting rescue request:", error);
        setError("Location not updated. Please try again.");
        setStatusMessage(null);
      }
    }, 10000); // Update every 10 seconds

    setIntervalId(id); // Store interval ID to clean it up later
  };

  const stopRescueUpdates = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setStatusMessage("Rescue updates stopped.");
    }
  };

  const handleShowRescueRequests = () => {
    navigation.navigate("RescueRequests");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rescue</Text>
      <Button
        title="Start Rescue Me"
        onPress={startRescueUpdates}
        color="#FFD700"
      />
      <Button
        title="Stop Rescue Updates"
        onPress={stopRescueUpdates}
        color="#FFD700"
      />
      <Button
        title="Show Rescue Requests"
        onPress={handleShowRescueRequests}
        color="#FFD700"
      />
      {statusMessage && (
        <View style={styles.statusInfo}>
          <Text style={styles.text}>{statusMessage}</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorInfo}>
          <Text style={styles.text}>Error: {error}</Text>
        </View>
      )}
      {showLocation && location && (
        <View style={styles.locationInfo}>
          <Text style={styles.text}>
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
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#FFD700",
  },
  locationInfo: {
    marginTop: 20,
    backgroundColor: "#1C1C1C",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  statusInfo: {
    marginTop: 20,
    backgroundColor: "#1C1C1C",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  errorInfo: {
    marginTop: 20,
    backgroundColor: "#1C1C1C",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: "#FFF",
  },
});
