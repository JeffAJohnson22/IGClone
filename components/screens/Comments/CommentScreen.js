import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Image,
  FlatList,
  Text,
  StyleSheet,
  ListItem,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {clearData, fetchUsersData} from '../../redux/actions/actions';
import {store} from '../../../App';
import FastImage from 'react-native-fast-image';

const windowHeight = Dimensions.get('window').height;

const CommentScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {users, usersLoaded} = useSelector((state) => state.usersState);

  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [postID, setPostID] = useState('');
  const [text, setText] = useState('');
  const [uploading, setUploading] = useState(null);

  useEffect(() => {
    // const match = (comments) => {
    //   for (let i = 0; i < comments.length; i++) {
    //     if (comments[i].hasOwnProperty('user')) {
    //       continue;
    //     }
    //     const user = users.find((x) => x.uid === comments[i].creator);
    //     if (users === undefined) {
    //       dispatch(fetchUsersData(comments[i].creator, false));
    //     } else {
    //       comments[i].user = user;
    //     }
    //   }
    //   setComments(comments);
    // };

    if (route.params.postID !== postID) {
      firestore()
        .collection('posts')
        .doc(route.params.uid)
        .collection('userPosts')
        .doc(route.params.postID)
        .collection('comments')
        .get()
        .then((snapshot) => {
          let comment = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return {id, ...data};
          });
          setComments(comment);
        });
      setPostID(route.params.postID);
    }

    firestore()
      .collection('posts')
      .doc(route.params.uid)
      .collection('userPosts')
      .doc(route.params.postID)
      .collection('comments')
      .get()
      .then((snapshot) => {
        let allComment = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        setAllComments(allComment);
      });
  }, [
    route.params.postID,
    route.params.uid,
    postID,
    comments,
    users,
    dispatch,
  ]);

  console.log(allComments, 'allComments');

  const sendComment = () => {
    setUploading(true);
    firestore()
      .collection('posts')
      .doc(route.params.uid)
      .collection('userPosts')
      .doc(route.params.postID)
      .collection('comments')
      .add({
        creator: auth().currentUser.uid,
        text,
      });
    navigation.navigate('Feed');
    Alert.alert('Comment Posted');
  };
  console.log(route.params.image, 'route.params.image');
  return (
    <View>
      <FastImage
        style={{height: windowHeight / 2, margin: 10, borderColor: 'black'}}
        source={{uri: route.params.image}}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={(item) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <ScrollView>
        {allComments.map((comment) => (
          <View>
            <Text>{comment.text}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={{margin: 20, borderColor: 'red', borderWidth: 3}}
        placeholder="add a comments"
        placeholderTextColor="black"
        onChangeText={(text) => setText(text)}
      />
      <Button disabled={uploading} onPress={() => sendComment()} title="send" />
      {uploading && <ActivityIndicator size="large" color="#0073FF" />}
    </View>
  );
};

export default CommentScreen;
