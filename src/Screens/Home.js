import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from '@firebase/auth';
import { auth } from '../../firebaseConfig.js'; // Adjust the import path
import { ShowToast } from '../components/Toast.js'; // Import the ShowToast function

const Home = ({ user, onLogout }) => {
  const handleLogout = async () => {
    console.log('Logout button pressed');
    try {
      await signOut(auth);
      ShowToast('success', 'User logged out successfully!'); // Show success message
      onLogout(); // Call the parent callback to update state
    } catch (error) {
      console.error('Error logging out: ', error);
      ShowToast('error', 'Error logging out. Please try again.'); // Show error message
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome To Kuruvilas Car App</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
    alignItems: 'center',
    marginTop: 75,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export { Home };
