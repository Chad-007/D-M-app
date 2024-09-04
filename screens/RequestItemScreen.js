import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ItemRequestForm from "./ItemRequestForm";
import ViewRequests from "./ViewRequests";
export default function RequestItemScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        title="Request Item"
        onPress={() => navigation.navigate("item")}
      />
      <Button
        title="View Item Requests"
        onPress={() => navigation.navigate("view")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
