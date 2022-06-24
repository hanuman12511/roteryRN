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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import DetailListComponent from 'components/DetailListComponent';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

//Images
import profile_box_background from 'assets/images/profile_box_background.jpg';
import noPhoto from 'assets/images/noPhoto.png';

// Icons
import ic_parents from 'assets/icons/ic_parents.png';
import ic_teacher_profile from 'assets/icons/ic_teacher_profile.png';
import ic_map from 'assets/icons/ic_map.png';
import ic_father from 'assets/icons/ic_father_black.png';
import ic_mother from 'assets/icons/ic_mother_black.png';
import ic_phone from 'assets/icons/ic_phone_black.png';
import ic_email from 'assets/icons/ic_email_black.png';
import ic_map_marker_green from 'assets/icons/ic_map_marker_black.png';
import ic_edit from 'assets/icons/ic_edit.png';

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
import updateEmail from 'api/Student/UpdateEmailAPI';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.stId = props.stId;

    this.autoLoad = props.nav;
    this.state = {
      isLoading: true,
      infoArr: null,
      isStudentProfile: true,
      teacherDesignation: '',
      activeInfoTab: 'Left', // Left / Right
      class: '',
      section: '',
      email: '',
      isEmailEditable: false,
    };
  }

  componentDidMount() {
    this.profileDataFetch();

    // this.didFocusSubscription = this.autoLoad.addListener('didFocus', payload =>
    //   this.profileDataFetch(payload),
    // );
  }
  componentWillUnmount() {
    // unsubscribing from didFocus listener
    // this.didFocusSubscription.remove();
  }
  profileDataFetch = async () => {
    await this.props.getSingleStudentProfileData(this.stId);
    const response = this.props.isGetSingleStudentProfileData;
    if (response && response.success === 1) {
      const {students} = response;
      const infoObj = students[0];

      // Processing Student Profile Info
      if (infoObj) {
        this.titleArr = [
          'Acadmic Year',
          // 'Class',
          // 'Section',
          'Date of Birth',
          'Gender',
          'Scholar No.',
          'Class Teacher',
        ];

        let infoArr = [];
        infoArr.push(infoObj.acedamicyear);
        // infoArr.push(infoObj.class);
        // infoArr.push(infoObj.section);
        infoArr.push(infoObj.dob);
        infoArr.push(infoObj.gender);
        infoArr.push(infoObj.roll_no);
        infoArr.push(infoObj.teacher_name);

        // Other info
        this.otherInfo = {
          photo: this.getUserImage(infoObj),
          name: this.getUserFullName(infoObj),
          fatherName: infoObj.fathername,
          motherName: infoObj.mothername,
          mobile: infoObj.mobile ? infoObj.mobile : infoObj.guardian_mobileno,
          // email: infoObj.email,
          address: infoObj.current_address
            ? infoObj.current_address
            : 'Not Available',
        };

        this.setState({
          infoArr,
          class: infoObj.class,
          section: infoObj.section,
          email: infoObj.email,
          isLoading: false,
        });
      } else {
        // Processing Teacher Profile Info
        // this.fetchTeacherInfo();
      }
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
          // 'Class',
          // 'Section',
          'Joining Date',
          'Designation',
          'Date of Birth',
        ];

        let infoArr = [];
        // infoArr.push(details.class);
        // infoArr.push(details.section);
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
      }
    } catch (error) {
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  getUserImage = infoObj => {
    const {image} = infoObj;
    return image ? {uri: image} : noPhoto;
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

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          // style={styles.profileInnerContent}
          showsVerticalScrollIndicator={false}>
          {/* <ImageBackground
            source={profile_box_background}
            style={styles.profileImageBox}
            resizeMode="cover"> */}
          <View style={styles.profileImageBox}>
            <Image
              style={styles.profileImage}
              source={this.otherInfo.photo}
              resizeMode="cover"
            />
            {/* <TouchableHighlight onPress={this.handleUpdatePhoto}>
                <Image source={ic_edit} style={styles.profileImage2} />
              </TouchableHighlight> */}
            <View>
              <Text style={styles.userName}>{this.otherInfo.name}</Text>
              <Text style={styles.classInfo}>
                {this.state.class} - {this.state.section}
              </Text>
            </View>
          </View>
          {/* </ImageBackground> */}

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
                    {this.otherInfo.fatherName}
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
                    {this.otherInfo.motherName}
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
                  {this.otherInfo.mobile}
                </Text>
              </View>

              <View style={styles.tabParentsView}>
                <Image
                  style={styles.tabParentsIcons}
                  source={ic_email}
                  resizeMode="cover"
                />
                <Text style={styles.tabParentsContent}>{this.state.email}</Text>
                {/* <TextInput
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
                /> */}

                {/* {this.state.isStudentProfile && (
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
                  )} */}
              </View>
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
                  {this.otherInfo.address}
                </Text>
              </View>
            </View>
          )}

          {isEmailEditable && (
            <TouchableHighlight
              underlayColor="#1ba2de80"
              onPress={this.handleEmailUpdate}
              style={styles.updateEmailButton}>
              <Text style={styles.updateEmailButtonTitle}>Update Email</Text>
            </TouchableHighlight>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetSingleStudentProfileData:
    adminSelectors.isGetSingleStudentProfileData(state),
});
const mapDispatchToProps = {
  getSingleStudentProfileData: adminOperations.getSingleStudentProfileData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  profileInnerContent: {
    flex: 1,
  },
  profileImageBox: {
    flexDirection: 'row',
    height: hp(15),
    padding: wp(2),
    alignItems: 'center',
    marginBottom: hp(2),
    backgroundColor: '#1ba5e2',
  },
  profileImage: {
    width: wp(20),
    height: wp(20),
    borderWidth: 1,
    borderColor: '#f2f1f1',
    borderRadius: wp(1),
    backgroundColor: '#fff',
    padding: wp(2),
  },
  profileImage2: {
    width: wp(6),
    height: wp(6),
    left: 0,
    bottom: 0,
    right: 0,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: wp(10),
  },
  userName: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#fff',
    marginLeft: wp(4),
  },
  classInfo: {
    fontSize: wp(4),
    fontWeight: '400',
    color: '#fff',
    marginLeft: wp(4),
  },
  userInfo: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: hp(1),
  },
  userInfoRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.25),
  },
  userInfoLeft: {
    width: wp(40),
    fontWeight: 'bold',
    fontSize: wp(3),
  },
  userInfoCenter: {
    width: wp(10),
    fontSize: wp(3),
  },
  userInfoRight: {
    width: wp(50),
    fontSize: wp(3),
  },
  tabBar: {
    flexDirection: 'row',
    marginTop: hp(2),
  },
  tabButton: {
    width: wp(50),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666',
  },
  activeTabButton: {
    backgroundColor: '#018bc8',
    borderBottomWidth: 2,
    borderBottomColor: '#018bc8',
  },
  tabIcons: {
    height: hp(3.5),
    aspectRatio: 1 / 1,
  },
  tabParentsView: {
    // height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2),
  },
  tabParentsContent: {
    color: '#231f20',
    marginLeft: wp(2),
    fontSize: wp(3),
  },
  inputStyle: {
    marginTop: hp(-0.5),
  },
  tabParentsIcons: {
    width: wp(5),
    aspectRatio: 1 / 1,
  },
  profileTabContant: {
    marginTop: hp(1),
    marginHorizontal: wp(2),
  },
  emailInput: {
    flex: 1,
    marginRight: wp(2),
  },
  editEmailButton: {
    padding: wp(1),
  },
  editEmailIcon: {
    width: wp(5),
    height: wp(5),
  },
  updateEmailButton: {
    height: hp(6),
    marginTop: hp(5),
    marginBottom: hp(8),
    paddingHorizontal: wp(4),
    backgroundColor: '#1ba2de',
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateEmailButtonTitle: {
    color: '#fff',
    fontSize: wp(3),
  },
});
