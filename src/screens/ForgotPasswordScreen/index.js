import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RadioForm from 'react-native-simple-radio-button';

// Components
import ScreenHeader from 'components/ScreenHeader';
import showToast from 'components/CustomToast';

// Images
import login_background_bg from 'assets/images/login_background_bg.png';

// Icons
import ic_back from 'assets/icons/ic_back.png';
import ic_mobile from 'assets/icons/ic_mobile.png';

// API
import studentForgotPassword from 'api/Student/StudentForgotPasswordAPI';
import teacherForgotPassword from 'api/Teacher/TeacherForgotPasswordAPI';

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      loginType: 'Student',
      inputFieldPlaceholder: 'Student Mobile No.',
      userId: '',
    };

    this.radio_props = [
      {label: 'Student', value: 'Student'},
      {label: 'Teacher', value: 'Teacher'},
      {label: 'Admin', value: 'Admin'},
    ];
  }

  handleUserIdChange = changedText => {
    this.setState({userId: changedText});
  };

  onRadioButtonPress = value => {
    if (value === 'Student') {
      this.setState({
        loginType: value,
        inputFieldPlaceholder: 'Student Mobile No.',
      });
    } else if (value === 'Teacher') {
      this.setState({
        loginType: value,
        inputFieldPlaceholder: 'Teacher Mobile No.',
      });
    } else {
      this.setState({
        loginType: value,
        inputFieldPlaceholder: 'Admin Mobile No.',
      });
    }
  };

  handleResetPassword = async () => {
    try {
      const {loginType, inputFieldPlaceholder, userId} = this.state;
      console.log(loginType, userId);
      if (userId.trim() != '') {
        // starting loader
        this.setState({isLoading: true});

        if (loginType === 'Student') {
          // reset student password
          const response = await studentForgotPassword(userId, loginType);

          if (response.success === 1) {
            // Navigating and showing message
            this.props.navigation.pop();
            showToast(response.message);
          } else if (response.success === 0) {
            // stopping loader
            this.setState({isLoading: false});

            // showing message
            //Alert.alert('', response.message, [{text: 'OK'}], {
            //   cancelable: false,
            // });
          }
        } else if (loginType === 'Teacher') {
          // reset teacher password
          const response = await studentForgotPassword(userId, loginType);

          if (response.success === 1) {
            // Navigating and showing message
            this.props.navigation.pop();
            showToast(response.message);
          } else if (response.success === 0) {
            // stopping loader
            this.setState({isLoading: false});

            // showing message
            //Alert.alert('', response.message, [{text: 'OK'}], {
            //   cancelable: false,
            // });
          }
        } else if (loginType === 'Admin') {
          // reset admin password
          // reset teacher password
          const response = await studentForgotPassword(userId, loginType);

          if (response.success === 1) {
            // Navigating and showing message
            this.props.navigation.pop();
            showToast(response.message);
          } else if (response.success === 0) {
            // stopping loader
            this.setState({isLoading: false});

            // showing message
            //Alert.alert('', response.message, [{text: 'OK'}], {
            //   cancelable: false,
            // });
          }
        }
      } else {
        Alert.alert(
          '',
          `Please enter a valid ${inputFieldPlaceholder}!`,
          [{text: 'OK'}],
          {cancelable: false},
        );

        this.setState({userId: ''});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          backIcon={ic_back}
          title="Forgot Password"
          nav={this.props.navigation}
        />

        <ImageBackground
          source={login_background_bg}
          resizeMode="cover"
          style={styles.contentContainer}>
          <View style={styles.loginInputView}>
            <View style={styles.inputIconContainer}>
              <Image
                source={ic_mobile}
                resizeMode="cover"
                style={styles.inputIcon}
              />
            </View>

            <TextInput
              style={styles.loginInput}
              placeholder={this.state.inputFieldPlaceholder}
              placeholderTextColor="#ccc"
              value={this.state.userId}
              maxLength={10}
              onChangeText={this.handleUserIdChange}
              keyboardType="number-pad"
            />
          </View>

          <View>
            <RadioForm
              style={styles.radioButtonsText}
              radio_props={this.radio_props}
              initial={0}
              formHorizontal={true}
              buttonColor={'#fff'}
              selectedButtonColor={'#fff'}
              labelColor={'#fff'}
              buttonSize={14}
              labelStyle={styles.radioFormLabel}
              onPress={this.onRadioButtonPress}
            />
          </View>

          <TouchableHighlight
            underlayColor="transparent"
            onPress={this.handleResetPassword}
            style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableHighlight>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginInputView: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    height: 40,
    paddingBottom: 5,
    marginBottom: 30,
  },
  inputIconContainer: {
    borderRightWidth: 2,
    borderRightColor: '#fff',
    paddingRight: 10,
    color: '#fff',
  },
  inputIcon: {
    height: 24,
    width: 24,
  },
  loginInput: {
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
    color: '#fff',
    height: 40,
    width: '80%',
  },
  radioButtonsText: {
    alignSelf: 'center',
  },
  radioFormLabel: {
    fontSize: wp(3.5),
    color: '#fff',
    marginRight: 20,
    marginLeft: 2,
  },
  resetButton: {
    width: 160,
    height: 44,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1ba2de',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loaderContentContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
});
