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
  Image,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {styles} from './onboard';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [noAccouunt, setNoAccount] = useState('');

  const SignUp = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => console.log('res', response))
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
          <View style={styles.logoContainer}>
            <Image
              source={require('../../images/logoBlack.png')}
              style={{
                width: 200,
                height: 100,
                resizeMode: 'contain',
                marginBottom: 20,
              }}
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

          <View>
            <Text
              onPress={() => Alert.alert('Dang Thats Crazy... Good luck though')}
              style={styles.forgotPasswordText}>
              Forgot password?
            </Text>
          </View>

          <TouchableOpacity style={styles.loginContainer} onPress={SignUp}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.border} />

          <View
            style={{
              marginTop: 40,
              marginBottom: 40,
              flex: 1,
              alignItems: 'center',
            }}>
            <Text>Other Logins</Text>
          </View>

          <View style={styles.border} />

          <View style={styles.registerContainer}>
            <Text style={styles.accountText}>Dont have an account ?</Text>
            <Text
              style={{color: '#007BFF'}}
              onPress={() => navigation.navigate('Register')}>
              Sign Up
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
