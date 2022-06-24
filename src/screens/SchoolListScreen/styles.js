import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: hp(6),
    padding: wp(2),
    justifyContent: 'center',
    backgroundColor: '#1ba2de',
  },
  headerContent: {
    color: '#fff',
    fontSize: wp(4),
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  separator: {
    height: wp(2),
  },
  listContentContainer: {
    padding: wp(2),
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
export default styles;
