import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from 'screens/AddVisitorScreen/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Images
import user_image from 'assets/images/user_image.png';

// Icons
import ic_photo_camera from 'assets/icons/ic_photo_camera.png';

// Components
import GuardScreenHeader from 'components/GuardScreenHeader';
import ProcessingLoader from 'components/ProcessingLoader';

// API
import {BASE_URL, makeRequest} from 'api/ApiInfo';

// User Preference
import {getData, getActiveSchool} from 'api/UserPreference';

export default class AddVisitorScreen extends Component {
  constructor(props) {
    super(props);
    const item = props.navigation.getParam('item');
    // console.log('item', item);
    const {student_id, name, enroll, academic_year} = item;
    this.state = {
      photo: null,
      student_id,
      name,
      enroll,
      academic_year,
      phone: '',
      persons: '',
      toMeet: '',
      purpose: '',

      showProcessingLoader: false,
    };
  }

  handleTakeVisitorPhoto = () => {
    const getPhotoCallback = photo => {
      this.setState({photo});
    };

    this.props.navigation.push('takeStudentPhoto', {getPhotoCallback});
  };

  handleNameChange = name => {
    this.setState({name});
  };

  handlePhoneChange = phone => {
    this.setState({phone});
  };

  handlePersonsChange = persons => {
    this.setState({persons});
  };

  handleToMeetChange = toMeet => {
    this.setState({toMeet});
  };

  handlePurposeChange = purpose => {
    this.setState({purpose});
  };

  handleAddVisitor = async () => {
    try {
      const {photo, name, phone, persons, toMeet, purpose} = this.state;

      // validations
      if (!photo) {
        Alert.alert('', "Please take visitor's photo", [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (name.trim() === '') {
        Alert.alert('', 'Please enter valid visitor name', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (!this.isValidMobileNumber(phone)) {
        Alert.alert('', 'Please enter valid visitor phone', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      const numberOfPersons = parseInt(persons, 10);
      if (
        isNaN(numberOfPersons) ||
        numberOfPersons < 1 ||
        numberOfPersons > 3
      ) {
        Alert.alert(
          '',
          'Please enter valid number of persons(between 1-3)',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
        return;
      }

      if (toMeet.trim() === '') {
        Alert.alert('', 'Please enter whom to meet', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (purpose.trim() === '') {
        Alert.alert('', 'Please enter purpose of meet', [{text: 'OK'}], {
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

      // fetching userInfo from local storage
      const userInfo = await getData();

      if (userInfo) {
        const visitorPhoto = {
          uri: photo.uri,
          type: 'image/jpeg',
          name: 'visitor_photo.jpg',
          size: 100,
        };

        const {idsprimeID} = activeSchool;

        // preparing params
        const params = {
          userId: userInfo.empId,
          login_type: 'Guard',
          photo: visitorPhoto,
          name,
          phone,
          persons,
          toMeet,
          purpose,
          idsprimeID,
        };

        // calling api
        const response = await makeRequest(
          BASE_URL + 'addVisitor',
          params,
          true,
          false,
        );

        // processing response
        if (response) {
          const {success, message} = response;

          if (success === 1) {
            const {navigation} = this.props;
            const refreshVisitorsCallback = navigation.getParam(
              'refreshVisitorsCallback',
              null,
            );

            if (refreshVisitorsCallback) {
              // stopping loader
              this.setState({showProcessingLoader: false});

              // navigating
              const {visitorId} = response;
              const info = {visitorId, message, phone, refreshVisitorsCallback};
              navigation.push('VisitorOTPVerification', {info});
            }
          } else if (success === 0) {
            // stopping loader
            this.setState({showProcessingLoader: false});

            Alert.alert('', message, [{text: 'OK'}], {
              cancelable: false,
            });
          }
        } else {
          // stopping loader
          this.setState({showProcessingLoader: false});

          //Alert.alert('', response.message, [{text: 'OK'}], {
          //   cancelable: false,
          // });
        }
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handleTakePhoto = async () => {
    this.props.navigation.navigate('takeStudentPhoto');
  };

  isValidMobileNumber(number) {
    const pattern = /^\d{10}$/;
    return pattern.test(number);
  }

  render() {
    const {
      photo,
      name,
      phone,
      persons,
      toMeet,
      purpose,
      showProcessingLoader,
      student_id,
      enroll,
      academic_year,
    } = this.state;

    const visitorPhoto = photo || user_image;

    return (
      <SafeAreaView style={styles.container}>
        <GuardScreenHeader
          title="Take Student Photo"
          nav={this.props.navigation}
          navAction="back"
        />

        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <View style={styles.visitorPhotoContainer}>
              <Image
                source={visitorPhoto}
                resizeMode="cover"
                style={styles.visitorPhoto}
              />

              <View style={styles.visitorPhotoContainerOverlay}>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={this.handleTakeVisitorPhoto}>
                  <Image
                    source={ic_photo_camera}
                    resizeMode="cover"
                    style={styles.visitorPhotoCamera}
                  />
                </TouchableHighlight>
              </View>
            </View>

            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={this.handleNameChange}
              />
            </View>

            {/* <View style={styles.inputFieldContainer}>
              <Text style={styles.inputField}>{student_id}</Text>
               <TextInput
                style={styles.inputField}
                placeholder="Student ID"
                placeholderTextColor="#999"
                // keyboardType="numeric"
                // maxLength={10}
                value={student_id}
                onChangeText={this.handlePhoneChange}
              /> 
            </View>

            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="No. of Persons"
                placeholderTextColor="#999"
                keyboardType="numeric"
                maxLength={1}
                value={persons}
                onChangeText={this.handlePersonsChange}
              />
            </View>

            <View style={styles.inputFieldContainer}>
              <TextInput
                style={styles.inputField}
                placeholder="Whom to Meet"
                placeholderTextColor="#999"
                value={toMeet}
                onChangeText={this.handleToMeetChange}
              />
            </View>

            <View style={styles.textareaContainer}>
              <TextInput
                style={styles.textareaInput}
                placeholder="Purpose of Meet"
                placeholderTextColor="#999"
                multiline={true}
                numberOfLines={4}
                value={purpose}
                onChangeText={this.handlePurposeChange}
              />
            </View> */}

            <TouchableHighlight
              underlayColor="#1ba2de80"
              onPress={this.handleTakePhoto}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Add</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAwareScrollView>

        {showProcessingLoader && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}
