import React from 'react';
import {View} from 'react-native';
import Camera from './Camera/Camera';

const AddScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Camera navigation={navigation} />
    </View>
  );
};

export default AddScreen;
