import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LandingPage = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.title}>Welcome!!!</Text>
      <Text style={styles.subtitle}>Implementing a Credible Account Manager</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Black background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    alignItems: 'center',
    marginBottom: 350,
  },
  logo: {
    width: 127,
    height: 130,
    marginBottom: 50,
  },
  title: {
    color: '#fff', // White text color
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#aaa', // Light gray text color
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#99ccff', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingPage;
