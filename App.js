import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth } from './firebaseConfig.js'; // Adjust the import according to your setup
import SignInScreen from './src/Screens/SignInScreen.js';
import SignUpScreen from './src/Screens/SignUpScreen.js';

const AuthenticatedScreen = ({ user, handleLogout }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully!');
    } catch (error) {
      setErrorMessage('Logout error: ' + error.message);
    }
  };

  const handleToggleAuthMode = () => {
    setIsSignIn(prevIsSignIn => !prevIsSignIn);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <AuthenticatedScreen user={user} handleLogout={handleLogout} />
      ) : (
        <>
          {isSignIn ? (
            <SignInScreen setUser={setUser} setErrorMessage={setErrorMessage} />
          ) : (
            <SignUpScreen setUser={setUser} setErrorMessage={setErrorMessage} />
          )}
          <View style={styles.bottomContainer}>
            <Text style={styles.toggleText} onPress={handleToggleAuthMode}>
              {isSignIn ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </Text>
          </View>
        </>
      )}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default App;