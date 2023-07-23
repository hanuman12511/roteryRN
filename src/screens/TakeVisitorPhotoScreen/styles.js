import { Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  cameraPreview: {
    height: Dimensions.get('window').height,
    width: "100%",
  },
  closeButton: {
    position: 'absolute',
    top: wp(4),
    right: wp(4),
  },
  closeButtonIcon: {
    height: wp(6),
    aspectRatio: 1 / 1,
  },
  snapButton: {
    position: 'absolute',
    bottom: hp(2.5),
    alignSelf: 'center',
  },
  snapButtonIcon: {
    height: wp(14),
    aspectRatio: 1 / 1,
  },
});
