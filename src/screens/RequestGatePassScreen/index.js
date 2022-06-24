import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Components
import ScreenHeader from 'components/ScreenHeader';
import ProcessingLoader from 'components/ProcessingLoader';

// Icons
import ic_back from 'assets/icons/ic_back.png';
import ic_pick_time from 'assets/icons/ic_pick_time.png';
import ic_suggestion from 'assets/icons/ic_suggestion.png';
import ic_picker_by from 'assets/icons/ic_picker_by.png';
import ic_mobile_picker from 'assets/icons/ic_mobile_picker.png';

// // API
import {BASE_URL, makeRequest} from 'api/ApiInfo';

// User Preference
import {getActiveStudent, getActiveSchool} from 'api/UserPreference';

// Validations
import {isMobileNumber} from 'validations/FormValidations';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
export default class RequestGatePassScreen extends Component {
  constructor(props) {
    super(props);
    const outtime = props.navigation.state.params.outtime;
    const intime = props.navigation.state.params.intime;
    this.state = {
      isTimePickerVisible: false,
      showProcessingLoader: false,
      outtime,
      intime,
      pickTime: 'Pick Time',
      timePridict: '',
      nowTime: '',
      reason: '',
      pickedBy: '',
      pickerMobileNumber: '',
      connectionState: true,
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
  handleReasonChange = reason => {
    this.setState({reason});
  };

  handlePickedByChange = pickedBy => {
    this.setState({pickedBy});
  };

  handlePickerMobileNumberChange = pickerMobileNumber => {
    this.setState({pickerMobileNumber});
  };

  handleRequestGatePass = async () => {
    try {
      const {
        pickTime,
        reason,
        pickedBy,
        pickerMobileNumber,
        outtime,
        intime,
        timePridict,
        nowTime,
      } = this.state;
      // validations
      if (pickTime.trim() === 'Pick Time') {
        Alert.alert('', 'Please enter pick time', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (reason.trim() === '') {
        Alert.alert('', 'Please enter reason', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (pickedBy.trim() === '') {
        Alert.alert('', 'Please enter picked by', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (!isMobileNumber(pickerMobileNumber)) {
        Alert.alert('', 'Please enter picker mobile number', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      let inputTime = timePridict;
      let timeValue = intime;
      let nTimeInterval = outtime;
      var sInTime = inputTime.split(':');
      var sHours = timeValue.split(':');
      var sMinutes = nTimeInterval.split(':');
      const Hour = new Date().getHours();
      const Minute = new Date().getMinutes();
      const currentTime = Hour + `.` + Minute;
      // console.log(nowTime, currentTime);
      if (parseInt(sInTime) <= parseInt(sHours)) {
        Alert.alert(
          '',
          'You can only request for gatepass in school timing',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
        return;
      }
      if (parseInt(sInTime) >= parseInt(sMinutes)) {
        Alert.alert(
          '',
          'You can only request for gatepass in school timing',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
        return;
      }
      if (parseFloat(currentTime) >= parseFloat(nowTime)) {
        Alert.alert('', 'Please Select Proper time.', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }
      // starting loader
      this.setState({showProcessingLoader: true});

      // fetching active school from local storage
      const activeSchool = await getActiveSchool();
      if (!activeSchool) {
        return;
      }

      // fetching activeStudentId from local storage
      const activeStudentId = await getActiveStudent();
      this.setState({showProcessingLoader: false});
      if (activeStudentId) {
        const {idsprimeID} = activeSchool;

        // preparing params
        const params = {
          userId: activeStudentId,
          time: pickTime,
          reason,
          pickedBy,
          mobile: pickerMobileNumber,
          idsprimeID,
        };
        // console.log(params);
        // calling api
        const response = await makeRequest(BASE_URL + 'gatepass', params);

        // processing response

        const {success, message} = response;

        if (success === 1) {
          const {navigation} = this.props;
          const refreshMyGatePassCallback = navigation.getParam(
            'refreshMyGatePassCallback',
            null,
          );

          if (refreshMyGatePassCallback) {
            // stopping loader
            this.setState({showProcessingLoader: false});

            // navigating back
            navigation.pop();

            // refresh callback
            refreshMyGatePassCallback(message);
          }
        } else if (success === 0) {
          // stopping loader
          this.setState({showProcessingLoader: false});

          Alert.alert('', message, [{text: 'OK'}], {
            cancelable: false,
          });
        }
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handlePickTime = () => {
    this.setState({isTimePickerVisible: true});
  };

  handleTimePickerConfirm = dateObj => {
    // const options = {hour: '2-digit', minute: '2-digit'};
    const pickTime = dateObj.getHours();
    const pickTime2 = dateObj.getMinutes();
    const preTime = pickTime + `.` + pickTime2;
    const timePridict = pickTime + `:` + pickTime2;
    const nowTime = pickTime + `.` + pickTime2;
    var suffix = preTime >= 12 ? 'PM' : 'AM';
    if (pickTime2 >= 10) {
      var hours = parseFloat((preTime + 11) % 12).toFixed(2) + suffix;
    } else {
      var hours = parseFloat((preTime + 11) % 12).toFixed(1) + suffix;
    }
    // console.log('picking Time', dateObj, preTime);
    this.setState({
      pickTime: hours,
      timePridict,
      nowTime,
      isTimePickerVisible: false,
    });
  };

  handleTimePickerCancel = () => {
    this.setState({isTimePickerVisible: false});
  };

  render() {
    const {
      showProcessingLoader,
      pickTime,
      reason,
      pickedBy,
      pickerMobileNumber,
      isTimePickerVisible,
    } = this.state;

    const pickTimeStyle = {
      flex: 1,
      paddingVertical: wp(2),
      paddingHorizontal: wp(1),
      color: '#000',
      fontSize: wp(3.5),
    };

    if (pickTime === 'Pick Time') {
      pickTimeStyle.color = '#ccc';
    }

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              backIcon={ic_back}
              title="Request Gate Pass"
              nav={this.props.navigation}
            />
            <KeyboardAwareScrollView
              enableOnAndroid
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View style={styles.formContainer}>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={this.handlePickTime}>
                  <View style={styles.inputFieldContainer}>
                    <Image
                      source={ic_pick_time}
                      resizeMode="contain"
                      style={styles.inputIcon}
                    />
                    <Text style={pickTimeStyle}>{pickTime}</Text>
                  </View>
                </TouchableHighlight>

                <View style={styles.textareaContainer}>
                  <Image
                    source={ic_suggestion}
                    resizeMode="contain"
                    style={styles.textAreaIcon}
                  />
                  <TextInput
                    style={styles.textareaInput}
                    placeholder="Reason"
                    placeholderTextColor="#ccc"
                    multiline={true}
                    numberOfLines={4}
                    value={reason}
                    onChangeText={this.handleReasonChange}
                  />
                </View>

                <View style={styles.inputFieldContainer}>
                  <Image
                    source={ic_picker_by}
                    resizeMode="contain"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Picked By"
                    placeholderTextColor="#ccc"
                    value={pickedBy}
                    onChangeText={this.handlePickedByChange}
                  />
                </View>

                <View style={styles.inputFieldContainer}>
                  <Image
                    source={ic_mobile_picker}
                    resizeMode="contain"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Picker Mobile Number"
                    placeholderTextColor="#ccc"
                    maxLength={10}
                    keyboardType="numeric"
                    value={pickerMobileNumber}
                    onChangeText={this.handlePickerMobileNumberChange}
                  />
                </View>

                <TouchableHighlight
                  underlayColor="#1ba2de80"
                  onPress={this.handleRequestGatePass}
                  style={styles.submitButton}>
                  <Text style={styles.submitButtonText}>Request</Text>
                </TouchableHighlight>
              </View>
            </KeyboardAwareScrollView>
            <DateTimePickerModal
              mode="time"
              // date={new Date()}
              isVisible={isTimePickerVisible}
              locale="en_GB"
              is24Hour={true}
              onConfirm={this.handleTimePickerConfirm}
              onCancel={this.handleTimePickerCancel}
            />
            {showProcessingLoader && <ProcessingLoader />}
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
