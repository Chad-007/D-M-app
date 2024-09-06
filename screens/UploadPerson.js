import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

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
      const response = await fetch("http://192.168.19.122:5000/api/person", {
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
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Select Photo" onPress={handleSelectPhoto} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 12,
  },
});

export default UploadPersonScreen;
