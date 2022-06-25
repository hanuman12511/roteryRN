import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  attendanceTeacherStudent: {
    flex: 1,
  },
  indicator: {
    backgroundColor: 'white',
  },
  tabBar: {
    backgroundColor: '#1ba2de',
  },
  tabBarIndicator: {
    backgroundColor: '#fff',
  },

  tabBarStyle: {
    backgroundColor: '#1ba2de',
  },

  tabBarLabel: {
    color: '#fff',
    fontSize: wp(3.5),
    textTransform: 'capitalize',
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
