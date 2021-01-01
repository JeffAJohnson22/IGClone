import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  preview: {
    flex: 1,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 5,
  },
  captureCircle: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    width: 90,
    height: 90,
    borderRadius: 80,
    alignItems: 'center',
    borderColor: 'white',
    margin: 30,
  },
  captureButton: {
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  loginContainer: {
    position: 'relative',
    height: 40,
    backgroundColor: '#0088f8',
    justifyContent: 'center',
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
});

//           <Button
//             title="Save"
//             style={styles.capture}
//             onPress={() =>
//               this.state.navigation.navigate('SaveScreen', {
//                 image: this.state.image,
//               })
//             }
//           />