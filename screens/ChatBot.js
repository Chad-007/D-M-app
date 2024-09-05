// screens/BotScreen.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

const ChatBot = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "http://localhost:3000/webchat.html" }} // Replace with your URL
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatBot;
