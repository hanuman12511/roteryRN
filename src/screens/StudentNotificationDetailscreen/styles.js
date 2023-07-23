import {Text, View, FlatList, StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  transportScreenSection: {
    padding: 10,
    flexDirection: 'row',
  },
  profileImagestyle: {
    height: hp(6),
    aspectRatio: 1 / 1,
  },
  profileImage: {
    margin: 10,
    width: wp(5),
    right: 0,
    aspectRatio: 1 / 1,
  },
  shareIcon: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  transportImg: {flex: 1, justifyContent: 'center'},
  dateSty: {
    marginBottom: wp(4),
  },
  dateStyle: {
    margin: 10,
  },
  transportScreenSection2: {
    flex: 1,
    margin: wp(2),
    // borderLeftWidth: 3,
    // borderLeftColor: '#808285',
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: wp(2.5),
  },
  noticeHeading: {
    color: '#000',
    fontSize: wp(3.5),
  },
  noticePosted: {
    color: '#bbb',
    fontSize: wp(3.2),
    textAlign: 'left',
    marginTop: wp(4),
  },
  listContentContainer: {
    padding: wp(2),
  },
  separator: {
    height: wp(2),
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
