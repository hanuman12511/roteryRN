import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  transportScreenSection: {
    borderLeftWidth: 3,
    borderLeftColor: '#1ba2de',
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: wp(1),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  visitorPhoto: {
    height: wp(30),
    aspectRatio: 1 / 1,
    alignSelf: 'center',
    margin: wp(1),
    marginRight: wp(3),
    borderRadius: 5,
  },
  noticePosted: {
    color: '#bbb',
    fontSize: wp(3),
    textAlign: 'right',
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
    fontSize: wp(3),
    color: '#000',
  },
  addAssignmentBtn: {
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
  addAssignmentBtnIcon: {
    color: '#fff',
    fontSize: hp(4),
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.2),
  },
  detailPart: {
    flex: 1,
  },
  listIcon: {
    width: wp(3.5),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
  listText: {
    fontSize: wp(3),
    flex: 1,
    color: '#333',
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
