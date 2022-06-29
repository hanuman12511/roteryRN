import {View, StyleSheet, AppState, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
  },
  separator: {
    height: wp(3),
  },
  listContentContainer: {
    padding: wp(3),
  },
});
