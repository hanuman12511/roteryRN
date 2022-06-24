import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
    width: '100%',
  },
  absentReasonContainer: {
    flex: 1,
  },
  teacherName: {
    backgroundColor: '#fff',
    alignItems: 'center',
    color: '#1ba2de',
    paddingVertical: 15,
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },
  reasonListHeading: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 5,
    color: '#fff',
  },
  sNo: {
    flex: 1,
  },
  abDate: {
    flex: 2,
  },
  abReason: {
    flex: 3,
  },
  reasonListContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  whiteColor: {
    color: '#fff',
  },
  reasonListRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingHorizontal: 5,
  },
});
