import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebaseConfig.js'; // Adjust the import according to your setup

const SignUpScreen = ({ setUser, setErrorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    setErrorMessage(''); // Clear error message before attempting sign-up
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully!');
      // Set user state or handle post-sign-up actions here
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMessage('Email already in use. Please use a different email.');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Invalid email address.');
          break;
        case 'auth/weak-password':
          setErrorMessage('The password must contain at least 6 characters.');
          break;
        default:
          setErrorMessage('Sign Up error: ' + error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/car.png')} style={styles.carImage} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage(''); // Clear error message on input change
          }}
          placeholder="Enter your email"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage(''); // Clear error message on input change
          }}
          placeholder="Enter your password"
          secureTextEntry
        />
        <Button title="Sign Up" onPress={handleSignUp} color="#2ecc71" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
    marginTop: 80,
    alignItems: 'center', // Center items horizontally
  },
  imageContainer: {
    width: '110%', // Ensure image container spans the full width of the sign-in container
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 0, // Add space between the image and the form
  },
  carImage: {
    width: '93%', // Make car image occupy full width of the container
    height: 150, // Adjust height as needed
  },
  formContainer: {
    width: '100%', // Ensure form container fills the width of the sign-in container
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    width: '100%', // Ensure inputs fill the width of the container
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333', // Color for the label text
    fontWeight: 'bold', // Make label text bold
    marginLeft: 3,
  },
});

export default SignUpScreen;
