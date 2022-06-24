import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// screen component
import AdminFee from './componentScreen/AdminFee';
import AdminResult from './componentScreen/AdminResultComponent';
import AdminStudentProfile from './componentScreen/AdminStudentProfileComponent';
import Attendance from './componentScreen/Attendance';

// Icons
import ic_parents from 'assets/icons/ic_parents.png';
import ic_teacher_profile from 'assets/icons/ic_teacher_profile.png';
import ic_edit from 'assets/icons/ic_back.png';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
import updateEmail from 'api/Student/UpdateEmailAPI';

class AdminStudentSummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.stId = props.navigation.getParam('stId');
    console.log(this.stId);
    this.state = {
      isLoading: false, // get in true by default
      infoArr: null,
      isStudentProfile: true,
      teacherDesignation: '',
      activeInfoTab: 'Profile', // Left / Right
      connectionState: true,
      email: '',
      isEmailEditable: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  //   getUserImage = infoObj => {
  //     const {image} = infoObj;
  //     return image ? {uri: image} : profile_image;
  //   };

  //   getUserFullName = infoObj => {
  //     const {fname, middlename, lname} = infoObj;

  //     let fullName = fname;
  //     middlename && (fullName += ' ' + middlename);
  //     lname && (fullName += ' ' + lname);
  //     return fullName;
  //   };

  onProfileTabPress = () => {
    this.setState({activeInfoTab: 'Profile'});
  };

  onResultTabPress = () => {
    this.setState({activeInfoTab: 'Result', isEmailEditable: false});
  };
  onAttendanceTabPress = () => {
    this.setState({activeInfoTab: 'Attendance', isEmailEditable: false});
  };
  onFeeTabPress = () => {
    this.setState({activeInfoTab: 'Fee', isEmailEditable: false});
  };

  handleEmailChange = email => {
    this.setState({email});
  };

  handleEmailEdit = async () => {
    await this.setState({isEmailEditable: !this.state.isEmailEditable});
  };

  handleEmailUpdate = async () => {
    try {
      const {email} = this.state;

      if (this.isEmailAddress(email.trim())) {
        const response = await updateEmail(email);

        // Processing response
        const {success, message} = response;

        if (success === 1) {
          showToast(message);
          this.setState({isEmailEditable: false});
        } else {
          showToast(message);
        }
      } else {
        Alert.alert('', 'Please enter valid email address!', [{text: 'OK'}], {
          cancelable: false,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  isEmailAddress(email) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return pattern.test(email);
  }

  handleUpdatePhoto = async () => {
    console.log('hello');
    this.props.navigation.navigate('UpdateTeacherPhoto');
  };
  handleEmail = value => {
    Linking.openURL(`mailto:${'tcpathak1@gmail.com'}`);
  };
  handleMobile = value => {
    Linking.openURL(`tel:${9549841880}`);
  };

  render() {
    console.log('data fetch');
    if (this.state.isLoading) return <CustomLoader />;

    const {activeInfoTab, isStudentProfile, isEmailEditable} = this.state;

    let leftTabActiveStyle = {};
    let rightTabActiveStyle = {};
    let attendanceTabActiveStyle = {};
    let feeTabActiveStyle = {};
    if (activeInfoTab === 'Profile') {
      leftTabActiveStyle = {
        ...styles.activeTabButton,
      };
    } else if (activeInfoTab === 'Result') {
      rightTabActiveStyle = {
        ...styles.activeTabButton,
      };
    } else if (activeInfoTab === 'Attendance') {
      attendanceTabActiveStyle = {
        ...styles.activeTabButton,
      };
    } else if (activeInfoTab === 'Fee') {
      feeTabActiveStyle = {
        ...styles.activeTabButton,
      };
    }

    let profileIcon = isStudentProfile ? ic_parents : ic_teacher_profile;

    let emailInputStyle = styles.emailInput;
    if (isEmailEditable) {
      emailInputStyle = {
        ...styles.emailInput,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        padding: 0,
      };
    }
    //     console.log(this.otherInfo);
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Student Summary"
              backIcon={ic_edit}
              nav={this.props.navigation}
            />

            <View style={styles.profileInnerContent}>
              <View style={styles.tabBar}>
                <TouchableHighlight
                  onPress={this.onProfileTabPress}
                  underlayColor={'transparent'}
                  style={[styles.tabButton, leftTabActiveStyle]}>
                  <Text style={styles.tabParentsContent2}>Profile</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  onPress={this.onResultTabPress}
                  underlayColor={'transparent'}
                  style={[styles.tabButton, rightTabActiveStyle]}>
                  <Text style={styles.tabParentsContent2}>Result</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={this.onAttendanceTabPress}
                  underlayColor={'transparent'}
                  style={[styles.tabButton, attendanceTabActiveStyle]}>
                  <Text style={styles.tabParentsContent2}>Attendance</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={this.onFeeTabPress}
                  underlayColor={'transparent'}
                  style={[styles.tabButton, feeTabActiveStyle]}>
                  <Text style={styles.tabParentsContent2}>Fee</Text>
                </TouchableHighlight>
              </View>

              {this.state.activeInfoTab === 'Profile' ? (
                <View style={styles.profileTabContant}>
                  {
                    <AdminStudentProfile
                      nav={this.props.navigation}
                      stId={this.stId}
                    />
                  }
                </View>
              ) : this.state.activeInfoTab === 'Result' ? (
                <View style={styles.profileTabContant}>
                  {<AdminResult nav={this.props.navigation} stId={this.stId} />}
                </View>
              ) : this.state.activeInfoTab === 'Attendance' ? (
                <View style={styles.profileTabContant}>
                  {<Attendance nav={this.props.navigation} stId={this.stId} />}
                </View>
              ) : this.state.activeInfoTab === 'Fee' ? (
                <View style={styles.profileTabContant}>
                  {<AdminFee nav={this.props.navigation} stId={this.stId} />}
                </View>
              ) : null}

              {isEmailEditable && (
                <TouchableHighlight
                  underlayColor="#1ba2de80"
                  onPress={this.handleEmailUpdate}
                  style={styles.updateEmailButton}>
                  <Text style={styles.updateEmailButtonTitle}>
                    Update Email
                  </Text>
                </TouchableHighlight>
              )}
            </View>
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
  isGetClassSectionData: adminSelectors.isGetClassSectionData(state),
  isGetClassWiseStudentData: adminSelectors.isGetClassWiseStudentData(state),
  isGetSingleStudentProfileData:
    adminSelectors.isGetSingleStudentProfileData(state),
});
const mapDispatchToProps = {
  getClassSectionData: adminOperations.getClassSectionData,
  getClassWiseStudentData: adminOperations.getClassWiseStudentData,
  getSingleStudentProfileData: adminOperations.getSingleStudentProfileData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminStudentSummaryScreen);
