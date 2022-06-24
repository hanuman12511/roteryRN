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
import AdminAdmissionsComponent from './componentScreen/AdminAdmissionsComponent';
import AdminProscpectusComponent from './componentScreen/AdminProscpectusComponent';

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

class AdminProsAdmissionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, // get in true by default
      infoArr: null,
      isStudentProfile: true,
      teacherDesignation: '',
      activeInfoTab: 'Prospectus', // Left / Right
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

  onProspectusTabPress = () => {
    this.setState({activeInfoTab: 'Prospectus'});
  };

  onAdmissionTabPress = () => {
    this.setState({activeInfoTab: 'Admission', isEmailEditable: false});
  };

  handleEmailChange = email => {
    this.setState({email});
  };

  handleEmailEdit = async () => {
    await this.setState({isEmailEditable: !this.state.isEmailEditable});
  };

  render() {
    console.log('data fetch');
    if (this.state.isLoading) return <CustomLoader />;

    const {activeInfoTab, isStudentProfile, isEmailEditable} = this.state;

    let leftTabActiveStyle = {};
    let rightTabActiveStyle = {};
    let attendanceTabActiveStyle = {};
    let feeTabActiveStyle = {};
    if (activeInfoTab === 'Prospectus') {
      leftTabActiveStyle = {
        ...styles.activeTabButton,
      };
    } else if (activeInfoTab === 'Admission') {
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
    //     console.log(this.otherInfo);
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Prospectus & Admission"
              showSchoolLogo
              nav={this.props.navigation}
            />

            <View style={styles.profileInnerContent}>
              <View style={styles.tabBar}>
                <TouchableHighlight
                  onPress={this.onProspectusTabPress}
                  underlayColor={'transparent'}
                  style={[styles.tabButton, leftTabActiveStyle]}>
                  <Text style={styles.tabParentsContent2}>Prospectus</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  onPress={this.onAdmissionTabPress}
                  underlayColor={'transparent'}
                  style={[styles.tabButton, rightTabActiveStyle]}>
                  <Text style={styles.tabParentsContent2}>Admission</Text>
                </TouchableHighlight>
              </View>

              {this.state.activeInfoTab === 'Prospectus' ? (
                <View style={styles.profileTabContant}>
                  {<AdminProscpectusComponent nav={this.props.navigation} />}
                </View>
              ) : this.state.activeInfoTab === 'Admission' ? (
                <View style={styles.profileTabContant}>
                  {<AdminAdmissionsComponent nav={this.props.navigation} />}
                </View>
              ) : null}
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

const mapStateToProps = state => ({});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminProsAdmissionScreen);
