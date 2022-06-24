import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {styles} from './styles';
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
import {studentOperations, studentSelectors} from 'idsStore/data/student';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
class FeeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      feesData: null,
      message: null,
      connectionState: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (this.isScreenPushed) {
          this.isScreenPushed = false;
          return;
        }

        this.fetchStudentFeesDetail();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchStudentFeesDetail = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.studentFeeDetail();
      const response = this.props.isStudentFeeDetail;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          const feesData = response.output;
          this.setState({feesData, isLoading: false});
        } else if (response.success === 0) {
          const message = response.message;
          //Alert.alert('', response.message);
          this.setState({message, feesData: null, isLoading: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  onPaidFeePress = () => {
    this.isScreenPushed = true;
    this.props.navigation.push('PaidFeeDetail');
  };

  // not to be shown yet, may be used in future
  // onTotalFeePress = () => {
  // this.isScreenPushed = true;
  // 	this.props.navigation.push('TotalFeeDetail')
  // }

  onDueFeePress = () => {
    this.isScreenPushed = true;
    this.props.navigation.push('DueFeeDetail', {
      dueFees: this.state.feesData.duefee,
    });
  };

  onOutstandingFeePress = () => {
    this.isScreenPushed = true;
    this.props.navigation.push('OutstandingDetail', {
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
        showToast('Unable to Open this url!');
      }
    } catch (error) {
      Alert.alert('', error);
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
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Fees"
              showSchoolLogo
              nav={this.props.navigation}
            />
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
          </>
        )}
        {this.state.connectionState === false ? (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isStudentFeeDetail: studentSelectors.isStudentFeeDetail(state),
});
const mapDispatchToProps = {
  studentFeeDetail: studentOperations.studentFeeDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(FeeScreen);
