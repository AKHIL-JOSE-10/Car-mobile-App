import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import SignUpScreen from './src/Screens/SignUpScreen';
import SignInScreen from './src/Screens/SignInScreen';
import { Home } from './src/Screens/Home'; // Your welcome page
import Toast from 'react-native-toast-message'; // Import Toast

const App = () => {
  const [user, setUser] = useState(null); // Tracks if the user is signed in
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false); // Tracks if the app is in sign-up mode
  const [isSignedUp, setIsSignedUp] = useState(false); // Add this line

  const handleUserLogout = () => {
    setUser(null); // Update the state to reflect the user is logged out
  };

  const handleToggleAuthMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
    setErrorMessage(''); // Clear any error messages when switching modes
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        <Home user={user} onLogout={handleUserLogout} />
      ) : (
        <>
          {isSignUpMode ? (
            <SignUpScreen 
              setErrorMessage={setErrorMessage} 
              setIsSignedUp={setIsSignedUp} 
            />
          ) : (
            <SignInScreen 
              setUser={setUser} 
              setErrorMessage={setErrorMessage} 
            />
          )}

          <View style={styles.bottomContainer}>
            <Text style={styles.toggleText} onPress={handleToggleAuthMode}>
              {isSignUpMode ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </Text>
          </View>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </>
      )}
      
      {/* Add Toast container */}
      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  bottomContainer: {
    marginTop: 20,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default App;
