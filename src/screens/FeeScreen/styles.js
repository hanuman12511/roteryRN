import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  messageText: {
    fontSize: wp(3),
    textAlign: 'center',
  },
  feeInnerContent: {
    flex: 1,
  },
  totalPaidFeeDisplay: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalPaidFeeIcon: {
    width: wp(8),
    aspectRatio: 1 / 1,
  },
  feeBoxContainer: {
    alignItems: 'center',
  },
  totalPaidFeeAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalPaidFeeValue: {
    fontSize: wp(7),
    fontWeight: 'bold',
  },
  paidFeeTitle: {
    fontSize: wp(3.5),
    paddingTop: hp(1),
  },
  totalFeeDisplay: {
    flex: 1,
    backgroundColor: '#d2434e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalFeeIcon: {
    width: wp(8),
    aspectRatio: 1 / 1,
  },
  totalFeeAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalFeeValue: {
    fontSize: wp(7),
    fontWeight: 'bold',
    color: '#fff',
  },
  totalFeeTitle: {
    fontSize: wp(4),
    paddingTop: hp(1),
    color: '#fff',
  },
  payOnlineContainer: {
    marginTop: hp(1),
    padding: wp(1.4),
    backgroundColor: '#1b9945',
    borderRadius: 6,
  },
  payOnlineText: {
    color: '#fff',
    fontSize: wp(3),
  },
  pendingFee: {
    flex: 1,
    flexDirection: 'row',
  },
  totalDueFeeDisplay: {
    width: wp(50),
    backgroundColor: '#b59339',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalOutstandingFeeDisplay: {
    width: wp(50),
    backgroundColor: '#0095ae',
    alignItems: 'center',
    justifyContent: 'center',
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
