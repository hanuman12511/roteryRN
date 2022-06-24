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
    textTransform: 'capitalize',
    color: '#00000095',
    fontSize: wp(3),
  },
  noticePosted: {
    color: '#00000095',
    fontSize: wp(3),
    textAlign: 'right',
  },
  suggestionReplyContainer: {
    marginTop: hp(1),
    backgroundColor: '#cccccc95',
    borderRadius: 2,
    padding: wp(1),
  },
  replyMessage: {
    color: '#1481b2',
    fontSize: wp(3),
    textTransform: 'capitalize',
  },
  replyDate: {
    color: '#1ba2de',
    fontSize: wp(3),
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
