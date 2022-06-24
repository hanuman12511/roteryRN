import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const shadowEffect = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  mainContentContainer: {
    flex: 1,
  },
  separator: {
    height: wp(2),
  },
  listContentContainer: {
    padding: wp(2),
  },
  addAssignmentBtn: {
    position: 'absolute',
    left: wp(4),
    bottom: wp(4),
    width: hp(10),
    height: hp(10),
    backgroundColor: '#f99b1c',
    borderRadius: hp(5),
    borderWidth: 3,
    borderColor: 'rgba(250, 155, 69, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAssignmentBtnIcon: {
    color: '#fff',
    fontSize: hp(6),
  },
  assignModal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignModalContentContainer: {
    width: '88%',
    borderRadius: 2,
    paddingHorizontal: wp(2),
    backgroundColor: '#fff',
    ...shadowEffect,
  },
  assignModalItem: {
    marginTop: wp(2),
    borderWidth: 1,
    borderColor: '#bcbec0',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(5),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: hp(1),
    paddingHorizontal: wp(1.5),
  },
  calendarIcon: {
    width: wp(6),
    aspectRatio: 1 / 1,
  },
  submitButton: {
    height: hp(6),
    marginVertical: hp(1),
    borderRadius: 2,
    backgroundColor: '#1b9945',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: wp(3.5),
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: wp(4),
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
