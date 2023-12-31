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
    // paddingTop: wp(1),
  },
  searchContainer: {
    flexDirection: 'row',
    padding: wp(1.5),
    paddingBottom: wp(3),
    backgroundColor: '#02abe3',
  },
  searchTile: {
    flex: 1,
    paddingHorizontal: wp(1.5),
  },
  searchBar: {
    backgroundColor: '#fff',
    borderWidth: 0,
    height: hp(5.5),
    marginTop: wp(2),
    paddingHorizontal: wp(3),
    borderRadius: wp(1),
  },
  title: {
    color: '#fff',
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  bannerContainer: {
    flexDirection: 'row',
    padding: wp(3),
    // paddingBottom: 0,
  },
  memberImage: {
    width: '100%',
    aspectRatio: 3.33 / 1,
    borderRadius: wp(1),
  },

  calenderPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: wp(3),
    backgroundColor: '#f2f1f1',
    paddingVertical: wp(2),
    paddingHorizontal: wp(3),
  },
  calenderText: {
    fontSize: wp(3.5),
    color: '#333',
    flex: 1,
  },
  calenderIcon: {
    width: wp(5),
    aspectRatio: 1 / 1,
  },
});
