import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

// Validation Schema
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const LoginForm = ({ navigation }: { navigation: any }) => {
  const loadRememberedEmail = async (setFieldValue: any) => {
    try {
      const savedEmail = await AsyncStorage.getItem('rememberedEmail');
      if (savedEmail) {
        setFieldValue('email', savedEmail);
        setFieldValue('rememberMe', true);
      }
    } catch (error) {
      console.log('Error loading remembered email:', error);
    }
  };

  const handleLogin = async (values: any) => {
    const { email, password, rememberMe } = values;

    if (email === 'admin@gmail.com' && password === 'Admin@12345') {
      if (rememberMe) {
        try {
          await AsyncStorage.setItem('rememberedEmail', email);
        } catch (error) {
          console.log('Error saving email:', error);
        }
      } else {
        try {
          await AsyncStorage.removeItem('rememberedEmail');
        } catch (error) {
          console.log('Error removing email:', error);
        }
      }
      Toast.show('Login Successful!', Toast.SHORT);
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => {
        useEffect(() => {
          loadRememberedEmail(setFieldValue);
        }, []);

        return (
          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              autoCapitalize="none"
              keyboardType="email-address"
              accessibilityLabel="Enter your email"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            </View>

            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
              accessibilityLabel="Enter your password"
              />
            {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
            )}
            </View>
        

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                onPress={() =>
                  setFieldValue('rememberMe', !values.rememberMe)
                }
                style={styles.checkbox}
                accessibilityRole="checkbox"
                accessibilityLabel="Remember me"
              >
                {values.rememberMe && <View style={styles.checked} />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Remember Me</Text>
            </View>

            <Button
              title="Login"
              onPress={() => handleSubmit()} 
              accessibilityLabel="Login Button"
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('Sign Up')}
              style={styles.linkContainer}
              accessibilityLabel="Go to Sign Up"
            >
              <Text style={styles.linkText}>
                Don't Have an Account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop:10,
    
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
    position: 'absolute',
    top: '100%',

  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop:10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checked: {
    width: 14,
    height: 14,
    backgroundColor: '#007BFF',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default LoginForm;
