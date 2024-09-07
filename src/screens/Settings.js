// SettingsScreen.js

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("Login"); // Change to your login or home screen name
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigateToScreen("HelpAndSupport")}
        >
          <Text style={styles.optionText}>Help and Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigateToScreen("SettingsAndPrivacy")}
        >
          <Text style={styles.optionText}>Settings and Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigateToScreen("Events")}
        >
          <Text style={styles.optionText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigateToScreen("Feeds")}
        >
          <Text style={styles.optionText}>Feeds</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 18,
  },
  logoutButton: {
    paddingVertical: 15,
    backgroundColor: "#f00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default SettingsScreen;
