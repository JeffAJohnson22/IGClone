import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Dimensions,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import storage, {firebase} from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const windowHeight = Dimensions.get('window').height;
import {styles} from './saveStyles';

const SaveScreen = ({route, navigation}) => {
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(null);
  const [transfer, setTransfer] = useState(null);
  // const [imageUrl, setImageUrl] = useState(null);
  const childPath = `posts/${auth().currentUser.uid}/${Math.random().toString(
    36,
  )}`;

  console.log(route.params.image, 'filename');

  const uploadImage = async () => {
    const fileName = route.params.image;
    console.log(fileName, 'filename');
    const response = await fetch(fileName);
    console.log(response, 'respsonse');
    const blob = await response.blob();
    const base64File = fileName.substr(fileName.lastIndexOf('/'));

    setUploading(true);
    try {
      await storage().ref(base64File).child(childPath).put(blob);
      setUploading(false);
      Alert.alert('Image Uploaded', 'Youre good its up there!');
      navigation.navigate('Feed');

      const task = storage().ref(base64File).child(childPath).put(blob);

      const taskProgress = () => {
        console.log(`transferred: ${task.snapshot.bytesTransferred}`);
      };

      const taskCompleted = () => {
        task.snapshot.ref.getDownloadURL().then((snapshot) => {
          console.log(snapshot, 'snap');
          savePostData(snapshot);
        });
      };

      const taskError = async () => {
        console.log(task.snapshot);
      };

      task.on('state_changed', taskProgress, taskError, taskCompleted);
    } catch (error) {
      setUploading(false);
    }
  };

  const savePostData = (imageUrl) => {
    console.log(imageUrl, 'url image');
    firestore()
      .collection('posts')
      .doc(auth().currentUser.uid)
      .collection('userPosts')
      .add({
        imageUrl,
        caption,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={{flex: 1}}>
            <Image
              style={{height: windowHeight / 2, marginTop: 10}}
              source={{uri: route.params.image}}
            />
            <View style={styles.textInput}>
              <TextInput
                placeholderTextColor="black"
                style={{
                  marginStart: 10,
                }}
                placeholder="Write a Caption . . ."
                onChangeText={(caption) => setCaption(caption)}
              />
            </View>
            <Button
              disabled={uploading}
              title="Save"
              onPress={() => uploadImage()}
            />
            {uploading && <ActivityIndicator size="large" color="#0073FF" />}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );

  // );
};

export default SaveScreen;
