import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({
    firstName: '',
    lastName: '',
  });
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const response = await fetch('https://abbey-backend-task.onrender.com/api/auth/getUser', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (response.status === 200) {
            setUserInfo(data);
            setUpdateInfo({ firstName: data.firstName, lastName: data.lastName });
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: data.error || 'Failed to fetch user profile',
            });
          }
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occurred while fetching the profile',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    setIsUpdating(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch('https://abbey-backend-task.onrender.com/api/auth/update', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateInfo),
        });

        const data = await response.json();

        if (response.status === 200) {
          setUserInfo((prev) => ({
            ...prev,
            firstName: updateInfo.firstName,
            lastName: updateInfo.lastName,
          }));
          setUpdateDisabled(true);
          setShowPreview(true); 
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Profile updated successfully",
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: data.error || 'Failed to update profile',
          });
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while updating the profile',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch('https://abbey-backend-task.onrender.com/api/auth/deleteUser', {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          await AsyncStorage.removeItem('userToken');
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Account deleted successfully',
          });
          navigation.navigate('Login'); 
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: data.error || 'Failed to delete account',
          });
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while deleting the account',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.label}>Username: {userInfo.username}</Text>
      <Text style={styles.label}>Email: {userInfo.email}</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#ccc"
        value={updateInfo.firstName}
        onChangeText={(text) =>
          setUpdateInfo({ ...updateInfo, firstName: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#ccc"
        value={updateInfo.lastName}
        onChangeText={(text) =>
          setUpdateInfo({ ...updateInfo, lastName: text })
        }
      />

      <TouchableOpacity
        style={[styles.button, styles.updateButton]}
        onPress={handleUpdateProfile}
        disabled={isUpdating}
      >
        <Text style={styles.buttonText}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.deleteButton]}
        onPress={handleDeleteAccount}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Deleting..." : "Delete Account"}
        </Text>
      </TouchableOpacity>
      <Modal
        visible={showPreview}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPreview(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profile Updated</Text>
            <Text style={styles.modalLabel}>
              First Name: {userInfo.firstName}
            </Text>
            <Text style={styles.modalLabel}>
              Last Name: {userInfo.lastName}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPreview(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
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
  updateButton: {
    backgroundColor: "green",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
});

export default Profile;
