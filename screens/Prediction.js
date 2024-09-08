import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";

const Prediction = () => {
  const [disasterAreas, setDisasterAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAreas, setFilteredAreas] = useState([]);

  useEffect(() => {
    const fetchDisasterAreas = async () => {
      try {
        const response = await fetch(
          "https://www.fema.gov/api/open/v1/FemaWebDeclarationAreas",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }

        const data = await response.json();
        const areas = data.FemaWebDeclarationAreas || [];

        // Sort areas by designatedDate in descending order
        const sortedAreas = areas.sort(
          (a, b) => new Date(b.designatedDate) - new Date(a.designatedDate)
        );

        setDisasterAreas(sortedAreas);
        setFilteredAreas(sortedAreas); // Set the initial filtered areas to all
        setLoading(false);
      } catch (error) {
        console.error("Error fetching disaster areas:", error);
        setLoading(false);
      }
    };

    fetchDisasterAreas();
  }, []);

  // Function to handle search
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      // If search query is empty, show all areas
      setFilteredAreas(disasterAreas.slice(0, 10));
    } else {
      // Filter areas by placeName or stateName (case-insensitive)
      const filtered = disasterAreas
        .filter(
          (item) =>
            item.placeName.toLowerCase().includes(query.toLowerCase()) ||
            item.stateName.toLowerCase().includes(query.toLowerCase())
        )
        // Ensure only unique disaster numbers
        .reduce((unique, item) => {
          if (!unique.some((el) => el.disasterNumber === item.disasterNumber)) {
            unique.push(item);
          }
          return unique;
        }, [])
        .slice(0, 10); // Limit to 10 results after filtering

      setFilteredAreas(filtered);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Search Input Field */}
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
        }}
        placeholder="Search by place or state"
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />

      {/* Display Filtered Disaster Areas */}
      <FlatList
        data={filteredAreas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.placeName}</Text>
            <Text>State: {item.stateName.trim()}</Text>
            <Text>Disaster Number: {item.disasterNumber}</Text>
            <Text>Program Type: {item.programTypeDescription}</Text>
            <Text>
              Designated Date:{" "}
              {new Date(item.designatedDate).toLocaleDateString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Prediction;
