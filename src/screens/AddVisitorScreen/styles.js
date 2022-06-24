import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
  visitorPhotoContainer: {
    width: wp(28),
    aspectRatio: 1 / 1,
    borderRadius: wp(14),
    alignSelf: 'center',
    marginTop: hp(2),
  },
  visitorPhoto: {
    height: wp(28),
    aspectRatio: 1 / 1,
    borderRadius: wp(14),
  },
  visitorPhotoContainerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: wp(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  visitorPhotoCamera: {
    height: wp(5),
    aspectRatio: 1 / 1,
  },
  inputFieldContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: hp(2),
  },
  inputField: {
    flex: 1,
    paddingTop: wp(2),
    paddingBottom: wp(1),
    color: '#000',
    fontSize: wp(3),
    height: hp(5),
  },
  textareaContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    marginTop: hp(2),
  },
  textareaInput: {
    height: hp(16),
    padding: wp(1),
    color: '#000',
    fontSize: wp(3),
    textAlignVertical: 'top',
  },
  submitButton: {
    height: hp(5.5),
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
export default styles;
