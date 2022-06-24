import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  distance: {flex: 1, flexDirection: 'row'},
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  sepratorsContainer: {height: wp(2)},
  profileInnerContent: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },

  searchContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: wp(1),
    height: hp(6),
    marginBottom: wp(2),
    fontWeight: 'bold',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputData: {
    flex: 1,
  },

  searchIcon: {
    width: hp(2.5),
    aspectRatio: 1 / 1,
  },

  profileInnerContainer: {
    backgroundColor: '#fff',
    margin: wp(1),
    height: hp(6),
    marginBottom: wp(2),
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  profileImageBox: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    height: hp(18),
    padding: wp(2),
    alignItems: 'center',
    //     marginBottom: hp(2),
  },
  profileImage: {
    width: wp(25),
    aspectRatio: 1 / 1.25,
    borderWidth: 1,
    borderColor: '#fff',
    //     borderRadius: wp(7),
  },
  profileImage2: {
    width: wp(6),
    height: wp(6),
    left: 0,
    bottom: 0,
    right: 0,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: wp(10),
  },
  profileImage3: {
    width: wp(12),
    aspectRatio: 1 / 1,
    left: 0,
    bottom: 0,
    right: 0,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  profileImage4: {
    height: hp(2.8),
    aspectRatio: 1 / 1,
  },
  userName: {
    fontSize: wp(6),
    color: '#000',
    marginLeft: wp(4),
  },
  userInfo: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: hp(1),
  },
  userInfoRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.25),
  },
  userInfoLeft: {
    width: wp(40),
    fontWeight: 'bold',
    fontSize: wp(3),
  },
  userInfoCenter: {
    width: wp(10),
    fontSize: wp(3),
  },
  userInfoRight: {
    width: wp(50),
    fontSize: wp(3),
  },
  tabBar: {
    flexDirection: 'row',
    //     marginTop: hp(1),
  },
  tabButton: {
    width: wp(25),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#018bc8',
  },
  activeTabButton: {
    backgroundColor: '#1ba2de',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  tabIcons: {
    height: hp(3.5),
    aspectRatio: 1 / 1,
  },
  tabParentsView1: {
    backgroundColor: '#ffffff',
    padding: wp(3),
    marginBottom: hp(2),
  },
  tabParentsView: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
  },
  tabParentsContent: {
    color: '#231f20',
    marginLeft: wp(2),
    fontSize: wp(3),
  },
  tabParentsContent2: {
    color: '#e7e7e7',
    marginLeft: wp(2),
    fontSize: wp(3.2),
  },
  tabParentsContent3: {
    color: '#231f20',
    marginLeft: wp(2),
    fontSize: wp(4),
  },
  inputStyle: {
    marginTop: hp(-0.5),
  },
  tabParentsIcons: {
    width: wp(6),
    aspectRatio: 1 / 1,
  },
  profileTabContant: {
    flex: 1,
    marginTop: hp(1),
    marginHorizontal: wp(2),
  },
  emailInput: {
    flex: 1,
    marginRight: wp(2),
  },
  editEmailButton: {
    padding: wp(1),
  },
  editEmailIcon: {
    width: wp(5),
    height: wp(5),
  },
  updateEmailButton: {
    height: hp(6),
    marginTop: hp(5),
    marginBottom: hp(8),
    paddingHorizontal: wp(4),
    backgroundColor: '#1ba2de',
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateEmailButtonTitle: {
    color: '#fff',
    fontSize: wp(3),
  },
  mainContainer: {
    flex: 1,
  },
  profileData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: hp(25),
    padding: wp(2),
  },
  secondContainer: {margin: wp(2), alignItems: 'flex-start'},
  activestyleProfile: {margin: wp(2), alignItems: 'flex-start', flex: 1},

  midNameProfile: {fontWeight: '400', fontSize: wp(3)},
  profileBasicData: {fontWeight: '400', fontSize: wp(3)},
  // onPressImg: {
  //   right: 0,
  //   width: wp(6),
  //   aspectRatio: 1 / 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },

  listContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: wp(3),
    alignItems: 'flex-start',
    borderRadius: 5,
  },
  imageHolder: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc8',
    marginRight: wp(2),
    borderRadius: 5,
  },
  teacherImage: {
    height: wp(22),
    aspectRatio: 1 / 1,
  },
  teacherData: {
    flex: 1,
  },
  profileName: {
    fontWeight: '700',
    fontSize: wp(4),
    marginBottom: wp(0.5),
  },

  dob: {
    fontSize: wp(2.5),
    fontWeight: '700',
    color: '#982257',
  },

  onPressImg: {
    alignSelf: 'flex-end',
    marginTop: wp(10),
  },
  showMoreIcon: {
    width: wp(6.5),
    aspectRatio: 1 / 1,
    marginLeft: wp(1.7),
  },
  buttonStyle: {
    padding: wp(1.5),
    borderRadius: wp(6),
    marginRight: wp(1),
    // backgroundColor: 'rgba(131,131,131,0.2)',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
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
