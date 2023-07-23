import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from 'screens/TakeVisitorPhotoScreen/styles';
import CustomLoader from 'components/CustomLoader';

import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
//pinchGesture
import ZoomView from './pinchGesture';
// Icons
import ic_cross_white from 'assets/icons/ic_cross_white.png';
import ic_camera_snap from 'assets/icons/ic_camera_snap.png';

const MAX_ZOOM = 7; // iOS only
const ZOOM_F = Platform.OS === 'ios' ? 0.007 : 0.08;

const TakeVisitorPhotoScreen = props => {
  const [isLoading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(0.0);
  var _prevPinch;
  const {navigation} = props;
  let cameraRef = null;
  // const getPhotoCallback = navigation.getParam('getPhotoCallback', null);

  const setCameraRef = ref => {
    cameraRef = ref;
  };

  const handleSnap = async () => {
    try {
      if (cameraRef) {
        const options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          maxWidth: 250,
          maxHeight: 250,
          quality: 0.3,
        };
        const data = await cameraRef.takePictureAsync(options);
        const item = props.navigation.getParam('item', null);
        setLoading(true);

        const photo = data;
        const {student_id} = item;
        await props.studentUploadImage(student_id, photo);
        const response = props.isStudentUploadImage;
        if (response) {
          setLoading(false);
          navigation.navigate('TeacherTakeStudentPhoto', {data});
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = () => {
    navigation.pop();
  };

  const _onPinchStart = () => {
    _prevPinch = 1;
  };

  const _onPinchEnd = () => {
    _prevPinch = 1;
  };

  const _onPinchProgress = p => {
    let p2 = p - _prevPinch;
    if (p2 > 0 && p2 > ZOOM_F) {
      _prevPinch = p;
      setZoom(Math.min(zoom + ZOOM_F, 1));
    } else if (p2 < 0 && p2 < -ZOOM_F) {
      _prevPinch = p;
      setZoom(Math.max(zoom - ZOOM_F, 0));
    }
  };

  return isLoading ? (
    <CustomLoader />
  ) : (
    <SafeAreaView style={styles.container}>
      <RNCamera
        ref={setCameraRef}
        style={styles.cameraPreview}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        zoom={zoom}
        maxZoom={MAX_ZOOM}>
        <ZoomView
          onPinchEnd={_onPinchEnd}
          onPinchStart={_onPinchStart}
          onPinchProgress={_onPinchProgress}>
          <TouchableOpacity onPress={handleSnap} style={styles.snapButton}>
            <Image
              source={ic_camera_snap}
              resizeMode="cover"
              style={styles.snapButtonIcon}
            />
          </TouchableOpacity>
        </ZoomView>
      </RNCamera>
      <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
        <Image
          source={ic_cross_white}
          resizeMode="cover"
          style={styles.closeButtonIcon}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const mapStateToProps = state => ({
  isStudentUploadImage: teacherSelectors.isStudentUploadImage(state),
});
const mapDispatchToProps = {
  studentUploadImage: teacherOperations.studentUploadImage,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TakeVisitorPhotoScreen);
