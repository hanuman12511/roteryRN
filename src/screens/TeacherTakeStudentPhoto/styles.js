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
  listHeader: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
  },
  listHeaderItem1: {
    width: '25%',
    color: '#1ba2de',
    fontWeight: 'bold',
  },
  listHeaderItem2: {
    width: '25%',
    color: '#1ba2de',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: wp(3),
  },
  listHeaderItem3: {
    width: '25%',
    color: '#1ba2de',
    fontWeight: 'bold',
  },
  attendanceBtn: {
    height: 40,
    margin: 8,
    borderRadius: 2,
    backgroundColor: '#1ba2de',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendanceBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  separator: {
    height: 8,
  },
  contentContainer: {
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  progressLoader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
