import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e4e4e4',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(2),
  },
  messageText: {
    color: '#000',
    fontSize: wp(3),
    textAlign: 'center',
  },
  feeInnerContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: wp(2),
    paddingBottom: wp(2),
  },
  totalPaidFeeDisplay: {
    height: hp(25),
    backgroundColor: '#1ba2de',
    justifyContent: 'center',
    alignItems: 'center',
    margin: wp(2),
    marginBottom: wp(0),
  },
  totalPaidFeeIcon: {
    width: wp(8),
    aspectRatio: 1 / 1,
  },
  totalPaidFeeAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalPaidFeeValue: {
    color: '#fff',
    fontSize: wp(7),
    fontWeight: 'bold',
  },
  paidFeeTitle: {
    color: '#fff',
    fontSize: wp(3.5),
    paddingTop: hp(1),
  },
  dateSheetContainer: {
    backgroundColor: '#fff',
    borderLeftColor: '#1ba2de',
    borderLeftWidth: 3,
    borderRadius: 2,
    marginTop: wp(2),
    paddingVertical: wp(0.5),
  },
  noticeHeading: {
    color: '#1ba2de',
    fontSize: wp(3),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  noticeHeading2: {
    color: 'red',
    fontSize: wp(3),
    fontWeight: 'bold',
    marginLeft: wp(2),
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
