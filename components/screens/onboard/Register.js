import React, {useState} from 'react';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {styles} from './onboard';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const createAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        firestore().collection('users').doc(auth().currentUser.uid).set({
          name,
          email,
          password,
        });
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          Alert.alert('Email already in use');

          console.log('That email address is already in use!');
        }
        if (err.code === 'auth/invalid-email') {
          Alert.alert('This is not a valid email address');

          console.log('That email address is invalid!');
        }
        console.error(err);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.userNameContainer}>
            <TextInput
              placeholderTextColor="black"
              style={styles.userNameInput}
              placeholder="name"
              onChangeText={(name) => setName(name)}
            />
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholderTextColor="black"
              style={styles.passwordInput}
              placeholder="email"
              onChangeText={(email) => setEmail(email)}
            />
          </View>

          <View style={styles.passwordContainer}>
            <TextInput
              placeholderTextColor="black"
              placeholder="password"
              style={styles.passwordInput}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={createAccount}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Register;
