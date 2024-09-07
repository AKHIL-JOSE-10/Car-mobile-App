import { initializeApp } from '@firebase/app';
import { initializeAuth, getReactNativePersistence } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHy9aj1DiUuqpxwA7yLQq8tKYLZRbsuAQ",
  authDomain: "login-signup-44b22.firebaseapp.com",
  projectId: "login-signup-44b22",
  storageBucket: "login-signup-44b22.appspot.com",
  messagingSenderId: "173222285672",
  appId: "1:173222285672:web:498f2f72bbd5a80ba4c6dd",
  measurementId: "G-X0Y8Q6DHCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };