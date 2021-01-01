import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import AddScreen from './components/screens/Add/AddScreen';
import FeedScreen from './components/screens/Feed/FeedScreen';
import CommentScreen from './components/screens/Comments/CommentScreen'
import SaveScreen from './components/screens/Save/SaveScreen';
import MainScreen from './components/screens/Main/MainScreen';
import Landing from './components/screens/onboard/Landing';
import Register from './components/screens/onboard/Register';
import Login from './components/screens/onboard/Login';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Reducers from './components/redux/reducers/reducers';
import thunk from 'redux-thunk';

const store = createStore(Reducers, applyMiddleware(thunk));
const {users, usersLoaded} = store.getState().usersState;

const {Navigator, Screen} = createStackNavigator();

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Navigator>
          <Screen name="Landing" component={Landing} />
          <Screen name="Register" component={Register} />
          <Screen name="Login" component={Login} />
        </Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator>
          <Screen
            name="Landing"
            component={MainScreen}
            option={{headerShown: false}}
          />
          <Screen name="AddScreen" component={AddScreen} />
          <Screen name="SaveScreen" component={SaveScreen} />
          <Screen
            name="FeedScreen"
            usersLoaded={usersLoaded}
            users={users}
            component={FeedScreen}
          />
          <Screen name="Comments"  component={CommentScreen} />
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export {App, store};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
