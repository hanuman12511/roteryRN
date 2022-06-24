import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  RefreshControl,
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
// import showToast from 'components/CustomToast';

// Icons
// import ic_parents from 'assets/icons/ic_parents.png';
// import ic_teacher_profile from 'assets/icons/ic_teacher_profile.png';
import homeAddress from 'assets/icons/home-address.png';
import ic_father from 'assets/icons/ic_schoolCode.png';
// import ic_mother from 'assets/icons/ic_mother.png';
import ic_phone from 'assets/icons/telephone-call.png';
import ic_email from 'assets/icons/email.png';
import ic_student from 'assets/icons/ic_student.png';
import ic_nonTeaching from 'assets/icons/ic-nonTeaching.png';
import ic_teacher from 'assets/icons/ic_teacher.png';
import ic_girl from 'assets/icons/ic_girl.png';
import ic_boy from 'assets/icons/ic_boy.png';
// import ic_edit from 'assets/icons/ic_edit.png';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
import {getData, getActiveSchool, getActiveStudent} from 'api/UserPreference';

class AdminSchoolProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, // get in true by default
      infoArr: null,
      isStudentProfile: true,
      teacherDesignation: '',
      activeInfoTab: 'Left', // Left / Right
      schooldetails: null,
      connectionState: true,
      email: '',
      isEmailEditable: false,
      school: null,
      isListRefreshing: false,
    };
  }

  componentDidMount() {
    this.profileDataFetch();
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription;
  }
  profileDataFetch = async () => {
    try {
      const school = await getActiveSchool();
      await this.props.getSchoolProfile();
      const response = this.props.isGetSchoolProfile;
      if (this.state.connectionState === true) {
        if (response) {
          if (response.success === 1) {
            const {schooldetails} = response;
            this.setState({schooldetails, school, isLoading: false});
          } else {
            this.setState({
              schooldetails: null,
              school: null,
              isLoading: false,
            });
          }
        } else {
          //Alert.alert('', response.message);
          this.setState({schooldetails: null, isLoading: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log('school profile error', error);
    }
  };
  onLeftTabPress = () => {
    this.setState({activeInfoTab: 'Left'});
  };

  onRightTabPress = () => {
    this.setState({activeInfoTab: 'Right', isEmailEditable: false});
  };
  handleEmail = value => {
    Linking.openURL(`mailto:${this.state.schooldetails.contactEmail}`);
  };
  handleMobile = value => {
    let phone1 = this.state.schooldetails.contactphone.split(',');
    let v1 = phone1[0];
    // v2 = phone1[1];
    Linking.openURL(`tel:${v1}`);
  };
  handleMobile1 = value => {
    let phone1 = this.state.schooldetails.contactphone.split(',');
    let v1 = phone1[1];
    Linking.openURL(`tel:${v1}`);
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.profileDataFetch();
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    if (this.state.isLoading) return <CustomLoader />;

    const {
      activeInfoTab,
      isListRefreshing,
      isEmailEditable,
      schooldetails,
      school,
    } = this.state;

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
    const {
      totalStaff,
      totalTeaching,
      totalNonTeaching,
      totalStudents,
      totalBoys,
      totalGirls,
      totalActiveStudents,
      totalActiveTeaching,
      totalActiveNonteaching,
      totalInactiveStudents,
      totalInactiveTeaching,
      totalInactiveNonTeaching,
      contactEmail,
      contactphone,
      schoolCode,
      address,
      address2,
    } = schooldetails;
    const {school_name, logo} = school;
    let phone1 = contactphone.split(',');
    let v1 = phone1[0],
      v2 = phone1[1];
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="School Profile"
              showSchoolLogo
              nav={this.props.navigation}
            />

            <ScrollView
              style={styles.profileInnerContent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isListRefreshing}
                  onRefresh={this.handleListRefresh}
                />
              }>
              <KeyboardAvoidingView behavior="padding">
                <View style={styles.profileImageBox}>
                  <View style={styles.logoContainer}>
                    <Image
                      style={styles.profileImage}
                      source={{uri: logo}}
                      //     source={this.otherInfo.photo}
                      // resizeMode="cover"
                    />
                  </View>
                  <View>
                    <Text style={styles.userName}>{school_name}</Text>
                    {schoolCode != '0' ? (
                      <View style={styles.tabParentsView}>
                        <Image
                          style={styles.tabParentsIcons}
                          source={ic_father}
                          resizeMode="cover"
                        />
                        <Text style={styles.tabParentsContent}>
                          {schoolCode}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
                <View style={styles.tabBar}>
                  <TouchableHighlight
                    onPress={this.onLeftTabPress}
                    underlayColor={'transparent'}
                    style={[styles.tabButton, leftTabActiveStyle]}>
                    <Text style={styles.tabParentsContent2}>Dashboard</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={this.onRightTabPress}
                    underlayColor={'transparent'}
                    style={[styles.tabButton, rightTabActiveStyle]}>
                    <Text style={styles.tabParentsContent2}>School Detail</Text>
                  </TouchableHighlight>
                </View>

                {this.state.activeInfoTab === 'Right' ? (
                  <View style={styles.profileTabContant}>
                    <View style={styles.tabParentsView1}>
                      <Text style={styles.tabParentsContent3}>
                        Contact Info
                      </Text>
                      <View style={styles.tabParentsView}>
                        <Image
                          style={styles.tabParentsIcons}
                          source={ic_phone}
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
                            {v1}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleMobile1}>
                          <Text
                            style={
                              (styles.tabParentsContent,
                              {
                                borderBottomColor: '#1ba2de',
                                borderBottomWidth: 1,
                                marginLeft: wp(2),
                              })
                            }>
                            {v2}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View style={styles.tabParentsView}>
                        <Image
                          style={styles.tabParentsIcons}
                          source={ic_email}
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
                            {contactEmail}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.tabParentsView1}>
                      <Text
                        style={[
                          styles.tabParentsContent3,
                          {marginBottom: wp(2)},
                        ]}>
                        Address
                      </Text>
                      <View style={styles.addressStyles}>
                        <Image
                          source={homeAddress}
                          style={styles.tabParentsIcons}
                        />
                        <Text style={(styles.tabParentsContent, {flex: 1})}>
                          {address}
                        </Text>
                      </View>
                      <View style={styles.addressStyles}>
                        <Image
                          source={homeAddress}
                          style={styles.tabParentsIcons}
                        />
                        <Text style={(styles.tabParentsContent, {flex: 1})}>
                          {address2}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.profileTabContant}>
                    <View style={styles.tabParentsView1}>
                      <Text style={styles.tabParentsContent3}>
                        Staffs{' '}
                        <Text style={styles.titleInfo}>
                          (Total {totalStaff})
                        </Text>
                      </Text>

                      <View style={styles.tabParentsView}>
                        <View style={styles.distance}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_teacher}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>Teaching</Text>
                          <Text style={styles.valueCount}>{totalTeaching}</Text>
                        </View>
                        <View style={styles.distance}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_nonTeaching}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>
                            Non-Teaching
                          </Text>
                          <Text style={styles.valueCount}>
                            {totalNonTeaching}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.tabParentsView1}>
                      <Text style={styles.tabParentsContent3}>
                        Student{' '}
                        <Text style={styles.titleInfo}>
                          (Total {totalStudents})
                        </Text>
                      </Text>

                      <View style={styles.tabParentsView}>
                        <View style={styles.distance}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_boy}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>Boys</Text>
                          <Text style={styles.valueCount}>{totalBoys}</Text>
                        </View>
                        <View style={styles.distance}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_girl}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>Girls</Text>
                          <Text style={styles.valueCount}>{totalGirls}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.tabParentsView1}>
                      <Text style={styles.tabParentsContent3}>Active</Text>

                      <View style={styles.tabParentsView}>
                        <View style={styles.distance}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_teacher}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>Teaching</Text>
                          <Text style={styles.valueCount}>
                            {totalActiveTeaching}
                          </Text>
                        </View>
                        <View style={styles.distance}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_nonTeaching}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>
                            Non-Teaching
                          </Text>
                          <Text style={styles.valueCount}>
                            {totalActiveNonteaching}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.tabParentsView}>
                        <View style={styles.distance}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_student}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>Student</Text>
                          <Text style={styles.valueCount}>
                            {totalActiveStudents}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.tabParentsView1}>
                      <Text style={styles.tabParentsContent3}>De-Active</Text>

                      <View style={styles.tabParentsView}>
                        <View style={styles.distance}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_teacher}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>Teaching</Text>
                          <Text style={styles.valueCount}>
                            {totalInactiveTeaching}
                          </Text>
                        </View>
                        <View style={styles.distance}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_nonTeaching}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>
                            Non-Teaching
                          </Text>
                          <Text style={styles.valueCount}>
                            {totalInactiveNonTeaching}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.tabParentsView}>
                        <View style={styles.distance}>
                          <Image
                            style={styles.tabParentsIcons}
                            source={ic_student}
                            resizeMode="cover"
                          />
                          <Text style={styles.tabParentsContent}>Student</Text>
                          <Text style={styles.valueCount}>
                            {totalInactiveStudents}
                          </Text>
                        </View>
                      </View>
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
  isGetSchoolProfile: adminSelectors.isGetSchoolProfile(state),
});
const mapDispatchToProps = {getSchoolProfile: adminOperations.getSchoolProfile};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminSchoolProfileScreen);
