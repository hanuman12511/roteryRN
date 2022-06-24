import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addAssignmentSection: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 8,
  },
  addAssignmentButton: {
    borderColor: '#bcbec0',
    borderWidth: 1,
    marginTop: 10,
  },

  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    height: 40,
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  noticeTitleInput: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  noticeDiscription: {
    width: '100%',
  },
  noticeDiscriptionInput: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  calendarIcon: {
    height: 24,
    width: 24,
  },
  attendanceBtn: {
    backgroundColor: '#fff',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendanceBtnText: {
    backgroundColor: '#1ba2de',
    paddingVertical: 12,
    justifyContent: 'center',
    color: '#fff',
    textAlign: 'center',
    width: '96%',
  },
  radioButtons: {
    padding: 5,
    marginTop: 15,
  },
  radioButtosText: {
    alignSelf: 'center',
    marginTop: 10,
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
