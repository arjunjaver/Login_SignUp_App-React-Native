import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignUpForm from '../components/SignUpForm';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Get Started</Text>
      <SignUpForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SignUpScreen;
