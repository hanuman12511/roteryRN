import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efeff1',
  },
  contentContainer: {
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 2,
    margin: 6,
    marginBottom: hp(2),
    paddingHorizontal: wp(2),
  },
  searchInputField: {
    flex: 1,
    color: '#000',
    fontSize: wp(3),
    padding: wp(1.2),
  },
  searchButton: {},
  searchIcon: {
    height: hp(3),
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
