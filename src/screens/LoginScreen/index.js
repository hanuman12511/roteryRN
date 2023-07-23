import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  Keyboard,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import RadioForm from 'react-native-simple-radio-button';
import {SafeAreaView} from 'react-native-safe-area-context';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
//data
import {connect} from 'react-redux';
import {sessionOperations, sessionSelectors} from 'idsStore/data/session';
import {checkPermission} from 'firebase_api';

// Images
import login_background_bg from 'assets/images/background.webp';
import app_logo_white from 'assets/images/RotaryClub.png';

// Icons
import ic_mobile from 'assets/icons/ic_mobile.png';
import ic_login_password from 'assets/icons/ic_login_password.png';
import password_show from 'assets/icons/password_show.png';
import password_hide from 'assets/icons/password_hide.png';
// Utility
import {decryptData} from 'api/EncryptionUtility';
// User Preference
import {storeData, setActiveSchool} from 'api/UserPreference';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isVisible: true,
      mobile: '',
      password: '',
      loginType: 0,
      isLoginSuccess: true,
      connectionState: true,
    };

    this.radio_props = [
      {label: 'Member', value: 0},
      {label: 'President', value: 1},
      {label: 'DG', value: 2},
    ];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // Adding listener to stop loader
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      this.onComponentWillFocus,
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.willFocusSubscription.remove();
  }

  onComponentWillFocus = async () => {
    // stopping loader
    this.setState({isLoading: false});
  };

  onRadioButtonPress = async value => {
    this.setState({loginType: value});
  };

  onMobileChange = changedText => {
    this.setState({mobile: changedText});
  };
  onPasswordChange = changedText => {
    this.setState({password: changedText});
  };

  isMobileNumber(number) {
    if (/^\d{10}$/.test(number)) {
      return true;
    }
    return false;
  }

  onLoginPress = async () => {
    try {
      const {mobile, password, loginType: _loginType} = this.state;

      if (this.isMobileNumber(mobile)) {
        if (password.trim() === '') {
          Alert.alert('', 'Please Enter Valid Password', [{text: 'OK'}], {
            cancelable: false,
          });
        }
        // starting loader
        this.setState({isLoading: true});

        // processing loginType
        let loginType = 'Student';

        switch (_loginType) {
          case 1:
            loginType = 'Staff';
            break;
          case 2:
            loginType = 'Admin';
        }
        // preparing params
        const params = {
          mobile,
          password,
          login_type: loginType,
        };

        // calling API
        // const response = await userLogin(mobile, loginType);
        await this.props.getUserLogin(params);
        const response = this.props.isUserLogin;

        // processing response
        if (response) {
          const {success, message} = response;

          if (success === 1) {
            const {output} = response;
            const data = await decryptData(output);
            const info = JSON.parse(data);
            const {userInfo} = info;
            // console.log('userInfo', userInfo);
            // persisting userInfo
            await storeData(userInfo);
            // Navigating to user home screen
            const {navigation: nav} = this.props;
            const {roleId} = userInfo;

            if (loginType === 'Student') {
              // stopping loader
              // this.setState({isLoading: false});
              await checkPermission();
              nav.navigate('StudentHome');
            } else if (loginType === 'Staff') {
              // setting active school
              const {schoolInfo} = userInfo;
              await setActiveSchool(schoolInfo);

              // stopping loader
              // this.setState({isLoading: false});

              if (roleId === 'TEACHER') {
                await checkPermission();
                nav.navigate('TeacherHome');
              } else if (roleId === 'GUARD') {
                await checkPermission();
                nav.navigate('GuardHome');
              }
            } else if (loginType === 'Admin') {
              // setting active school
              const {schoolInfo} = userInfo;
              await setActiveSchool(schoolInfo);

              // stopping loader
              // this.setState({isLoading: false});
              await checkPermission();
              nav.navigate('AdminHome');
            }
          } else if (success === 0) {
            // stopping loader
            this.setState({isLoading: false, isLoginSuccess: false});

            Alert.alert('', message, [{text: 'OK'}], {
              cancelable: false,
            });
          }
        }
      } else {
        Alert.alert('', 'Please enter a valid Mobile Number!', [{text: 'OK'}], {
          cancelable: false,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    console.log(notif.title, notif.message);
  }

  onPressForgetPassword = () => {
    try {
      this.props.navigation.navigate('ForgotPassword');
    } catch (error) {
      console.log('Forget Password key error', error);
    }
  };

  handleStartShouldSetResponder = () => {
    Keyboard.dismiss();
  };
  onPressVisibleKey = () => {
    this.setState({isVisible: !this.state.isVisible});
  };

  render() {
    return (
      <SafeAreaView
        style={styles.container}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}>
        {this.state.connectionState && (
          <>
            <View style={styles.loginTopBar}>
              <Text style={styles.loginTopBarContent}>Rotary Club</Text>
            </View>

            <ImageBackground
              source={login_background_bg}
              resizeMode="cover"
              style={styles.contentContainer}>
              <View style={styles.headingContainer}>
                <Image
                  source={app_logo_white}
                  resizeMode="cover"
                  style={styles.logo}
                />
                {/* <Text style={styles.subHeading}>Campus</Text> */}
              </View>

              <View style={styles.loginInputView}>
                <Image
                  source={ic_mobile}
                  resizeMode="cover"
                  style={styles.inputFieldIcon}
                />
                <TextInput
                  style={styles.loginInput}
                  placeholder="Mobile Number"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  maxLength={10}
                  value={this.state.mobile}
                  onChangeText={this.onMobileChange}
                />
              </View>
              <View style={styles.loginInputView}>
                <Image
                  source={ic_login_password}
                  resizeMode="cover"
                  style={styles.inputFieldIcon}
                />
                <TextInput
                  style={styles.loginInput}
                  placeholder="Password"
                  placeholderTextColor="#ccc"
                  keyboardType="default"
                  maxLength={100}
                  secureTextEntry={this.state.isVisible}
                  value={this.state.password}
                  onChangeText={this.onPasswordChange}
                />
                <TouchableOpacity onPress={this.onPressVisibleKey}>
                  <Image
                    source={
                      this.state.isVisible ? password_show : password_hide
                    }
                    resizeMode="cover"
                    style={styles.inputFieldIcon}
                  />
                </TouchableOpacity>
              </View>
              {/* {this.state.isLoginSuccess === false ? (
            <Text
              style={{
                fontSize: 14,
                color: 'red',
                textTransform: 'uppercase',
                marginLeft: hp(2),
                marginBottom: hp(2),
              }}>
              Enter your password again
            </Text>
          ) : null} */}
              <RadioForm
                style={styles.radioButtons}
                radio_props={this.radio_props}
                initial={0}
                formHorizontal={true}
                buttonColor={'#fff'}
                selectedButtonColor={'#fff'}
                labelColor={'#fff'}
                buttonSize={12}
                labelStyle={styles.radioButtonLabel}
                onPress={this.onRadioButtonPress}
              />
              <TouchableOpacity
                style={styles.forgetPasswordStyle}
                onPress={this.onPressForgetPassword}>
                <Text style={styles.forgetPasswordTxt}>Forgot Password</Text>
              </TouchableOpacity>
              <TouchableHighlight
                style={styles.loginButton}
                underlayColor="#1ba2de80"
                onPress={this.onLoginPress}>
                <Text style={styles.loginButtonText}>LOGIN</Text>
              </TouchableHighlight>
            </ImageBackground>

            {this.state.isLoading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#fff" />
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
  isUserLogin: sessionSelectors.isUserLogin(state),
});
const mapDispatchToProps = {
  getUserLogin: sessionOperations.getUserLogin,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
