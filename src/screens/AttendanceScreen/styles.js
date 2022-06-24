import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  monthlyAttendance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f1f1f1',
    paddingHorizontal: wp(1),
    paddingVertical: wp(2),
    alignItems: 'center',
  },
  totalDays: {
    backgroundColor: '#0095ae',
    borderRadius: 2,
    color: 'white',
    textAlign: 'center',
    paddingVertical: hp(0.5),
    marginHorizontal: wp(1),
    flex: 1,
  },
  holiday: {
    backgroundColor: '#e28e00',
    paddingVertical: hp(0.5),
    borderRadius: 2,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: wp(1),
    flex: 1,
    fontSize: wp(3),
  },
  present: {
    backgroundColor: '#1ba2de',
    paddingVertical: hp(0.5),
    borderRadius: 2,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: wp(1),
    flex: 1,
    fontSize: wp(3),
  },
  absent: {
    backgroundColor: '#d2434e',
    paddingVertical: wp(0.5),
    borderRadius: 2,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: wp(1),
    flex: 1,
    fontSize: wp(3),
  },
  yearlyAttendance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#414042',
    paddingVertical: 2,
  },
  yearlyAttendanceContent: {
    color: '#fff',
    fontSize: wp(3),
    textAlign: 'center',
  },
  yearlyAttendanceHeading: {
    color: '#fff',
    fontSize: wp(3),
    textAlign: 'center',
    backgroundColor: '#414042',
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
