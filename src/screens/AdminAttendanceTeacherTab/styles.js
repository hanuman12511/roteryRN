import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  absentReasonContainer: {
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  teacherName: {
    alignItems: 'center',
    color: '#1ba2de',
    fontWeight: 'bold',
    fontSize: wp(3),
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    height: hp(5.5),
    backgroundColor: '#414042',
    //     paddingHorizontal: 6,
    paddingHorizontal: wp(2),
  },
  text: {
    textAlign: 'left',
    color: '#fff',
    fontSize: wp(3),
  },
  text2: {
    textAlign: 'left',
    color: '#414042',
    fontSize: wp(3),
  },
  dataWrapper: {
    width: '100%',
  },
  row: {
    height: hp(5.5),
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    marginHorizontal: wp(2),
    marginVertical: wp(1),
  },
  wrapper: {
    flexDirection: 'row',
    marginTop: -1,
  },
  title: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: '#000',
    fontSize: wp(3.5),
    textAlign: 'center',
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
