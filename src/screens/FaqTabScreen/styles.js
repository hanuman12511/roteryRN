import {Image, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  tabBarIndicatorStyle: {
    backgroundColor: 'white',
  },

  floatingSearchButton: {
    position: 'absolute',
    right: wp(4),
    bottom: wp(4),
    width: hp(8),
    height: hp(8),
    backgroundColor: '#1ba2de',
    borderRadius: hp(4),
    borderWidth: 3,
    borderColor: '#1ba2de80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingSearchIcon: {
    height: hp(3),
    aspectRatio: 1 / 1,
  },

  tabBarIndicator: {
    backgroundColor: '#0286c0',
    height: '100%',
  },

  tabBarStyle: {
    backgroundColor: '#1ba2de',
  },

  tabBarLabel: {
    color: '#fff',
    fontSize: wp(3.5),
    fontWeight: '700',
    textTransform: 'capitalize',
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
