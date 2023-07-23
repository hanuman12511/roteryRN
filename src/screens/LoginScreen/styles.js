import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: wp(25),
    aspectRatio: 1 / 1,
    alignSelf: 'center',
    marginBottom: hp(5),
  },
  loginTopBar: {
    height: hp(6),
    paddingHorizontal: wp(2),
    justifyContent: 'center',
    backgroundColor: '#1ba2de',
  },
  loginTopBarContent: {
    color: '#fff',
    fontSize: wp(3.5),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: wp(7),
    textAlign: 'center',
    marginBottom: hp(3),
  },
  networkIssue: {
    height: hp(50),
    aspectRatio: 1 / 1,
  },
  offlineStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginInputView: {
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginHorizontal: hp(2),
    marginBottom: hp(3),
  },
  loginInput: {
    flex: 1,
    height: hp(6),
    marginLeft: wp(2),
    fontSize: wp(3.5),
    color: '#fff',
  },
  radioButtons: {
    alignSelf: 'center',
  },
  radioButtonLabel: {
    fontSize: wp(3.5),
    color: '#fff',
    marginLeft: wp(0.5),
    marginRight: wp(4),
  },
  loginButton: {
    height: hp(6),
    marginTop: hp(6),
    paddingHorizontal: wp(7),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1ba2de',
  },
  loginButtonText: {
    fontSize: wp(3.5),
    fontWeight: '600',
    color: '#fff',
  },
  inputFieldIcon: {
    width: wp(5),
    aspectRatio: 1 / 1,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContentContainer: {
    position: 'absolute',
    bottom: hp(3),
    left: 0,
    right: 0,
  },
  forgetPasswordStyle: {
    height: hp(4),
    marginTop: hp(1),
    marginRight: hp(2),
    // paddingHorizontal: wp(7),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'auto',
  },
  forgetPasswordTxt: {
    color: '#ffffff',
    fontSize: wp(3.5),
    textAlign: 'center',
  },
});
