import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Feather"; // For icons

const UploadPersonScreen = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [photoUri, setPhotoUri] = useState(null);

  const handleSelectPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    } else {
      Alert.alert("No image selected", "Please select an image to proceed.");
    }
  };

  const handleSubmit = async () => {
    if (!name || !address || !photoUri) {
      Alert.alert(
        "Missing Fields",
        "Please fill in all fields and select a photo."
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("address", address);
    formData.append("photo", {
      uri: photoUri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      const response = await fetch("http://192.168.27.122:5000/api/person", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload photo");
      }

      const data = await response.json();
      console.log(data);
      Alert.alert("Success", "Person data and photo uploaded successfully.");
    } catch (error) {
      console.error("Error uploading photo:", error);
      Alert.alert("Error", "Failed to upload photo.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#FFF"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        placeholderTextColor="#FFF"
      />
      <TouchableOpacity style={styles.button} onPress={handleSelectPhoto}>
        <Icon name="image" size={30} color="#FFD700" />
        <Text style={styles.buttonText}>Select Photo</Text>
      </TouchableOpacity>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Icon name="upload" size={30} color="#FFD700" />
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Dark background
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#1C1C1C", // Dark input background
    color: "#FFD700", // Gold text color
  },
  button: {
    width: "80%",
    backgroundColor: "#1C1C1C", // Dark button background
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFD700", // Gold text color
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default UploadPersonScreen;
