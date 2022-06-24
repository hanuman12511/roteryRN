import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import DocumentPicker from 'react-native-document-picker';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import ProcessingLoader from 'components/ProcessingLoader';
import showToast from 'components/CustomToast';

// Icons
import calendar from 'assets/icons/calendar.png';
import ic_upload_file from 'assets/icons/ic_upload_file.png';
import ic_back from 'assets/icons/ic_back.png';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
// User Preference
import {getData, getActiveSchool} from 'api/UserPreference';

class AddAssignmentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      showProcessingLoader: false,
      connectionState: true,
      selectedClassId: null,
      selectedSectionId: null,
      selectedClassName: 'Select Class',

      selectedSubjectId: null,
      selectedSubjectName: null,

      isDateTimePickerVisible: false,
      selectedDate: 'Select Submission Date',

      selectedFile: null,

      assignmentDescription: '',
    };
  }

  async componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchTeacherClassDetails();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchTeacherClassDetails = async () => {
    try {
      await this.props.getTeacherClassDetails();
      const response = this.props.isGetTeacherClassDetails;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          this.classSectionData = response.classsec;
          this.classList = this.classSectionData.map((item, index) => (
            <Picker.Item label={item.name} value={item.name} key={index} />
          ));

          this.setState({isLoading: false});
        } else if (response.success === 0) {
          //Alert.alert('', response.message);
          this.setState({isLoading: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _handleDatePicked = date => {
    const selectedDate =
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

    this.setState({selectedDate});
    this._hideDateTimePicker();
  };

  onClassChange = async (itemValue, itemIndex) => {
    try {
      if (itemIndex === 0) {
        this.setState({
          // reset class-section
          selectedClassName: itemValue,
          selectedClassId: null,
          selectedSectionId: null,
        });
      } else {
        const selectedClassObj = this.classSectionData[itemIndex - 1];
        const selectedClassId = selectedClassObj.class_id;
        const selectedSectionId = selectedClassObj.section_id;

        await this.props.getSubjectDetails(selectedClassId, selectedSectionId);
        const response = this.props.isGetSubjectDetails;

        if (response.success === 1) {
          this.subjectsData = response.subject;
          this.subjectList = this.subjectsData.map((item, index) => (
            <Picker.Item
              label={item.subname}
              value={item.subname}
              key={index}
            />
          ));

          this.setState({
            selectedClassName: itemValue,
            selectedClassId,
            selectedSectionId,
          });
        } else {
          //Alert.alert('', response.message);
        }
      }

      this.setState({
        // reset subject
        selectedSubjectName: 'Select Subject',
        selectedSubjectId: null,
      });
    } catch (error) {
      Alert.alert('', error);
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  onSubjectChange = (itemValue, itemIndex) => {
    if (itemIndex === 0) {
      this.setState({
        selectedSubjectName: itemValue,
        selectedSubjectId: null,
      });
    } else {
      const selectedSubjectObj = this.subjectsData[itemIndex - 1];
      const selectedSubjectId = selectedSubjectObj.sub_id;

      this.setState({selectedSubjectName: itemValue, selectedSubjectId});
    }
  };

  onDescriptionChange = changedText => {
    this.setState({assignmentDescription: changedText});
  };

  handlePermissions = async () => {
    try {
      // console.log('you press permission tab for take subject');
      if (Platform.OS === 'android') {
        const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            break;
          case RESULTS.GRANTED:
            // console.log("The permission is granted");
            this.handleFilePick();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            Alert.alert(
              'Permission Blocked',
              'Press OK and provide "Storage" permission in App Setting',
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: this.handleOpenSettings,
                },
              ],
              {cancelable: false},
            );
        }
      } else if (Platform.OS === 'ios') {
        this.handleFilePick();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleOpenSettings = async () => {
    try {
      await openSettings();
    } catch (error) {
      console.log('cannot open settings', error);
    }
  };

  // handleFilePick = async () => {
  //   try {
  //     // Pick a single file
  //     const response = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     });

  //     console.log('document picked', response);
  //     this.setState({selectedFile: response});
  //   } catch (error) {
  //     if (!DocumentPicker.isCancel(error)) {
  //       console.log(error);
  //     }
  //   }
  // };
  handleFilePick = async () => {
    try {
      // Pick a single file
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log('Response', response);
      // console.log(response);
      this.setState({selectedFile: response});
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log(error);
      }
    }
  };

  onSubmitPress = async () => {
    try {
      const {
        selectedClassName,
        selectedClassId,
        selectedSectionId,
        selectedSubjectId,
        selectedSubjectName,
        selectedDate,
        selectedFile,
        assignmentDescription,
      } = this.state;

      // validations
      if (selectedClassName === 'Select Class') {
        Alert.alert('', 'Please select class!', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (selectedSubjectName === 'Select Subject') {
        Alert.alert('', 'Please select subject!', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (selectedDate === 'Select Submission Date') {
        Alert.alert('', 'Please select submission date!', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (assignmentDescription.trim() === '') {
        this.setState({assignmentDescription: ''});
        Alert.alert('', 'Please enter description!', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      // starting loader
      this.setState({showProcessingLoader: true});

      // fetching empId from local storage
      const userInfo = await getData();
      const data = await getActiveSchool();
      const {idsprimeID} = data;
      if (userInfo) {
        // preparing params
        const name = `Assignment for ${selectedClassName}`;
        const {empId} = userInfo;

        const params = {
          name,
          idsprimeID,
          teacher_id: empId,
          class_id: selectedClassId,
          section_id: selectedSectionId,
          subject_id: selectedSubjectId,
          due_date: selectedDate,
          description: assignmentDescription,
        };

        // adding optional params
        if (selectedFile) {
          params.file = selectedFile;
        }

        // calling api
        await this.props.addAssignment(params);
        const response = this.props.isAddAssignment;
        // processing response
        if (response) {
          const {success, message} = response;

          if (success === 1) {
            const refreshAssignmentsCallback = this.props.navigation.getParam(
              'refreshAssignmentsCallback',
              null,
            );

            if (refreshAssignmentsCallback) {
              // stopping loader
              this.setState({showProcessingLoader: false});

              // navigating back
              this.props.navigation.pop();

              // refreshing data
              await refreshAssignmentsCallback();

              // success toast
              showToast(message);
            }
          }
        } else {
          this.setState({showProcessingLoader: false});
          //Alert.alert('', response.message);
        }
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    let pickerItems = [
      <Picker.Item label="Select Class" value="Select Class" key={-1} />,
    ];

    if (this.classList) {
      pickerItems = [...pickerItems, ...this.classList];
    }

    const {selectedFile, showProcessingLoader} = this.state;
    let selectedFileName = 'Select File';
    if (selectedFile) {
      selectedFileName = selectedFile.name;
    }
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              backIcon={ic_back}
              title="Add Assignment"
              nav={this.props.navigation}
            />

            <ScrollView
              style={styles.addAssignmentSection}
              showsVerticalScrollIndicator={false}>
              <KeyboardAvoidingView behavior="padding">
                <View style={styles.addAssignmentButton}>
                  <Picker
                    selectedValue={this.state.selectedClassName}
                    onValueChange={this.onClassChange}>
                    {pickerItems}
                  </Picker>
                </View>

                {this.state.selectedClassId && (
                  <View style={styles.addAssignmentButton}>
                    <Picker
                      selectedValue={this.state.selectedSubjectName}
                      onValueChange={this.onSubjectChange}>
                      <Picker.Item
                        label="Select Subject"
                        value="Select Subject"
                      />
                      {this.subjectList}
                    </Picker>
                  </View>
                )}

                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  minimumDate={new Date()}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                />

                <TouchableOpacity
                  onPress={this._showDateTimePicker}
                  style={styles.dateButton}>
                  <Text>{this.state.selectedDate}</Text>
                  <Image
                    source={calendar}
                    resizeMode="cover"
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={this.handlePermissions}
                  style={styles.dateButton}>
                  <Text>{selectedFileName}</Text>
                  <Image
                    source={ic_upload_file}
                    resizeMode="cover"
                    style={styles.calendarIcon}
                  />
                </TouchableOpacity>

                <View style={styles.assignmentDescriptionContainer}>
                  <TextInput
                    value={this.state.assignmentDescription}
                    onChangeText={this.onDescriptionChange}
                    multiline={true}
                    maxLength={300}
                    placeholder="Description"
                    style={styles.assignmentDescription}
                  />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>

            <TouchableHighlight
              underlayColor="#77dd77"
              onPress={this.onSubmitPress}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableHighlight>
          </>
        )}
        {this.state.connectionState === false ? (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        ) : null}
        {showProcessingLoader && (
          <ProcessingLoader message="Uploading file..." />
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isGetTeacherClassDetails: teacherSelectors.isGetTeacherClassDetails(state),
  isGetSubjectDetails: teacherSelectors.isGetSubjectDetails(state),
  isAddAssignment: teacherSelectors.isAddAssignment(state),
});
const mapDispatchToProps = {
  getTeacherClassDetails: teacherOperations.getTeacherClassDetails,
  getSubjectDetails: teacherOperations.getSubjectDetails,
  addAssignment: teacherOperations.addAssignment,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddAssignmentScreen);
// export default class AddAssignmentScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLoading: true,
//       showProcessingLoader: false,

//       selectedClassId: null,
//       selectedSectionId: null,
//       selectedClassName: 'Select Class',

//       selectedSubjectId: null,
//       selectedSubjectName: null,

//       isDateTimePickerVisible: false,
//       selectedDate: 'Select Submission Date',

//       selectedFile: null,

//       assignmentDescription: '',
//     };
//   }

//   componentDidMount() {
//     this.fetchTeacherClassDetails();
//   }

//   fetchTeacherClassDetails = async () => {
//     try {
//       const response = await getTeacherClassDetails();

//       if (response.success === 1) {
//         this.classSectionData = response.classsec;
//         this.classList = this.classSectionData.map((item, index) => (
//           <Picker.Item label={item.name} value={item.name} key={index} />
//         ));

//         this.setState({isLoading: false});
//       } else if (response.success === 0) {
//         this.setState({isLoading: false});
//       }
//     } catch (error) {
//       const errMessage = error.message;
//       console.log(errMessage);
//     }
//   };

//   _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

//   _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

//   _handleDatePicked = date => {
//     const selectedDate =
//       date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

//     this.setState({selectedDate});
//     this._hideDateTimePicker();
//   };

//   onClassChange = async (itemValue, itemIndex) => {
//     try {
//       if (itemIndex === 0) {
//         this.setState({
//           // reset class-section
//           selectedClassName: itemValue,
//           selectedClassId: null,
//           selectedSectionId: null,
//         });
//       } else {
//         const selectedClassObj = this.classSectionData[itemIndex - 1];
//         const selectedClassId = selectedClassObj.class_id;
//         const selectedSectionId = selectedClassObj.section_id;

//         const response = await getSubjectDetails(
//           selectedClassId,
//           selectedSectionId,
//         );

//         if (response.success === 1) {
//           this.subjectsData = response.subject;
//           this.subjectList = this.subjectsData.map((item, index) => (
//             <Picker.Item
//               label={item.subname}
//               value={item.subname}
//               key={index}
//             />
//           ));

//           this.setState({
//             selectedClassName: itemValue,
//             selectedClassId,
//             selectedSectionId,
//           });
//         }
//       }

//       this.setState({
//         // reset subject
//         selectedSubjectName: 'Select Subject',
//         selectedSubjectId: null,
//       });
//     } catch (error) {
//       const errMessage = error.message;
//       console.log(errMessage);
//     }
//   };

//   onSubjectChange = (itemValue, itemIndex) => {
//     if (itemIndex === 0) {
//       this.setState({
//         selectedSubjectName: itemValue,
//         selectedSubjectId: null,
//       });
//     } else {
//       const selectedSubjectObj = this.subjectsData[itemIndex - 1];
//       const selectedSubjectId = selectedSubjectObj.sub_id;

//       this.setState({selectedSubjectName: itemValue, selectedSubjectId});
//     }
//   };

//   onDescriptionChange = changedText => {
//     this.setState({assignmentDescription: changedText});
//   };

//   handlePermissions = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

//         switch (result) {
//           case RESULTS.UNAVAILABLE:
//             console.log(
//               'This feature is not available (on this device / in this context)',
//             );
//             break;
//           case RESULTS.DENIED:
//             console.log(
//               'The permission has not been requested / is denied but requestable',
//             );
//             await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//             break;
//           case RESULTS.GRANTED:
//             // console.log("The permission is granted");
//             this.handleFilePick();
//             break;
//           case RESULTS.BLOCKED:
//             console.log('The permission is denied and not requestable anymore');
//             Alert.alert(
//               'Permission Blocked',
//               'Press OK and provide "Storage" permission in App Setting',
//               [
//                 {
//                   text: 'Cancel',
//                   style: 'cancel',
//                 },
//                 {
//                   text: 'OK',
//                   onPress: this.handleOpenSettings,
//                 },
//               ],
//               {cancelable: false},
//             );
//         }
//       } else if (Platform.OS === 'ios') {
//         this.handleFilePick();
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   handleOpenSettings = async () => {
//     try {
//       await openSettings();
//     } catch (error) {
//       console.log('cannot open settings', error);
//     }
//   };

//   handleFilePick = async () => {
//     try {
//       // Pick a single file
//       const response = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });

//       // console.log(response);
//       this.setState({selectedFile: response});
//     } catch (error) {
//       if (!DocumentPicker.isCancel(error)) {
//         console.log(error);
//       }
//     }
//   };

//   onSubmitPress = async () => {
//     try {
//       const {
//         selectedClassName,
//         selectedClassId,
//         selectedSectionId,
//         selectedSubjectId,
//         selectedSubjectName,
//         selectedDate,
//         selectedFile,
//         assignmentDescription,
//       } = this.state;

//       // validations
//       if (selectedClassName === 'Select Class') {
//         Alert.alert('', 'Please select class!', [{text: 'OK'}], {
//           cancelable: false,
//         });
//         return;
//       }

//       if (selectedSubjectName === 'Select Subject') {
//         Alert.alert('', 'Please select subject!', [{text: 'OK'}], {
//           cancelable: false,
//         });
//         return;
//       }

//       if (selectedDate === 'Select Submission Date') {
//         Alert.alert('', 'Please select submission date!', [{text: 'OK'}], {
//           cancelable: false,
//         });
//         return;
//       }

//       if (assignmentDescription.trim() === '') {
//         this.setState({assignmentDescription: ''});
//         Alert.alert('', 'Please enter description!', [{text: 'OK'}], {
//           cancelable: false,
//         });
//         return;
//       }

//       // starting loader
//       this.setState({showProcessingLoader: true});

//       // fetching active school from local storage
//       const activeSchool = await getActiveSchool();
//       if (!activeSchool) {
//         return;
//       }

//       // fetching empId from local storage
//       const userInfo = await getData();

//       if (userInfo) {
//         // preparing params
//         const name = `Assignment for ${selectedClassName}`;
//         const {empId} = userInfo;
//         const {idsprimeID} = activeSchool;

//         const params = {
//           name,
//           teacher_id: empId,
//           class_id: selectedClassId,
//           section_id: selectedSectionId,
//           subject_id: selectedSubjectId,
//           due_date: selectedDate,
//           description: assignmentDescription,
//           idsprimeID,
//         };

//         // adding optional params
//         if (selectedFile) {
//           params.file = selectedFile;
//         }

//         // calling api
//         const response = await makeRequest(
//           BASE_URL + 'addassignment',
//           params,
//           true,
//           false,
//         );

//         // processing response
//         if (response) {
//           const {success, message} = response;

//           if (success === 1) {
//             const refreshAssignmentsCallback = this.props.navigation.getParam(
//               'refreshAssignmentsCallback',
//               null,
//             );

//             if (refreshAssignmentsCallback) {
//               // stopping loader
//               this.setState({showProcessingLoader: false});

//               // navigating back
//               this.props.navigation.pop();

//               // refreshing data
//               await refreshAssignmentsCallback();

//               // success toast
//               showToast(message);
//             }
//           }
//         }
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   render() {
//     const {isLoading} = this.state;
//     if (isLoading) {
//       return <CustomLoader />;
//     }

//     let pickerItems = [
//       <Picker.Item label="Select Class" value="Select Class" key={-1} />,
//     ];

//     if (this.classList) {
//       pickerItems = [...pickerItems, ...this.classList];
//     }

//     const {selectedFile, showProcessingLoader} = this.state;

//     let selectedFileName = 'Select File';
//     if (selectedFile) {
//       selectedFileName = selectedFile.name;
//     }

//     return (
//       <SafeAreaView style={styles.container}>
//         <ScreenHeader
//           backIcon={ic_back}
//           title="Add Assignment"
//           nav={this.props.navigation}
//         />

//         <ScrollView
//           style={styles.addAssignmentSection}
//           showsVerticalScrollIndicator={false}>
//           <KeyboardAvoidingView behavior="padding">
//             <View style={styles.addAssignmentButton}>
//               <Picker
//                 selectedValue={this.state.selectedClassName}
//                 onValueChange={this.onClassChange}>
//                 {pickerItems}
//               </Picker>
//             </View>

//             {this.state.selectedClassId && (
//               <View style={styles.addAssignmentButton}>
//                 <Picker
//                   selectedValue={this.state.selectedSubjectName}
//                   onValueChange={this.onSubjectChange}>
//                   <Picker.Item label="Select Subject" value="Select Subject" />
//                   {this.subjectList}
//                 </Picker>
//               </View>
//             )}

//             <DateTimePicker
//               isVisible={this.state.isDateTimePickerVisible}
//               onConfirm={this._handleDatePicked}
//               onCancel={this._hideDateTimePicker}
//             />

//             <TouchableOpacity
//               onPress={this._showDateTimePicker}
//               style={styles.dateButton}>
//               <Text style={styles.dateText}>{this.state.selectedDate}</Text>
//               <Image
//                 source={calendar}
//                 resizeMode="cover"
//                 style={styles.calendarIcon}
//               />
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={this.handlePermissions}
//               style={styles.dateButton}>
//               <Text>{selectedFileName}</Text>
//               <Image
//                 source={ic_upload_file}
//                 resizeMode="cover"
//                 style={styles.calendarIcon}
//               />
//             </TouchableOpacity>

//             <View style={styles.assignmentDescriptionContainer}>
//               <TextInput
//                 value={this.state.assignmentDescription}
//                 onChangeText={this.onDescriptionChange}
//                 multiline={true}
//                 maxLength={300}
//                 placeholder="Description"
//                 style={styles.assignmentDescription}
//               />
//             </View>
//           </KeyboardAvoidingView>
//         </ScrollView>

//         <TouchableHighlight
//           underlayColor="#1ba2de"
//           onPress={this.onSubmitPress}
//           style={styles.submitButton}>
//           <Text style={styles.submitButtonText}>Submit</Text>
//         </TouchableHighlight>

//         {showProcessingLoader && (
//           <ProcessingLoader message="Uploading file..." />
//         )}
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   addAssignmentSection: {
//     flex: 1,
//     backgroundColor: '#f2f1f1',
//     marginHorizontal: wp(2),
//   },
//   addAssignmentButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // borderWidth: 1,
//     // borderColor: '#ccc',
//     borderRadius: 2,
//     padding: wp(2),
//     // marginTop: hp(3),
//     fontSize: wp(3),
//     backgroundColor: '#fff',
//     height: hp(6),
//   },
//   dateButton: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // borderBottomColor: '#ccc',
//     // borderBottomWidth: 1,
//     height: hp(6),
//     marginTop: hp(1),
//     paddingHorizontal: wp(1.5),
//     backgroundColor: '#fff',
//   },
//   dateText: {
//     fontSize: wp(3.5),
//     color: '#333',
//   },

//   calendarIcon: {
//     width: wp(5),
//     aspectRatio: 1 / 1,
//   },
//   submitButton: {
//     height: hp(6),
//     margin: wp(2),
//     backgroundColor: '#1ba2de',
//     borderRadius: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: wp(3.5),
//   },
//   assignmentDescriptionContainer: {
//     marginTop: hp(1),
//     marginBottom: hp(2),
//     // borderBottomWidth: 1,
//     // borderColor: '#ccc',
//     backgroundColor: '#fff',
//   },
//   assignmentDescription: {
//     height: hp(10),
//     color: '#333',
//   },
// });
