import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddFriend = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [friendInfo, setFriendInfo] = useState(null);
  const [isSendingRequest, setIsSendingRequest] = useState(false);

   const handleSendFriendRequest = async () => {
     if (!friendInfo) return;

     setIsSendingRequest(true);
     try {
       const token = await AsyncStorage.getItem("userToken");
       if (token) {
         const response = await fetch(
           `https://abbey-backend-task.onrender.com/api/auth/addFriend`,
           {
             method: "POST",
             headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json",
             },
             body: JSON.stringify({ friendId: friendInfo.id }),
           }
         );

         const data = await response.json();

         if (response.status === 201) {
           Toast.show({
             type: "success",
             text1: "Success",
             text2: "Friend request sent successfully",
           });
           setFriendInfo(null);
           setSearchQuery("");
         } else {
           Toast.show({
             type: "error",
             text1: "Error",
             text2: data.error || "Failed to send friend request",
           });
         }
       }
     } catch (error) {
       Toast.show({
         type: "error",
         text1: "Error",
         text2: "An error occurred while sending the friend request",
       });
     } finally {
       setIsSendingRequest(false);
     }
   };

  const handleSearchFriend = async () => {
    if (searchQuery.trim() === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter a username or email to search",
      });
      return;
    }
    console.log(searchQuery)

    setIsSearching(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token);
      if (token) {
        const response = await fetch(
          `https://abbey-backend-task.onrender.com/api/auth/search`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: searchQuery }), 
          }
        );

        const data = await response.json();
        console.log(data)

        if (response.status === 200) {
          setFriendInfo(data);
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: data.error || "No user found",
          });
          setFriendInfo(null);
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while searching for the user",
      });
      setFriendInfo(null);
    } finally {
      setIsSearching(false);
    }
  };

 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Friend</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username or email"
        placeholderTextColor="#ccc"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TouchableOpacity
        style={[styles.button, styles.searchButton]}
        onPress={handleSearchFriend}
        disabled={isSearching}
      >
        <Text style={styles.buttonText}>
          {isSearching ? "Searching..." : "Search"}
        </Text>
      </TouchableOpacity>

      {isSearching && <ActivityIndicator size="large" color="#0000ff" />}

      {friendInfo && (
        <View style={styles.friendInfoContainer}>
          <Text style={styles.friendInfoText}>
            Username: {friendInfo.username}
          </Text>
          <Text style={styles.friendInfoText}>Email: {friendInfo.email}</Text>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handleSendFriendRequest}
            disabled={isSendingRequest}
          >
            <Text style={styles.buttonText}>
              {isSendingRequest ? "Sending..." : "Add Friend"}
            </Text>
          </TouchableOpacity>
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
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    color: "#000",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
    fontSize: 16,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  searchButton: {
    backgroundColor: "blue",
  },
  addButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  friendInfoContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  friendInfoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AddFriend;
