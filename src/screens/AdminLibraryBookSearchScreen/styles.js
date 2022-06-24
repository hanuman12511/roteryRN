import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  formContainer: {
    flex: 1,
    padding: wp(2),
  },
  pickerSelectView: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 2,
    padding: wp(2),
    // marginTop: hp(1),
    backgroundColor: '#fff',
    height: hp(5.5),
  },
  pickerSelectViewIcon: {
    width: wp(3),
    height: wp(3),
  },
  inputFieldContainer: {
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    borderRadius: 2,
    marginTop: hp(1),
    backgroundColor: '#fff',
    fontSize: wp(3),
    height: hp(5.5),
    justifyContent: 'center',
    paddingHorizontal: wp(2),
  },
  inputField: {
    flex: 1,
    paddingTop: wp(2),
    paddingBottom: wp(1),
    color: '#000',
    fontSize: wp(3),
  },
  searchButton: {
    height: hp(6),
    backgroundColor: '#1ba2de',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2),
  },
  searchButtonText: {
    color: '#fff',
    fontSize: wp(3),
    textAlign: 'center',
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
});
