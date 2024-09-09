import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from '@firebase/auth';
import { auth } from '../../firebaseConfig.js'; // Adjust the import path
import { ShowToast } from '../components/Toast.js'; // Import the ShowToast function

const Home = ({ user, onLogout }) => {
  // State variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState('');

  const handleLogout = async () => {
    console.log('Logout button pressed');
    try {
      await signOut(auth);
      ShowToast('success', 'User logged out successfully!');
      onLogout(); // Call the parent callback to update state
    } catch (error) {
      console.error('Error logging out: ', error);
      ShowToast('error', 'Error logging out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logout button at the top right */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.title}>User Information (Kuruvila)</Text>

        {/* Form Fields */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Place"
          value={place}
          onChangeText={setPlace}
        />
        {/* Gender Radio Buttons */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity style={styles.radioButton} onPress={() => setGender('male')}>
            <View style={styles.radioCircle}>
              {gender === 'male' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioButton} onPress={() => setGender('female')}>
            <View style={styles.radioCircle}>
              {gender === 'female' && <View style={styles.radioSelected} />}
            </View>
            <Text style={styles.radioText}>Female</Text>
          </TouchableOpacity>
        </View>

        <Button title="Submit" onPress={() => console.log("Form submitted")} color="#3498db" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 40, // Added padding to prevent overlap with the status bar
  },
  logoutButton: {
    alignSelf: 'flex-end',
    marginBottom: 40,
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
    marginTop: 20,
    width: 300,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#3498db',
  },
  radioText: {
    fontSize: 16,
  },
});

export { Home };
