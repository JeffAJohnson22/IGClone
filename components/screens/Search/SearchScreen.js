import React, {useState} from 'react';
import {
  View,
  Button,
  Image,
  FlatList,
  Text,
  StyleSheet,
  ListItem,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {styles} from './searchStyles';

const SearchScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firestore()
      .collection('users')
      .where('name', '>=', search)
      .get()
      .then((snapshot) => {
        let user = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {id, ...data};
        });
        setUsers(user);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <TextInput
            placeholder="Search Name"
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={(search) => fetchUsers(search)}
          />
          <FlatList
            style={{margin: 20}}
            numColumns={1}
            horizontal={false}
            data={users}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  padding: 10,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 20,
                }}
                onPress={() =>
                  navigation.navigate('Profile', {
                    uid: item.id,
                    name: item.name,
                    email: item.email,
                  })
                }>
                <Text ksy={item.id}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
