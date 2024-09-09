import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebaseConfig.js'; // Adjust the import according to your setup
import { ShowToast } from '../components/Toast.js'; // Import the ShowToast function

const SignInScreen = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    ShowToast('info', 'Processing your sign-in...'); // Optional: Show a message indicating that the process is ongoing
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Set user state in parent component
      ShowToast('success', 'User signed in successfully!');
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/user-not-found':
          ShowToast('error', 'User not found. Please sign up.');
          break;
        case 'auth/wrong-password':
          ShowToast('error','Incorrect password. Please try again.')
          break;
        case 'auth/invalid-email':
          ShowToast('error','Invalid email address. Please enter a valid email.')
          break;
        default:
          ShowToast('error','Invalid Credentials')
      }
      ShowToast('error','Invalid Credentials')
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/7.jpg')} style={styles.carImage} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            // Clear the error message when input changes (if needed)
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
            // Clear the error message when input changes (if needed)
          }}
          placeholder="Enter your password"
          secureTextEntry
        />
        <Button title="Sign In" onPress={handleSignIn} color="#2ecc71" />
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
    alignItems: 'center', // Center items horizontally
    marginTop: 75,
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

export default SignInScreen;
