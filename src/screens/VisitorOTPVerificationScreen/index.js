import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import OtpInputs from 'react-native-otp-inputs';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import GuardScreenHeader from 'components/GuardScreenHeader';
import showToast from 'components/CustomToast';

// Images
import login_background_bg from 'assets/images/login_background_bg.png';

// API
import {BASE_URL, makeRequest} from 'api/ApiInfo';
import {getData, getActiveSchool} from 'api/UserPreference';
export default class VisitorOTPVerificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      errorMessage: null,
      resendOtpDelay: 0,
    };

    // fetching navigation params
    this.info = this.props.navigation.getParam('info', null);
  }

  componentDidMount() {
    // displaying otp sent toast
    if (this.info) {
      const {message} = this.info;
      showToast(message);
    }
  }

  handleOTPChange = async enteredOTP => {
    try {
      if (enteredOTP.length === 4 && this.info) {
        // starting loader
        this.setState({isLoading: true});

        const {visitorId} = this.info;
        const activeSchool = await getActiveSchool();
        if (!activeSchool) {
          return;
        }
        const {idsprimeID} = activeSchool;
        // preparing params
        const params = {
          visitorId,
          otp: enteredOTP,
          idsprimeID,
        };

        // calling api
        const response = await makeRequest(
          BASE_URL + 'verifyVisitorOtp',
          params,
        );

        // processing response
        if (response) {
          // stopping loader
          this.setState({isLoading: false});

          const {success, message} = response;

          if (success === 1) {
            const {refreshVisitorsCallback} = this.info;

            if (refreshVisitorsCallback) {
              // navigating to home
              this.props.navigation.popToTop();

              // refreshing list
              await refreshVisitorsCallback(message);
            }
          } else if (success === 0) {
            // showing error message
            this.setState({errorMessage: message});

            // resetting otp inputs
            this.otpRef.current.reset();
            this.otpRef.current.focus();
          }
        } else {
          this.setState({isLoading: false});
          this.setState({errorMessage: response.message});

          // resetting otp inputs
          this.otpRef.current.reset();
          this.otpRef.current.focus();
        }
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handleResendOTP = async () => {
    try {
      if (this.info) {
        // starting loader
        this.setState({isLoading: true});

        const {visitorId} = this.info;

        // preparing params
        const params = {
          visitorId,
        };

        // calling api
        const response = await makeRequest(
          BASE_URL + 'resendVisitorOtp',
          params,
        );

        // processing response
        if (response) {
          // stopping loader
          this.setState({isLoading: false});

          const {success, message} = response;

          if (success === 1) {
            showToast(message);

            // creating 1 minute delay for resend OTP
            const handleResendOtpDelay = () => {
              if (this.state.resendOtpDelay > 0) {
                this.setState(prevState => ({
                  resendOtpDelay: prevState.resendOtpDelay - 1,
                }));
              } else {
                clearInterval(this.resendOtpIntervalId);
              }
            };

            this.setState({resendOtpDelay: 60}, () => {
              this.resendOtpIntervalId = setInterval(
                handleResendOtpDelay,
                1000,
              );
            });
          } else if (success === 0) {
            showToast(message);
          }
        } else {
          this.setState({isLoading: false});
          showToast(response.message);
        }
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  otpRef = React.createRef();

  render() {
    const {phone = 'N/A'} = this.info;

    return (
      <SafeAreaView style={styles.container}>
        <GuardScreenHeader
          title="Visitor OTP Verification"
          nav={this.props.navigation}
          navAction="back"
        />

        <ImageBackground
          style={styles.contentContainer}
          source={login_background_bg}
          resizeMode="cover">
          <Text style={styles.heading}>Enter OTP sent on {phone}</Text>

          <OtpInputs
            ref={this.otpRef}
            handleChange={this.handleOTPChange}
            numberOfInputs={4}
            keyboardType="numeric"
            clearTextOnFocus={true}
            inputStyles={styles.otpInputStyle}
            inputContainerStyles={styles.otpInputContainerStyle}
            style={styles.otpContainer}
          />

          {this.state.errorMessage && (
            <View style={styles.resendOTPButton}>
              <Text style={styles.errorMessageText}>
                {this.state.errorMessage}
              </Text>

              {this.state.resendOtpDelay > 0 ? (
                <Text style={styles.resendOTPButtonText}>
                  {this.state.resendOtpDelay}
                </Text>
              ) : (
                <Text
                  style={styles.resendOTPButtonText}
                  onPress={this.handleResendOTP}>
                  Resend OTP
                </Text>
              )}
            </View>
          )}
        </ImageBackground>
        {this.state.isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </SafeAreaView>
    );
  }
}
