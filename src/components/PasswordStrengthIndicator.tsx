import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface PasswordStrengthIndicatorProps {
  password: string;
}

const getPasswordStrength = (password: string) => {
  const length = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);

  if (length === 0) return '';
  if (length < 8) return 'Weak';
  if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar && length < 10) {
    return 'Moderate';
  }
  if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar && length >= 10) {
    return 'Strong';
  }
  return 'Weak';
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password }) => {
  const strength = getPasswordStrength(password); 

  let strengthColor = 'gray';
  if (strength === 'Weak') {
    strengthColor = 'red';
  } else if (strength === 'Moderate') {
    strengthColor = 'orange';
  } else if (strength === 'Strong') {
    strengthColor = 'green';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Password Strength: </Text>
      <Text style={[styles.strengthText, { color: strengthColor }]}>{strength}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 14,
    color: 'gray',
    marginRight: 1,
  },
  strengthText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default PasswordStrengthIndicator;
