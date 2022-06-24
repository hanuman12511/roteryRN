import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    margin: wp(2),
  },
  inputFieldContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 2,
    marginTop: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  inputIcon: {
    width: wp(4),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
  textAreaIcon: {
    width: wp(4),
    aspectRatio: 1 / 1,
    margin: wp(2),
  },

  inputField: {
    flex: 1,
    color: '#000',
    fontSize: wp(3),
    height: 36,
  },
  textareaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    marginTop: hp(2),
    flexDirection: 'row',
  },
  textareaInput: {
    flex: 1,
    height: hp(16),
    padding: wp(1),
    color: '#000',
    fontSize: wp(3),
    textAlignVertical: 'top',
  },
  submitButton: {
    height: hp(6),
    backgroundColor: '#1ba2de',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(4),
  },
  submitButtonText: {
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
