import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RNCamera } from "react-native-camera";
import axios from "axios";

const FaceDetectionScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const [faces, setFaces] = useState([]);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await RNCamera.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const formData = new FormData();
      formData.append("photo", {
        uri: photo.uri,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      try {
        const response = await axios.post(
          "http://localhost:5000/recognize", // Adjust the port and endpoint
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFaces(response.data.faces);
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  if (hasCameraPermission === null) {
    return (
      <View>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasCameraPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={cameraType}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        onFacesDetected={({ faces }) => setFaces(faces)}
        faceDetectorSettings={{
          mode: RNCamera.Constants.FaceDetection.Mode.fast,
          detectLandmarks: RNCamera.Constants.FaceDetection.Landmarks.all,
          runClassifications:
            RNCamera.Constants.FaceDetection.Classifications.all,
        }}
      />
      <Button title="Capture" onPress={handleCapture} />
      {faces.length > 0 && (
        <View style={styles.facesContainer}>
          {faces.map((face, index) => (
            <Text key={index}>
              Face {index + 1}: {JSON.stringify(face)}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    flex: 1,
    width: "100%",
  },
  facesContainer: {
    marginTop: 20,
  },
});

export default FaceDetectionScreen;
