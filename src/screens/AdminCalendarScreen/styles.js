import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  calendarContainer: {
    flex: 1,
  },
  calendarInfoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f1f2f2',
    paddingVertical: hp(0.5),
  },
  calendarInfoSectionRow: {
    // flexDirection: 'row',
    justifyContent: 'space-around',
  },
  eventTypeItemContainer: {
    width: wp(30),
    height: hp(4),
    borderRadius: wp(3),
    marginVertical: hp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventType: {
    color: '#fff',
    fontSize: wp(3),
  },
  popupContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popupContentContainer: {
    width: wp(90),
    borderRadius: 2,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  leftSubContainer: {
    width: wp(20),
    padding: wp(1.5),
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSubContainerText: {
    fontSize: wp(4),
    fontWeight: '500',
    color: '#fff',
  },
  rightSubContainer: {
    flex: 1,
    padding: wp(0.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContentContainer: {
    flexDirection: 'row',
  },
  rightSubContainerText1: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: '#000',
  },
  rightSubContainerText2: {
    fontSize: wp(3.5),
    color: '#000',
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
