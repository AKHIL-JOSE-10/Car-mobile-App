import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebaseConfig.js'; // Adjust the import according to your setup

const SignInScreen = ({ setUser, setErrorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    setErrorMessage(''); // Clear error message before attempting sign-in
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully!');
      // Set user state or handle post-sign-in actions here
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMessage('User not found. Please sign up.');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setErrorMessage('Invalid email address. Please enter a valid email.');
          break;
        default:
          setErrorMessage('User not found. Please sign up.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Sign In</Text> */}
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
        <Button title="Sign In" onPress={handleSignIn} color="#3498db" />
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
    marginTop:80,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  imageContainer: {
    width: '110%', // Ensure image container spans the full width of the sign-in container
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 0 // Add space between the image and the form
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
