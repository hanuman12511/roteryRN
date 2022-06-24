import {
  Text,
  View,
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
  },
  noticeHeading: {
    color: '#000',
    fontSize: wp(3.4),
  },
  suggestionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  suggestionStatus: {
    color: '#bbb',
    fontSize: wp(3),
  },
  noticePosted: {
    color: '#bbb',
    fontSize: wp(3),
    textAlign: 'right',
  },
  suggestionReplyContainer: {
    marginTop: hp(1),
    backgroundColor: '#d8d8d8',
    borderRadius: 2,
    padding: wp(1),
  },
  replyMessage: {
    color: '#1481b2',
    fontSize: wp(2.4),
  },
  replyDate: {
    color: '#1ba2de',
    fontSize: wp(2),
    textAlign: 'right',
    marginTop: hp(1),
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
  addAssignmentBtn: {
    position: 'absolute',
    left: wp(4),
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
});
