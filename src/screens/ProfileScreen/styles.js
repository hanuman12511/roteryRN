import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  profileInnerContent: {
    flex: 1,
  },
  profileImageBox: {
    flexDirection: 'row',
    height: hp(15),
    padding: wp(2),
    alignItems: 'center',
    marginBottom: hp(2),
  },
  profileImage: {
    width: wp(14),
    height: wp(14),
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: wp(7),
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
  userName: {
    fontSize: wp(3.5),
    color: '#fff',
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
    marginTop: hp(2),
  },
  tabButton: {
    width: wp(50),
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
  tabParentsView: {
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabParentsContent: {
    color: '#231f20',
    marginLeft: wp(2),
    fontSize: wp(3),
  },
  inputStyle: {
    marginTop: hp(-0.5),
  },
  tabParentsIcons: {
    width: wp(5),
    aspectRatio: 1 / 1,
  },
  profileTabContant: {
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
