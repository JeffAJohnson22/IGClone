import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Image,
  FlatList,
  Text,
  StyleSheet,
  ListItem,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './stylesProfile';
import firestore from '@react-native-firebase/firestore';
import {
  fetchUserPosts,
  fetchUserFollowing,
  fetchUsersFollowingPosts,
  fetchUsersData,
} from '../../redux/actions/actions';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import {store} from '../../../App';

const ProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [userPost, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [follow, setFollow] = useState(false);
  const {userState} = store.getState();

  const {posts, currentUser, following} = useSelector(
    (state) => state.userState,
  );

  useEffect(() => {
    dispatch(fetchUserPosts(route.params.uid));

    if (following.indexOf(route.params.uid) > -1) {
      setFollow(true);
    } else {
      setFollow(false);
    }
    if (route.params.uid === auth().currentUser.uid) {
      setUser(route.params.name);
    }
  }, [dispatch, following, route.params.name, route.params.uid]);

  const signOut = () => {
    auth().signOut();
  };
  const followed = () => {
    firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .doc(route.params.uid)
      .set({});
  };

  const unFollow = async () => {
    firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .doc(route.params.uid)
      .delete();
  };
  if (user === null) {
    return (
      <View style={styles.infoContainer}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (posts?.length === 0) {
    return (
      <View>
        <Text style={{fontSize: 20, marginLeft: 15, marginBottom: 10}}>
          {route.params.name || currentUser.name}
        </Text>
        <View style={Styles.container}>
          <TouchableOpacity>
            <LinearGradient
              colors={['#CA1D7E', '#E35157', '#F2703F']}
              start={{x: 0.0, y: 1.0}}
              end={{x: 1.0, y: 1.0}}
              style={{borderRadius: 100, padding: 2}}>
              <View style={{borderWidth: 2, borderRadius: 100}}>
                <Image
                  source={{uri: 'https://picsum.photos/200'}}
                  style={{width: 70, height: 70, borderRadius: 70}}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <View></View>
        </View>
        <View style={styles.infoContainer}></View>
        {route.params.uid !== auth().currentUser.uid && (
          <View>
            {follow ? (
              <Button title="you are following" onPress={() => unFollow()} />
            ) : (
              <Button
                title="you are not following"
                onPress={() => followed()}
              />
            )}
          </View>
        )}

        <Text> You have no Posts</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, marginLeft: 15, marginBottom: 10}}>
        {route.params.name || currentUser.name}
      </Text>
      <View style={Styles.container}>
        <TouchableOpacity>
          <LinearGradient
            colors={['#CA1D7E', '#E35157', '#F2703F']}
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 1.0}}
            style={{borderRadius: 100, padding: 2}}>
            <View style={{borderWidth: 2, borderRadius: 100}}>
              <Image
                source={{uri: 'https://picsum.photos/200'}}
                style={{width: 70, height: 70, borderRadius: 70}}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <View></View>
      </View>
      <View style={styles.infoContainer}></View>
      {route.params.uid !== auth().currentUser.uid && (
        <View>
          {follow ? (
            <Button title="you are following" onPress={() => unFollow()} />
          ) : (
            <Button title="you are not following" onPress={() => followed()} />
          )}
        </View>
      )}

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          keyExtractor={(users) => users.id}
          renderItem={({item, key}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Comments', {
                  image: item.imageUrl,
                  postID: item.id,
                  uid: route.params.uid,
                })
              }
              style={styles.containerImage}>
              <FastImage
                key={item.id}
                style={styles.image}
                source={{uri: item.imageUrl}}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default ProfileScreen;

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginStart: 10,
    marginEnd: 10,
    // marginTop: 10,
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  storyText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  storyView: {
    flex: 1,
    flexDirection: 'row',
  },
});
