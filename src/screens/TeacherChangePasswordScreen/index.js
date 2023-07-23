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
  KeyboardAvoidingView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {styles} from './styles';

// Images
import login_background_bg from 'assets/images/login_background_bg.png';

// Icons
import ic_login_password from 'assets/icons/ic_login_password.png';

// Components
import ScreenHeader from 'components/ScreenHeader';

// API
import teacherChangePassword from 'api/Teacher/TeacherChangePasswordAPI';

// User Preference
import {clearData} from 'api/UserPreference';
//state
import {connect} from 'react-redux';
import {sessionOperations, sessionSelectors} from 'idsStore/data/session';
class TeacherChangePasswordScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  handleCurrentPasswordChange = changedText => {
    this.setState({currentPassword: changedText});
  };

  handleNewPasswordChange = changedText => {
    this.setState({newPassword: changedText});
  };

  handleConfirmPasswordChange = changedText => {
    this.setState({confirmPassword: changedText});
  };

  onOkPress = async () => {
    try {
      // Clearing user preferences from local storage
      clearData();

      // Resetting Navigation to initial state for login again
      // this.props.navigation.navigate('LoggedOut');
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.log(error.message);
    }
  };

  resetInputFields = () => {
    this.setState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  handleChangePassword = async () => {
    try {
      const {currentPassword, newPassword, confirmPassword} = this.state;

      if (currentPassword !== '') {
        if (newPassword !== '') {
          if (confirmPassword !== '') {
            if (newPassword === confirmPassword) {
              // starting loader
              this.setState({isLoading: true});

              await this.props.changePassword(currentPassword, newPassword);
              const response = this.props.isChangePassword;

              // stopping loader
              this.setState({isLoading: false});

              if (response.success === 1) {
                Alert.alert(
                  '',
                  'Password changed successfully!',
                  [{text: 'OK', onPress: this.onOkPress}],
                  {cancelable: false},
                );
              } else if (response.success === 0) {
                Alert.alert(
                  '',
                  response.message,
                  [{text: 'OK', onPress: this.resetInputFields}],
                  {cancelable: false},
                );
              }
            } else {
              Alert.alert(
                '',
                'New and Confirm Password do not match!',
                [{text: 'OK'}],
                {cancelable: false},
              );
            }
          } else {
            Alert.alert('', 'Please enter Confirm Password!', [{text: 'OK'}], {
              cancelable: false,
            });
          }
        } else {
          Alert.alert('', 'Please enter New Password!', [{text: 'OK'}], {
            cancelable: false,
          });
        }
      } else {
        Alert.alert('', 'Please enter Current Password!', [{text: 'OK'}], {
          cancelable: false,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Change Password"
          showSchoolLogo
          nav={this.props.navigation}
        />

        <ImageBackground
          source={login_background_bg}
          resizeMode="cover"
          style={styles.backgroundImageContainer}>
          <KeyboardAvoidingView
            behavior="padding"
            style={styles.contentContainer}>
            <View style={styles.loginInputView}>
              <Text style={styles.inputIcon}>
                <Image source={ic_login_password} resizeMode="cover" />
              </Text>
              <TextInput
                style={styles.loginInput}
                placeholder="Current Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={this.state.currentPassword}
                onChangeText={this.handleCurrentPasswordChange}
              />
            </View>

            <View style={styles.loginInputView}>
              <Text style={styles.inputIcon}>
                <Image source={ic_login_password} resizeMode="cover" />
              </Text>
              <TextInput
                style={styles.loginInput}
                placeholder="New Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={this.state.newPassword}
                onChangeText={this.handleNewPasswordChange}
              />
            </View>

            <View style={styles.loginInputView}>
              <Text style={styles.inputIcon}>
                <Image source={ic_login_password} resizeMode="cover" />
              </Text>
              <TextInput
                style={styles.loginInput}
                placeholder="Confirm Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={this.state.confirmPassword}
                onChangeText={this.handleConfirmPasswordChange}
              />
            </View>

            <TouchableHighlight
              underlayColor={'#333'}
              onPress={this.handleChangePassword}
              style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Change Password</Text>
            </TouchableHighlight>
          </KeyboardAvoidingView>
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
  isChangePassword: sessionSelectors.isChangePassword(state),
});
const mapDispatchToProps = {
  changePassword: sessionOperations.changePassword,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherChangePasswordScreen);
