import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(2),
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: wp(3.5),
    textAlign: 'center',
    marginBottom: hp(3),
  },
  errorMessageText: {
    color: 'red',
    fontSize: wp(3),
    marginBottom: hp(1.5),
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    width: '60%',
  },
  otpInputContainerStyle: {
    width: hp(6.5),
    height: hp(6.5),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  otpInputStyle: {
    flex: 1,
    textAlign: 'center',
  },
  resendOTPButton: {
    marginTop: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendOTPButtonText: {
    fontSize: wp(3.5),
    color: '#fff',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loaderContentContainer: {
    position: 'absolute',
    bottom: hp(2),
    left: 0,
    right: 0,
  },
});
