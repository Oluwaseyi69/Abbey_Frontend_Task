import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2, 
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 2, 
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.replace('LandingPage');
    }, 7000); 
  }, [scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/LegiLogo-removebg-preview.png')}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logo: {
    width: 127,
    height: 130,
  },
});

export default SplashScreen;
