import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

// Icons
import ic_cross_white from 'assets/icons/ic_cross_white.png';
import ic_camera_snap from 'assets/icons/ic_camera_snap.png';

const TakeVisitorPhotoScreen = props => {
  const {navigation} = props;
  let cameraRef = null;
  const getPhotoCallback = navigation.getParam('getPhotoCallback', null);

  const setCameraRef = ref => {
    cameraRef = ref;
  };

  const handleSnap = async () => {
    try {
      if (cameraRef && getPhotoCallback) {
        const options = {quality: 0.5};
        const data = await cameraRef.takePictureAsync(options);

        getPhotoCallback(data);
        navigation.pop();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => {
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        ref={setCameraRef}
        style={styles.cameraPreview}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />

      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Image
          source={ic_cross_white}
          resizeMode="cover"
          style={styles.closeButtonIcon}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSnap} style={styles.snapButton}>
        <Image
          source={ic_camera_snap}
          resizeMode="cover"
          style={styles.snapButtonIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TakeVisitorPhotoScreen;
