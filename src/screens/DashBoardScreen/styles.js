import {View, StyleSheet, AppState, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSliderContainer: {
    height: wp(50),
    width: wp(100),
  },
  tilesContainer: {
    flex: 1,
    padding: wp(0.5),
    paddingBottom: 0,
    backgroundColor: '#fff',
  },
  tilesRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
