import {Platform} from 'react-native';
import {PERMISSIONS, check, RESULTS, request} from 'react-native-permissions';

const cameraPermissionsPlatform = {
  ios: PERMISSIONS.IOS.CAMERA,
};
const microphonePermissionsPlatform = {
  ios: PERMISSIONS.IOS.MICROPHONE,
};

const photoLibraryPermissionsPlatform = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
};
const photoLibraryAddPermissionsPlatform = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
};

const permissionTypeRequested = {
  camera: cameraPermissionsPlatform,
  microphone: microphonePermissionsPlatform,
  photoLibrary: photoLibraryPermissionsPlatform,
  photoAddLibrary: photoLibraryAddPermissionsPlatform,
};

const permissionType = {
  camera: 'camera',
  microphone: 'microphone',
  photoLibrary: 'photoLibrary',
  photoAddLibrary: 'photoAddLibrary',
};

class AppPermissions {
  checkPermssions = async (type) => {
    const permssions = permissionTypeRequested[type][Platform.OS];

    if (!permssions) {
      return true;
    }
    try {
      const result = await check(permssions);

      if (result === RESULTS.GRANTED) return true;
      return this.requestPermssions(permssions);
    } catch (error) {
      console.log(error, 'rerror');

      return false;
    }
  };

  requestPermssions = async (permssions) => {

    try {
      const result = await request(permssions);

      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log(error, 'rerror');

      return false;
    }
  };

  requestMany = async (types) => {
    const results = [];
    for (const type of types) {
      const permssions = permissionTypeRequested[type][Platform.OS];
      if (permssions) {
        const result = await this.requestPermssions(permssions);
        results.push(result);
      }
    }
    for (const result of results) {
      if (!result) {
        return false;
      }
    }
    return true;
  };
}

const Permissions = new AppPermissions();
export {Permissions, permissionType};
