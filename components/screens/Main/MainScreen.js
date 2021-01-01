import React, {useEffect} from 'react';
import FeedScreen from '../Feed/FeedScreen';
import SearchScreen from '../Search/SearchScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import EmptyScreen from '../EmptyScreen';
import {useDispatch} from 'react-redux';
import {
  fetchUser,
  fetchUserPosts,
  fetchUsersData,
  fetchUserFollowing,
  fetchUsersFollowingPosts,
  fetchUsersFollowingLikes,
  clearData,
} from '../../redux/actions/actions';
import auth from '@react-native-firebase/auth';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {Navigator, Screen} = createMaterialBottomTabNavigator();
import {store} from '../../../App';

const MainScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {following} = store.getState().userState;

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchUserPosts());
    dispatch(fetchUserFollowing());
    dispatch(fetchUsersData());
    dispatch(fetchUsersFollowingPosts());
    dispatch(fetchUsersFollowingLikes());
  }, [dispatch]);

  // const {posts, currentUser} = useSelector((state) => state.userState);
  // const signOut = () => {
  //   auth().signOut();
  // };
  // if (currentUser === undefined) {
  //   return <View style={styles.container}>></View>;
  // }

  return (
    <Navigator
      labeled={true}
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'green',
      }}>
      <Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({color}) => (
            <Icon name={'home'} color={color} size={26} />
          ),
        }}
      />
      <Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Icon name={'magnify'} color={color} size={26} />
          ),
        }}
      />
      <Screen
        name="AddContainer"
        component={EmptyScreen}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({color}) => (
            <Icon name={'camera'} color={color} size={26} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('AddScreen');
          },
        })}
      />
      <Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name={'skull'} color={color} size={26} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Profile', {
              uid: auth().currentUser.uid,
            });
          },
        })}
      />
      {/* <Text>{currentUser?.name} is Logged in</Text>
      <Button title="Sign Out" onPress={signOut} /> */}
    </Navigator>
  );
};

export default MainScreen;
