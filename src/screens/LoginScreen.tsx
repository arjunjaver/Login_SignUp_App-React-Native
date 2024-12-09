import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';


const LoginScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <LoginForm navigation={navigation}/>
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

export default LoginScreen;
