import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  userNameContainer: {
    borderColor: '#ececec',
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  userNameInput: {
    marginStart: 10,
  },
  passwordContainer: {
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    //alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    backgroundColor: '#fafafa',
    marginBottom: 20,
  },
  passwordInput: {marginStart: 10},
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginEnd: 20,
  },
  loginContainer: {
    alignItems: 'center',
    height: 40,
    marginTop: 30,
    backgroundColor: '#0088f8',
    justifyContent: 'center',
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  loginText: {
    color: '#fff',
  },
  border: {
    margin: 30,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40
  },
  accountText: {textAlign: 'right', marginRight: 10},
  forgotPasswordText: {textAlign: 'right', marginRight: 10, color: '#007BFF'},
});
