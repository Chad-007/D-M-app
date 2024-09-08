import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const API_KEY = "f99f0a754457bd0edfa6f77d9bb511cc";

export default function Newweather(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null); // State for storing the alert message
  const { name } = props.route.params; // Get the city name from props

  useEffect(() => {
    // Fetch weather data for the city passed from SearchCity
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.cod !== 200) {
          throw new Error(res.message || "City not found");
        }
        setData(res);
        setLoading(false);
        determineAlert(res); // Check for alerts based on the weather
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  // Function to determine weather alerts based on weather condition codes
  const determineAlert = (weatherData) => {
    const weatherId = weatherData?.weather?.[0]?.id;

    if (weatherId >= 200 && weatherId < 300) {
      setAlert("Alert: Thunderstorm - Stay indoors!");
    } else if (weatherId >= 300 && weatherId < 600) {
      setAlert("Alert: Heavy Rain - Carry an umbrella!");
    } else if (weatherId >= 600 && weatherId < 700) {
      setAlert("Alert: Snow - Dress warmly!");
    } else if (weatherId >= 700 && weatherId < 800) {
      setAlert("Alert: Fog - Drive carefully!");
    } else if (weatherId === 800) {
      setAlert("Clear skies - Enjoy the day!");
    } else if (weatherId > 800) {
      setAlert("Alert: Cloudy - Possible rain, be prepared!");
    }

    // You can add more custom alerts based on other weather condition codes
    const temp = weatherData?.main?.temp - 273.15; // Convert Kelvin to Celsius
    if (temp > 35) {
      setAlert("Alert: High Heat - Stay hydrated!");
    } else if (temp < 0) {
      setAlert("Alert: Freezing - Stay warm!");
    }
  };

  const Data = ({ title, value }) => (
    <View style={styles.dataContainer}>
      <Text style={styles.dataTitle}>{title}</Text>
      <Text style={styles.dataValue}>{value}</Text>
    </View>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {data ? (
        <View>
          <Text style={styles.cityName}>{name}</Text>
          <Text style={styles.weatherMain}>
            {data?.weather?.[0]?.main || "N/A"}
          </Text>
          <Text style={styles.temperature}>
            {(data?.main?.temp - 273.15).toFixed(2)}&deg; C
          </Text>

          {/* Display Alert if available */}
          {alert && <Text style={styles.alertText}>{alert}</Text>}

          <Text style={styles.detailsHeader}>Weather Details</Text>
          <Data value={data?.wind?.speed || "N/A"} title="Wind" />
          <Data value={data?.main?.pressure || "N/A"} title="Pressure" />
          <Data value={`${data?.main?.humidity || "N/A"}%`} title="Humidity" />
          <Data value={data?.visibility || "N/A"} title="Visibility" />
        </View>
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Dark background
  },
  cityName: {
    color: "#FFD700", // Gold color
    fontSize: 40,
    textAlign: "center",
    marginBottom: 10,
  },
  weatherMain: {
    color: "#FFF", // White color
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
  },
  temperature: {
    color: "#FFF", // White color
    fontSize: 64,
    textAlign: "center",
    marginBottom: 20,
  },
  alertText: {
    color: "red", // Alert text color
    fontSize: 22,
    textAlign: "center",
    marginBottom: 16,
  },
  detailsHeader: {
    color: "#FFF", // White color
    fontSize: 22,
    marginBottom: 16,
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dataTitle: {
    color: "gray",
    fontSize: 22,
  },
  dataValue: {
    color: "#FFF", // White color
    fontSize: 22,
  },
  loadingText: {
    color: "#FFF", // White color
    fontSize: 22,
    textAlign: "center",
    marginTop: 50,
  },
  errorText: {
    color: "red", // Error text color
    fontSize: 22,
    textAlign: "center",
    marginTop: 50,
  },
  noDataText: {
    color: "#FFF", // White color
    fontSize: 22,
    textAlign: "center",
    marginTop: 50,
  },
});
