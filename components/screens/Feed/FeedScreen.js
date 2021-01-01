import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Button,
  FlatList,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import StoryFeed from './StoryFeed/StoryFeed';
import {clearData, fetchUsersFollowingPosts} from '../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './stylesFeed';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const FeedScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // dispatch(fetchUsersFollowingPosts())
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const {usersLoaded, feed} = useSelector((state) => state.usersState);
  const {following} = useSelector((state) => state.userState);
  console.log(following, 'here wer are');
  useEffect(() => {
    if (usersLoaded !== following.length && following.length !== 0) {
      feed.sort((x, y) => {
        return x.created - y.created;
      });
      setPosts(feed);
    }
  }, [dispatch, feed, following, following.length, navigation, usersLoaded]);

  const likePost = (userId, postID) => {
    firestore()
      .collection('posts')
      .doc(userId)
      .collection('userPosts')
      .doc(postID)
      .collection('likes')
      .doc(auth().currentUser.uid)
      .set({});
  };

  const removeLike = (userId, postID) => {
    firestore()
      .collection('posts')
      .doc(userId)
      .collection('userPosts')
      .doc(postID)
      .collection('likes')
      .doc(auth().currentUser.uid)
      .delete();
  };
  const signOut = () => {
    dispatch(clearData());
    auth().signOut();
  };

  return (
    <ScrollView>
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      <View>
        <StoryFeed />
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({item}) => (
            <View>
              <View style={styles.border} />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginBottom: 10,
                  marginLeft: 10,
                }}>
                <FastImage
                  source={{uri: 'https://picsum.photos/200'}}
                  style={{width: 55, height: 55, borderRadius: 70}}
                />
                <Text style={{margin: 20}}>{item.user.name}</Text>
              </View>
              <FastImage
                key={item.id}
                style={styles.image}
                source={{uri: item.imageUrl}}
              />

              {item.currentUserLike ? (
                <Button
                  title="Dislike"
                  onPress={() => removeLike(item.user.uid, item.id)}
                />
              ) : (
                <Button
                  title="Like"
                  onPress={() => likePost(item.user.uid, item.id)}
                />
              )}
              <View style={{flex: 1, flexDirection: 'row'}} key={item.name}>
                <Text style={{fontWeight: 'bold', marginRight: 10}}>
                  {item.user.name}
                </Text>
                <Text>{item.caption}</Text>
              </View>
              <Text
                onPress={() =>
                  navigation.navigate('Comments', {
                    image: item.imageUrl,
                    postID: item.id,
                    uid: item.user.uid,
                  })
                }>
                View Comments
              </Text>
            </View>
          )}
        />
      </View>

      <Button title="Sign Out" onPress={signOut} />
    </ScrollView>
  );
};

export default FeedScreen;
