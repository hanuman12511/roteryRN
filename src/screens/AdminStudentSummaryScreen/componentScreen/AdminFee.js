import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// Icons
import ic_fee_black from 'assets/icons/ic_fee_black.png';
import ic_fee from 'assets/icons/ic_fee.png';

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class FeeScreen extends Component {
  constructor(props) {
    super(props);
    this.stId = props.stId;
    this.state = {
      isLoading: true,
      feesData: null,
      message: null,
    };
  }

  componentDidMount() {
    console.log('data fetch2', this.props.nav);
    this.fetchStudentFeesDetail();
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.nav.addListener('didFocus', () => {
      console.log('data fetch2');
      this.fetchStudentFeesDetail();
    });
  }

  componentWillUnmount() {
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchStudentFeesDetail = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});
      console.log('data fetch');
      // calling api
      await this.props.getStudentFeesData(this.stId);
      const response = this.props.isGetStudentFeesData;

      if (response.success === 1) {
        const feesData = response.output;
        this.setState({feesData, isLoading: false});
      } else if (response.success === 0) {
        const message = response.message;
        this.setState({message, feesData: null, isLoading: false});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  onPaidFeePress = () => {
    this.isScreenPushed = true;
    const id = this.stId;
    this.props.nav.push('StPaidFeeDetail', {id});
  };

  // not to be shown yet, may be used in future
  onTotalFeePress = () => {
    this.isScreenPushed = true;
    this.props.nav.push('StTotalFeeDetail');
  };

  onDueFeePress = () => {
    this.isScreenPushed = true;
    this.props.nav.navigate('StDueFeeDetail', {
      dueFees: this.state.feesData.duefee,
    });
  };

  onOutstandingFeePress = () => {
    this.isScreenPushed = true;
    this.props.nav.navigate('StOutstandingDetail', {
      outstandingFees: this.state.feesData.outstanding,
    });
  };

  handlePayOnline = async () => {
    try {
      const {feesData} = this.state;
      const {overall} = feesData;
      const {payOnlineUrl} = overall;

      const supported = await Linking.canOpenURL(payOnlineUrl);

      if (supported) {
        Linking.openURL(payOnlineUrl);
      } else {
        showToast('Unable to handle this url!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }

    const {message, feesData} = this.state;
    if (feesData !== null) {
      const {overall} = feesData;
      var {payOnlineUrl, paidfees, totalfees, due_amount, outstanding_amount} =
        overall;
    }
    return (
      <SafeAreaView style={styles.container}>
        {feesData === null ? (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : (
          <View style={styles.feeInnerContent}>
            <TouchableHighlight
              style={styles.totalPaidFeeDisplay}
              onPress={this.onPaidFeePress}
              underlayColor={'#414042'}>
              <View style={styles.feeBoxContainer}>
                <View style={styles.totalPaidFeeAmount}>
                  <Image
                    style={styles.totalPaidFeeIcon}
                    source={ic_fee_black}
                    resizeMode="cover"
                  />
                  <Text style={styles.totalPaidFeeValue}>{paidfees}/-</Text>
                </View>

                <Text style={styles.paidFeeTitle}>Paid Fee</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.totalFeeDisplay}
              onPress={null} //this.onTotalFeePress}
              underlayColor={'#414042'}>
              <View style={styles.feeBoxContainer}>
                <View style={styles.totalFeeAmount}>
                  <Image
                    style={styles.totalFeeIcon}
                    source={ic_fee}
                    resizeMode="cover"
                  />
                  <Text style={styles.totalFeeValue}>{totalfees}/-</Text>
                </View>

                <Text style={styles.totalFeeTitle}>Total Fee</Text>
              </View>
            </TouchableHighlight>

            <View style={styles.pendingFee}>
              <TouchableHighlight
                style={styles.totalDueFeeDisplay}
                onPress={this.onDueFeePress}
                underlayColor={'#414042'}>
                <View style={styles.feeBoxContainer}>
                  <View style={styles.totalFeeAmount}>
                    <Image
                      style={styles.totalFeeIcon}
                      source={ic_fee}
                      resizeMode="cover"
                    />
                    <Text style={styles.totalFeeValue}>{due_amount}/-</Text>
                  </View>

                  <Text style={styles.totalFeeTitle}>Due Fee</Text>

                  {payOnlineUrl && (
                    <View style={styles.payOnlineContainer}>
                      <Text
                        style={styles.payOnlineText}
                        onPress={this.handlePayOnline}>
                        Pay Online
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.totalOutstandingFeeDisplay}
                onPress={this.onOutstandingFeePress}
                underlayColor={'#414042'}>
                <View style={styles.feeBoxContainer}>
                  <View style={styles.totalFeeAmount}>
                    <Image
                      style={styles.totalFeeIcon}
                      source={ic_fee}
                      resizeMode="cover"
                    />
                    <Text style={styles.totalFeeValue}>
                      {outstanding_amount}/-
                    </Text>
                  </View>

                  <Text style={styles.totalFeeTitle}>Outstanding Fee</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isGetStudentFeesData: adminSelectors.isGetStudentFeesData(state),
});
const mapDispatchToProps = {
  getStudentFeesData: adminOperations.getStudentFeesData,
};
export default connect(mapStateToProps, mapDispatchToProps)(FeeScreen);
const styles = StyleSheet.create({
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
});
