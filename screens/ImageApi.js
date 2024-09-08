import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const API_KEY = "vnaWrRdpwGUeTmH9t_l1x7gEIdqI_XIC"; // Replace with your actual API Key
const API_SECRET = "ZjKShLjaPmHxxnNrsH_DYKRbxu_KRPIT"; // Replace with your actual API Secret

export default function ImageAPI() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [similarity, setSimilarity] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "web") {
      (async () => {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      })();
    }
  }, []);

  const pickImage = async (setImage, imageNumber) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      // Log the result object for debugging
      console.log(`Image ${imageNumber} Picker Result:`, result);

      if (!result.cancelled && result.assets && result.assets[0].uri) {
        const imageUri = result.assets[0].uri;
        console.log(`Image ${imageNumber} URI:`, imageUri);
        setImage(imageUri); // Set the image URI to state
        Alert.alert(
          `Image ${imageNumber} Selected`,
          "Image has been successfully selected."
        );
      } else {
        console.log(
          `Image ${imageNumber} selection was cancelled or no URI found.`
        );
        Alert.alert(
          `Image ${imageNumber} Error`,
          "No image URI was found. Please try again."
        );
      }
    } catch (error) {
      console.error(`Error selecting Image ${imageNumber}:`, error);
      Alert.alert(
        "Error",
        `An error occurred while selecting Image ${imageNumber}. Please try again.`
      );
    }
  };

  const compareFaces = async () => {
    console.log("Comparing Faces:", image1, image2);

    if (!image1 || !image2) {
      console.log("Error: One or both images are not selected");
      Alert.alert("Error", "Please select both images!");
      return;
    }

    setLoading(true);
    setSimilarity(null);

    let formData = new FormData();
    formData.append("api_key", API_KEY);
    formData.append("api_secret", API_SECRET);

    formData.append("image_file1", {
      uri: image1,
      type: "image/jpeg",
      name: "image1.jpg",
    });
    formData.append("image_file2", {
      uri: image2,
      type: "image/jpeg",
      name: "image2.jpg",
    });

    try {
      const response = await axios.post(
        "https://api-us.faceplusplus.com/facepp/v3/compare",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.confidence) {
        setSimilarity(response.data.confidence);
      } else if (response.data.error_message) {
        Alert.alert("Error", `API Error: ${response.data.error_message}`);
      } else {
        Alert.alert(
          "Error",
          "Failed to get similarity score. Please try again."
        );
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Error comparing images. Please try again.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Face Compare App</Text>
      <View style={styles.imageContainer}>
        <Button
          title="Pick First Image"
          onPress={() => pickImage(setImage1, 1)}
        />
        {image1 && <Image source={{ uri: image1 }} style={styles.image} />}
      </View>
      <View style={styles.imageContainer}>
        <Button
          title="Pick Second Image"
          onPress={() => pickImage(setImage2, 2)}
        />
        {image2 && <Image source={{ uri: image2 }} style={styles.image} />}
      </View>
      <Button title="enter" onPress={compareFaces} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {similarity !== null && (
        <Text style={styles.result}>Similarity: {similarity.toFixed(2)}%</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});
