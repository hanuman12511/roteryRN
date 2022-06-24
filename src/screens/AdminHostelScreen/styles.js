import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  NoticeBoardSection: {flex: 1},
  contentContainer: {
    paddingBottom: 8,
    marginHorizontal: 8,
    marginTop: 8,
  },
  hostelRow: {
    borderLeftColor: '#808285',
    borderLeftWidth: 3,
  },
});
