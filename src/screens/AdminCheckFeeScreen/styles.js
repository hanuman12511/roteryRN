import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkFeebox: {
    flex: 1,
    paddingHorizontal: wp(2),
    paddingVertical: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkFeeBtn: {
    flex: 1,
    backgroundColor: '#1ba2de',
    height: hp(5.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkFeeBtnText: {
    color: '#fff',
    fontSize: wp(3),
  },
  checkFeeInput: {
    flex: 2,
    height: hp(5.5),
    borderColor: '#d1d3d4',
    borderWidth: 1,
    fontSize: wp(3),
    paddingLeft: wp(2),
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
