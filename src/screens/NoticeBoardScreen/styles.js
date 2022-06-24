import {View, Text, StyleSheet, FlatList} from 'react-native';
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
    backgroundColor: '#fff',
    borderLeftColor: '#1ba2de',
    borderLeftWidth: 3,
    borderRadius: 2,
  },
  noticeHeading: {
    paddingTop: wp(1),
    paddingHorizontal: wp(2),
    color: '#1ba2de',
    fontWeight: 'bold',
    fontSize: wp(3.5),
  },
  noticePosted: {
    fontSize: wp(3),
    textAlign: 'right',
    paddingBottom: wp(1),
    paddingHorizontal: wp(2),
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
