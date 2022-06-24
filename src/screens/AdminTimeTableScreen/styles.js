import {View, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  attendanceTeacherStudent: {
    flex: 1,
  },
  tabBarLabel: {
    color: '#fff',
    fontSize: wp(3.5),
    textTransform: 'capitalize',
  },
  tabBarIndicator: {
    backgroundColor: '#fff',
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
