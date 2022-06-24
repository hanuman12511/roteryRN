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
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import DetailListComponent from 'components/DetailListComponent';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

//Images
import profile_box_background from 'assets/images/profile_box_background.jpg';
import profile_image from 'assets/images/profile_image.png';

// Icons
import ic_parents from 'assets/icons/ic_parents.png';
import ic_teacher_profile from 'assets/icons/ic_teacher_profile.png';
import ic_map from 'assets/icons/ic_map.png';
import ic_father from 'assets/icons/ic_father.png';
import ic_mother from 'assets/icons/ic_mother.png';
import ic_phone from 'assets/icons/ic_phone.png';
import ic_email from 'assets/icons/ic_email.png';
import ic_map_marker_green from 'assets/icons/ic_map_marker_green.png';
import ic_edit from 'assets/icons/ic_edit.png';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
import {studentOperations, studentSelectors} from 'idsStore/data/student';
import updateEmail from 'api/Student/UpdateEmailAPI';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      infoArr: null,
      students: '',
      isStudentProfile: true,
      teacherDesignation: '',
      activeInfoTab: 'Left', // Left / Right
      connectionState: true,
      email: '',
      isEmailEditable: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (this.isNextScreenPushed) {
          this.isNextScreenPushed = false;
          return;
        }
        this.profileDataFetch();
      },
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  profileDataFetch = async () => {
    const infoObj = this.props.navigation.getParam('studentInfo', null);
    console.log(infoObj);
    // Processing Student Profile Info
    if (infoObj) {
      await this.props.getStudentInfo();
      const response = await this.props.isUserInfoGet;
      if (this.state.connectionState === true) {
        if (response?.success === 1) {
          let data = null;
          response?.students.map(item => {
            data = item;
          });
          console.log('data', data);

          this.titleArr = [
            'Acadmic Year',
            'Class',
            'Section',
            'Date of Birth',
            'Gender',
            'Scholar No.',
            'Class Teacher',
          ];

          let infoArr = [];
          infoArr.push(data.acedamicyear);
          infoArr.push(data.class);
          infoArr.push(data.section);
          infoArr.push(data.dob);
          infoArr.push(data.gender);
          infoArr.push(data.roll_no);
          infoArr.push(data.teacher_name);

          // Other info
          this.otherInfo = {
            photo: this.getUserImage(data),
            name: this.getUserFullName(data),
            fatherName: data.fathername,
            motherName: data.mothername,
            mobile: data.mobile ? data.mobile : data.guardian_mobileno,
            // email: data.email,
            address: data.current_address
              ? data.current_address
              : 'Not Available',
          };

          this.setState({infoArr, email: data.email, isLoading: false});
        } else {
          this.setState({isListRefreshing: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    } else {
      // Processing Teacher Profile Info
      this.fetchTeacherInfo();
    }
  };

  fetchTeacherInfo = async () => {
    try {
      await this.props.getTeacherInfo();
      const response = this.props.isGetTeacherInfo;
      // console.log('teacher info', response);
      if (response.success === 1) {
        const details = response.details;

        this.titleArr = [
          'Class',
          'Section',
          'Joining Date',
          'Designation',
          'Date of Birth',
        ];

        let infoArr = [];
        infoArr.push(details.class);
        infoArr.push(details.section);
        infoArr.push(details.joiningdate);
        infoArr.push(details.designation);
        infoArr.push(details.dob);

        // Other info
        this.otherInfo = {
          photo: this.getUserImage(details),
          name: this.getUserFullName(details),
          mobile: details.mobile ? details.mobile : '',
          // email: details.email,
          address: details.current_address
            ? details.current_address
            : 'Not Available',
        };

        this.setState({
          infoArr,
          email: details.email,
          isStudentProfile: false,
          isLoading: false,
        });
        details.designation === 'Class Teacher' &&
          this.setState({teacherDesignation: 'Class Teacher'});
      } else {
        //Alert.alert('', response.message);
      }
    } catch (error) {
      Alert.alert('', error);
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  getUserImage = infoObj => {
    const {image} = infoObj;
    return image ? {uri: image} : profile_image;
  };

  getUserFullName = infoObj => {
    const {fname, middlename, lname} = infoObj;

    let fullName = fname;
    middlename && (fullName += ' ' + middlename);
    lname && (fullName += ' ' + lname);
    return fullName;
  };

  onLeftTabPress = () => {
    this.setState({activeInfoTab: 'Left'});
  };

  onRightTabPress = () => {
    this.setState({activeInfoTab: 'Right', isEmailEditable: false});
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

          const infoObj = this.props.navigation.getParam('studentInfo', null);

          if (infoObj) {
            await this.profileDataFetch();
          } else {
            this.fetchTeacherInfo();
          }
        } else {
          showToast(message);
        }
      } else {
        Alert.alert('', 'Please enter valid email address!', [{text: 'OK'}], {
          cancelable: false,
        });
      }
    } catch (error) {
      Alert.alert('', error);
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

  render() {
    if (this.state.isLoading) return <CustomLoader />;

    const {activeInfoTab, isStudentProfile, isEmailEditable} = this.state;

    let leftTabActiveStyle = {};
    let rightTabActiveStyle = {};

    if (activeInfoTab === 'Left') {
      leftTabActiveStyle = {
        ...styles.activeTabButton,
      };
    } else {
      rightTabActiveStyle = {
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
    const infoObj = this.props.navigation.getParam('studentInfo', null);
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Profile"
              showSchoolLogo
              nav={this.props.navigation}
            />
            <ScrollView
              style={styles.profileInnerContent}
              showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView behavior="padding">
                <ImageBackground
                  source={profile_box_background}
                  style={styles.profileImageBox}
                  resizeMode="cover">
                  <Image
                    style={styles.profileImage}
                    source={this.otherInfo?.photo}
                    resizeMode="cover"
                  />
                  {infoObj ? null : (
                    <TouchableHighlight onPress={this.handleUpdatePhoto}>
                      <Image source={ic_edit} style={styles.profileImage2} />
                    </TouchableHighlight>
                  )}

                  <Text style={styles.userName}>{this.otherInfo?.name}</Text>
                </ImageBackground>

                <DetailListComponent
                  titleArr={this.titleArr}
                  infoArr={this.state.infoArr}
                  teacherDesignation={this.state.teacherDesignation}
                  skipContainerStyle={true}
                />

                <View style={styles.tabBar}>
                  <TouchableHighlight
                    onPress={this.onLeftTabPress}
                    underlayColor={'transparent'}
                    style={[styles.tabButton, leftTabActiveStyle]}>
                    <Image
                      source={profileIcon}
                      resizeMode="cover"
                      style={styles.tabIcons}
                    />
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={this.onRightTabPress}
                    underlayColor={'transparent'}
                    style={[styles.tabButton, rightTabActiveStyle]}>
                    <Image
                      source={ic_map}
                      resizeMode="cover"
                      style={styles.tabIcons}
                    />
                  </TouchableHighlight>
                </View>

                {this.state.activeInfoTab === 'Left' ? (
                  <View style={styles.profileTabContant}>
                    {this.state.isStudentProfile && (
                      <View style={styles.tabParentsView}>
                        <Image
                          style={styles.tabParentsIcons}
                          source={ic_father}
                          resizeMode="cover"
                        />
                        <Text style={styles.tabParentsContent}>
                          {this.otherInfo?.fatherName}
                        </Text>
                      </View>
                    )}

                    {this.state.isStudentProfile && (
                      <View style={styles.tabParentsView}>
                        <Image
                          style={styles.tabParentsIcons}
                          source={ic_mother}
                          resizeMode="cover"
                        />
                        <Text style={styles.tabParentsContent}>
                          {this.otherInfo?.motherName}
                        </Text>
                      </View>
                    )}

                    <View style={styles.tabParentsView}>
                      <Image
                        style={styles.tabParentsIcons}
                        source={ic_phone}
                        resizeMode="cover"
                      />
                      <Text style={styles.tabParentsContent}>
                        {this.otherInfo?.mobile}
                      </Text>
                    </View>

                    <View style={styles.tabParentsView}>
                      <Image
                        style={styles.tabParentsIcons}
                        source={ic_email}
                        resizeMode="cover"
                      />

                      <TextInput
                        style={[
                          styles.tabParentsContent,
                          styles.inputStyle,
                          emailInputStyle,
                        ]}
                        placeholder="Enter email id"
                        placeholderTextColor="#696969"
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                        editable={this.state.isEmailEditable}
                      />

                      <TouchableHighlight
                        underlayColor="transparent"
                        onPress={this.handleEmailEdit}
                        style={styles.editEmailButton}>
                        <Image
                          source={ic_edit}
                          resizeMode="cover"
                          style={styles.editEmailIcon}
                        />
                      </TouchableHighlight>
                    </View>
                    <TouchableHighlight
                      underlayColor="#1ba2de80"
                      onPress={this.handleEmailUpdate}
                      style={styles.updateEmailButton}>
                      <Text style={styles.updateEmailButtonTitle}>
                        Update Email
                      </Text>
                    </TouchableHighlight>
                  </View>
                ) : (
                  <View style={styles.profileTabContant}>
                    <View style={styles.tabParentsView}>
                      <Image
                        source={ic_map_marker_green}
                        resizeMode="cover"
                        style={styles.tabParentsIcons}
                      />
                      <Text style={styles.tabParentsContent}>
                        {this.otherInfo?.address}
                      </Text>
                    </View>
                  </View>
                )}
              </KeyboardAvoidingView>
            </ScrollView>
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
  isGetTeacherInfo: teacherSelectors.isGetTeacherInfo(state),
  isUserInfoGet: studentSelectors.isUserInfoGet(state),
});
const mapDispatchToProps = {
  getTeacherInfo: teacherOperations.getTeacherInfo,
  getStudentInfo: studentOperations.getStudentInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
