import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebaseConfig.js'; // Adjust according to your setup
import { ShowToast } from '../components/Toast.js';

const SignUpScreen = ({ setErrorMessage, setIsSignedUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    ShowToast('info', 'Processing your sign-up...'); // Optional: Show a message indicating that the process is ongoing
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      ShowToast('success', 'Signup successful! Please log in.');
      setIsSignedUp(true);
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use. Please use a different email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'The password must contain at least 6 characters.';
          break;
        default:
          errorMessage = 'Sign Up error: ' + error.message;
      }
      ShowToast('error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/6.jpg')} style={styles.carImage} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage('');
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
            setErrorMessage('');
          }}
          placeholder="Enter your password"
          secureTextEntry
        />
        <Button title="Sign Up" onPress={handleSignUp} color="#3498db" />
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
    marginTop: 75,
    alignItems: 'center', // Center items horizontally
  },
  imageContainer: {
    width: '120%', // Ensure image container spans the full width of the sign-in container
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
