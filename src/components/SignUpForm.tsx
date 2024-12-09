import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import Toast from 'react-native-simple-toast';


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Please enter a valid email'
    ),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

const SignUpForm = () => {
  const [password, setPassword] = useState('');

  const handleSignUp = (values: any) => {
    
    console.log('Sign Up Successful!', values);
    Toast.show('Sign Up Successful!', Toast.SHORT);
    
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={handleSignUp}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.form}>
          <Text style={styles.title}>Sign up</Text>
          <Text>Email:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              onChangeText={handleChange('email')}
              value={values.email}
              accessibilityLabel="Email Input"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <Text>Password:</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry
              onChangeText={(text) => {
                setPassword(text);
                handleChange('password')(text);
              }}
              value={values.password}
              accessibilityLabel="Password Input"
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <PasswordStrengthIndicator password={password} />

          <View style={styles.space}></View>

          <Button onPress={() => handleSubmit()} title="Sign Up" accessibilityLabel="Sign Up Button" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,  
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,  
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12, 
    position: 'absolute',
    top: '100%',
    left: 0,
  },
  space: {
    marginBottom: 10,
  },
});

export default SignUpForm;