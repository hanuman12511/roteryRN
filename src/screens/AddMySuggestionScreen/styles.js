import React from 'react';
import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    margin: wp(2),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(6),
    borderWidth: 1,
    borderColor: '#ccc',
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
    marginRight: wp(2),
    marginTop: hp(2),
  },
  pickerInput: {
    flex: 1,
  },
  pickerSelectView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: wp(86),
  },
  pickerSelectViewIcon: {
    width: wp(4),
    height: wp(4),
  },
  textareaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    marginTop: hp(2),
    flexDirection: 'row',
    padding: wp(2),
    alignItems: 'flex-start',
  },
  textareaInput: {
    height: hp(24),
    fontSize: wp(4),
    textAlignVertical: 'top',
    width: wp(86),
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
    fontSize: wp(4),
    textAlign: 'center',
  },
  errMsg: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  erroMsg: {
    justifyContent: 'center',
    alignItems: 'center',
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
export default styles;
