import {View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1ba2de',
    width: '100%',
  },
  transportScreenSection: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  transportImg: {
    height: 170,
    width: '100%',
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
  OutstandingFeeDetailBox: {
    margin: wp(2),
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
