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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Components
import ScreenHeader from 'components/ScreenHeader';
// import DetailListComponent from 'components/DetailListComponent';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

import ic_picker_by from 'assets/icons/noImage.png';

// Icons
import ic_parents from 'assets/icons/ic_parents.png';
import ic_teacher_profile from 'assets/icons/ic_teacher_profile.png';
import ic_back from 'assets/icons/ic_back.png';
import ic_wedding_rings from 'assets/icons/ic_wedding_rings.png';
// import ic_address_border from 'assets/icons/ic_address_border.png';
import ic_email_border from 'assets/icons/ic_email_border.png';
import ic_mobile_border from 'assets/icons/ic_mobile_border.png';
import ic_gender_border from 'assets/icons/ic_gender_border.png';
import ic_qualification_border from 'assets/icons/ic_qualification_border.png';

// API
import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
import updateEmail from 'api/Student/UpdateEmailAPI';

class AdminGetTeacherDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, // get in true by default
      infoArr: null,
      isStudentProfile: true,
      teacherDesignation: '',
      activeInfoTab: 'Right', // Left / Right
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

        //   this.profileDataFetch();
      },
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

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
    const data = this.props.navigation.getParam('data');
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Teacher Detail"
              backIcon={ic_back}
              showSchoolLogo
              nav={this.props.navigation}
            />

            <ScrollView
              style={styles.profileInnerContent}
              showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView behavior="padding">
                <View style={styles.profileImageBox}>
                  {/* <Image
                style={styles.profileImage}
                source={ic_father}
                //     source={this.otherInfo.photo}
                resizeMode="cover"
              /> */}

                  <View style={styles.imageHolder}>
                    {data.file ? (
                      <Image
                        style={styles.teacherImage}
                        source={{uri: data.file}}
                      />
                    ) : (
                      <Image
                        style={styles.teacherImage}
                        source={ic_picker_by}
                      />
                    )}
                  </View>

                  <View>
                    <Text style={styles.userName}>{data.name}</Text>
                    <Text style={styles.designation}>
                      {data.department}{' '}
                      <Text style={styles.designationMain}>
                        {data.designation}
                      </Text>
                    </Text>
                  </View>
                </View>

                <View style={styles.tabBar}>
                  <TouchableHighlight
                    onPress={this.onRightTabPress}
                    underlayColor={'transparent'}
                    style={[styles.tabButton, rightTabActiveStyle]}>
                    <Text style={styles.tabParentsContent2}>Working Info</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={this.onLeftTabPress}
                    underlayColor={'transparent'}
                    style={[styles.tabButton, leftTabActiveStyle]}>
                    <Text style={styles.tabParentsContent2}>Personal Info</Text>
                  </TouchableHighlight>
                </View>

                {this.state.activeInfoTab === 'Left' ? (
                  <View style={styles.profileTabContant}>
                    {this.state.isStudentProfile && (
                      <View style={styles.tabParentsView1}>
                        <View style={styles.tabParentsView}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_gender_border}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>
                            Gender : {data.gender}
                          </Text>
                        </View>
                      </View>
                    )}
                    {data.martial_status != '' ? (
                      <View style={styles.tabParentsView1}>
                        <View style={styles.tabParentsView}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_wedding_rings}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>
                            Maritial Status : {data.martial_status}
                          </Text>
                        </View>
                      </View>
                    ) : null}

                    <View style={styles.tabParentsView1}>
                      <Text style={styles.blockHeading}>Contact Info</Text>
                      <View style={styles.tabParentsView}>
                        <Image
                          style={styles.tabParentsIcons}
                          source={ic_mobile_border}
                          resizeMode="cover"
                        />
                        <TouchableOpacity onPress={this.handleMobile}>
                          <Text
                            style={
                              (styles.tabParentsContent,
                              {
                                borderBottomColor: '#1ba2de',
                                borderBottomWidth: 1,
                                marginLeft: wp(2),
                              })
                            }>
                            {data.mobile}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.separator} />
                      <View style={styles.tabParentsView}>
                        <Image
                          style={styles.tabParentsIcons}
                          source={ic_email_border}
                          resizeMode="cover"
                        />
                        <TouchableOpacity onPress={this.handleEmail}>
                          <Text
                            style={
                              (styles.tabParentsContent,
                              {
                                borderBottomColor: '#1ba2de',
                                borderBottomWidth: 1,
                                marginLeft: wp(2),
                              })
                            }>
                            {data.email}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {data.qualification !== null &&
                    data.qualification !== undefined ? (
                      <View style={styles.tabParentsView1}>
                        <Text style={styles.blockHeading}>Qualification</Text>
                        <View style={styles.tabParentsView}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_qualification_border}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>
                            {data.qualification}
                          </Text>
                        </View>
                      </View>
                    ) : null}

                    {/* <View style={styles.tabParentsView1}>
                  <Text style={styles.blockHeading}>Address</Text>
                  <View style={styles.tabParentsView}>
                    <Image
                      style={styles.tabParentsIcons}
                      source={ic_address_border}
                      resizeMode="cover"
                    />
                    <Text style={styles.tabParentsContent}>
                      Sumer Nagar Vistar, Opposite Dhanwantri Hospital, New
                      Sanganer Road, Mansarovar, Jaipur, Rajasthan - 302020
                    </Text>
                  </View>
                </View> */}
                  </View>
                ) : (
                  <View style={styles.tabParentsView1}>
                    <Text style={styles.blockHeading}>Working Info</Text>
                    <View>
                      {data.experience != null ? (
                        <View style={styles.distance}>
                          <Text style={styles.tabParentsContent}>
                            Experience
                          </Text>
                          <Text style={styles.divider}>-</Text>
                          <Text style={styles.tabParentsContent}>
                            {data.experience}
                          </Text>
                        </View>
                      ) : null}
                      {data.joiningdate != null ? (
                        <View style={styles.distance}>
                          <Text style={styles.tabParentsContent}>
                            Joining Date
                          </Text>
                          <Text style={styles.divider}>-</Text>
                          <Text style={styles.tabParentsContent}>
                            {data.joiningdate}
                          </Text>
                        </View>
                      ) : null}
                      {data.nationality != null ? (
                        <View style={styles.distance}>
                          <Text style={styles.tabParentsContent}>
                            Nationality
                          </Text>
                          <Text style={styles.divider}>-</Text>
                          <Text style={styles.tabParentsContent}>
                            {data.nationality}
                          </Text>
                        </View>
                      ) : null}
                      {data.emp_status != '0' ? (
                        <View style={styles.distance}>
                          <Text style={styles.tabParentsContent}>
                            Employee Status
                          </Text>
                          <Text style={styles.divider}>-</Text>
                          <Text style={styles.tabParentsContent}>
                            {data.emp_status}
                          </Text>
                        </View>
                      ) : null}
                      {data.basic_salary != 0 ? (
                        <View style={styles.distance}>
                          <Text style={styles.tabParentsContent}>
                            Basic Salary
                          </Text>
                          <Text style={styles.divider}>-</Text>
                          <Text style={styles.tabParentsContent}>
                            ₹ {data.basic_salary}
                          </Text>
                        </View>
                      ) : null}
                      {data.qualification != null ? (
                        <View style={styles.distance}>
                          <Text style={styles.tabParentsContent}>
                            Qualification
                          </Text>
                          <Text style={styles.divider}>-</Text>
                          <Text style={styles.tabParentsContent}>
                            {data.qualification}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                  </View>
                )}

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
});
const mapDispatchToProps = {getTeacherInfo: teacherOperations.getTeacherInfo};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminGetTeacherDetail);
