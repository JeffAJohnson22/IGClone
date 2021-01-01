import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {styles} from './cameraStyles';
import {Permissions, permissionType} from '../../../helpers/permission';
const windowHeight = Dimensions.get('window').height;

const Camera = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [image, setImage] = useState(null);

  useEffect(() => {
    Permissions.requestMany([
      permissionType.camera,
      permissionType.photoLibrary,
    ]).then((status) => setHasPermission(status));
  }, []);

  const takePicture = async function (camera) {
    // const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync();
    setImage(data.uri);
  };

  if (!hasPermission) {
    return <View></View>;
  }

  return !image ? (
    <RNCamera
      style={styles.cameraContainer}
      type={type}
      flashMode={RNCamera.Constants.FlashMode.on}>
      {({camera}) => {
        return (
          <View>
            <View style={styles.captureCircle}>
              <TouchableOpacity onPress={() => takePicture(camera)}>
                <View style={styles.captureButton}></View>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom:30}}>
              <Button
                title="Flip Camera"
                onPress={() =>
                  setType(
                    type === RNCamera.Constants.Type.back
                      ? RNCamera.Constants.Type.front
                      : RNCamera.Constants.Type.back,
                  )
                }
              />
            </View>
          </View>
        );
      }}
    </RNCamera>
  ) : (
    <ImageBackground style={{height: windowHeight}} source={{uri: image}}>
      <Button
        onPress={() =>
          navigation.navigate('SaveScreen', {
            image,
          })
        }
        title="Save Image"
        color="#841584"
        style={styles.loginContainer}
      />
    </ImageBackground>
  );
};

export default Camera;
