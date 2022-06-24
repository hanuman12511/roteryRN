import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  transportScreenSection: {
    // borderLeftWidth: 3,
    // borderLeftColor: '#1ba2de',
    backgroundColor: '#fff',
    // borderRadius: wp(5),
    padding: wp(1.4),
  },
  noticeHeading: {
    color: '#000',
    fontSize: wp(3),
    marginBottom: wp(2),
  },
  noticePosted: {
    color: '#bbb',
    fontSize: wp(2.9),
    textAlign: 'right',
    marginTop: wp(3),
  },
  listContentContainer: {
    padding: wp(2),
  },
  separator: {
    height: wp(2),
    backgroundColor: '#e7e7e7',
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: wp(3.5),
    color: '#000',
  },
  sendMsg: {
    right: wp(2),
    bottom: hp(3),
    position: 'absolute',
    zIndex: 999,
  },
  iconMsg: {
    height: hp(8),
    aspectRatio: 1 / 1,
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
