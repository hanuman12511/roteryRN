import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import OtpInputs from 'react-native-otp-inputs';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import showToast from 'components/CustomToast';

// Icons
import ic_back from 'assets/icons/ic_back.png';

// Images
import login_background_bg from 'assets/images/login_background_bg.png';

// User Preference
import {storeData, setActiveSchool} from 'api/UserPreference';

//data
import {connect} from 'react-redux';
import {sessionOperations, sessionSelectors} from 'idsStore/data/session';

// Firebase API
// import {checkPermission} from 'firebase_api/FirebaseAPI';
import notification from 'firebase_api';

// Utility
import {decryptData} from 'api/EncryptionUtility';

class OTPVerificationScreen extends Component {
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
  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    console.log(notif.title, notif.message);
  }
  handleOTPChange = async enteredOTP => {
    try {
      if (enteredOTP.length === 4 && this.info) {
        // starting loader
        this.setState({isLoading: true});

        const {mobile, loginType} = this.info;

        // preparing params
        const params = {
          mobile,
          login_type: loginType,
          otp: enteredOTP,
        };

        // calling api
        await this.props.getUserOtpVerify(params);
        const response = this.props.isOtpVerify;

        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {output} = response;
            const data = await decryptData(output);
            const info = JSON.parse(data);
            const {userInfo} = info;

            // persisting userInfo
            await storeData(userInfo);

            // checking firebase messaging permission
            // await checkPermission();
            this.notif = new notification(
              this.onRegister.bind(this),
              this.onNotif.bind(this),
            );

            // Navigating to user home screen
            const {navigation: nav} = this.props;
            const {roleId} = userInfo;

            if (loginType === 'Student') {
              // stopping loader
              this.setState({isLoading: false});

              nav.navigate('StudentHome');
            } else if (loginType === 'Staff') {
              // setting active school
              const {schoolInfo} = userInfo;
              await setActiveSchool(schoolInfo);

              // stopping loader
              this.setState({isLoading: false});

              if (roleId === 'TEACHER') {
                nav.navigate('TeacherHome');
              } else if (roleId === 'GUARD') {
                nav.navigate('GuardHome');
              }
            } else if (loginType === 'Admin') {
              // setting active school
              const {schoolInfo} = userInfo;
              await setActiveSchool(schoolInfo);

              // stopping loader
              this.setState({isLoading: false});

              nav.navigate('AdminHome');
            }
          } else if (success === 0) {
            // stopping loader and showing error message
            const {message} = response;
            this.setState({errorMessage: message, isLoading: false});

            // resetting otp inputs
            this.otpRef.current.reset();
            this.otpRef.current.focus();
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleResendOTP = async () => {
    try {
      if (this.info) {
        // starting loader
        this.setState({isLoading: true});

        // calling API
        const {mobile, loginType} = this.info;
        // preparing params
        const params = {
          mobile,
          login_type: loginType,
        };

        // calling API
        // const response = await userLogin(mobile, loginType);
        await this.props.getUserLogin(params);
        const response = this.props.isUserLogin;

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
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  otpRef = React.createRef();

  render() {
    const {mobile = ''} = this.info;

    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          backIcon={ic_back}
          title="OTP Verification"
          nav={this.props.navigation}
        />

        <ImageBackground
          style={styles.contentContainer}
          source={login_background_bg}
          resizeMode="cover">
          <Text style={styles.heading}>Enter OTP sent on</Text>
          <Text style={styles.mobNo}>{mobile}</Text>

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
const mapStateToProps = state => ({
  isUserLogin: sessionSelectors.isUserLogin(state),
  isOtpVerify: sessionSelectors.isOtpVerify(state),
});
const mapDispatchToProps = {
  getUserLogin: sessionOperations.getUserLogin,
  getUserOtpVerify: sessionOperations.getUserOtpVerify,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OTPVerificationScreen);
