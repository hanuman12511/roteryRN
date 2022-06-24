import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from 'screens/TakeVisitorPhotoScreen/styles';
import CustomLoader from 'components/CustomLoader';

import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';

// Icons
import ic_cross_white from 'assets/icons/ic_cross_white.png';
import ic_camera_snap from 'assets/icons/ic_camera_snap.png';

const UpdateTeacherPhoto = props => {
  const [isLoading, setLoading] = useState(false);
  const {navigation} = props;
  let cameraRef = null;
  // const getPhotoCallback = navigation.getParam('getPhotoCallback', null);

  const setCameraRef = ref => {
    cameraRef = ref;
  };

  const handleSnap = async () => {
    try {
      if (cameraRef) {
        const options = {quality: 0.5};
        const data = await cameraRef.takePictureAsync(options);

        setLoading(true);
        // console.log('====================================');
        // console.log(data, item);
        // console.log('====================================');
        const photo = data;

        await props.updateProfilePhoto(photo);
        const response = props.isUpdateProfilePhoto;
        if (response) {
          // console.log('upload photo', response);
          setLoading(false);
          navigation.goBack();
          // navigation.navigate('TeacherTakeStudentPhoto', {data});
        }
        // getPhotoCallback(data);
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
const mapStateToProps = state => ({
  isUpdateProfilePhoto: teacherSelectors.isUpdateProfilePhoto(state),
});
const mapDispatchToProps = {
  updateProfilePhoto: teacherOperations.updateProfilePhoto,
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateTeacherPhoto);
