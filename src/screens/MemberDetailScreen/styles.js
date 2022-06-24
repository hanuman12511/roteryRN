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
    paddingTop: wp(1),
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
  tileContainer: {
    backgroundColor: '#fff',
    padding: wp(3),
    // elevation: 10,
    // shadowColor: '#0008',
    // shadowRadius: 4.65,
    borderRadius: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc8',
    borderBottomWidth: 1,
  },
  memberImage: {
    width: wp(17),
    aspectRatio: 1 / 1,
    borderRadius: wp(1),
  },
  memberDetail: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  mName: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#333',
  },
  name: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: '#333',
    flex: 1,
  },
  designation: {
    fontSize: wp(3),
    fontWeight: '400',
    color: '#333',
  },
  number: {
    fontSize: wp(3.5),
    color: '#333',
  },
  occupation: {
    fontSize: wp(3.5),
    color: '#333',
  },
  iconData: {
    flexDirection: 'row',
    paddingVertical: wp(1),
  },
  icons: {
    width: wp(5),
    aspectRatio: 1 / 1,
    borderRadius: wp(1),
    marginRight: wp(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: wp(2),
    marginBottom: wp(2),
    borderBottomColor: '#ccc8',
    borderBottomWidth: 1,
  },
  memberPic: {
    width: wp(5),
    aspectRatio: 1 / 1,
    borderRadius: wp(1),
    marginRight: wp(3),
  },
  nameContainer: {
    padding: wp(3),
    // backgroundColor: '#f2f1f1',
  },
  memberTitle: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: wp(3),
    paddingBottom: wp(2),
  },
  description: {
    textAlign: 'justify',
    paddingHorizontal: wp(3),
  },
});
