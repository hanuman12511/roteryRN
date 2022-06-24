import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import TakePhotoItem from 'components/TakePhotoItem';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// popup container
import PhotoPopup from './PhotoPopup';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

// API
import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';

class StudentAttendanceScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: '',
      dataPhoto: '',
      isLoading: true,
      isListRefreshing: false,
      isUpdatingAttendance: false,
      studentsData: null,
      showFilterPopup: false,
      connectionState: true,
    };

    this.presentStudents = new Set();
    this.absentStudents = new Set();
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        // if (this.isNextScreenPushed) {
        //   this.isNextScreenPushed = false;
        //   return;
        // }

        this.fetchStudentAttendanceList();
      },
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription;
  }
  fetchStudentAttendanceList = async () => {
    try {
      // Preparing params
      const {navigation: nav} = this.props;
      this.classId = nav.getParam('classId', null);
      this.sectionId = nav.getParam('sectionId', null);
      // this.classId = 22;
      // this.sectionId = 13;

      // Calling API
      await this.props.getStudentList(this.classId, this.sectionId);
      const response = this.props.isGetStudentList;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          // if (response.is_attendance_updatable) {
          const studentsData = response.students;

          // Processing studentsData for present/absent list if attendance taken
          if (response.isAttendanceTaken) {
            studentsData.forEach(item => {
              item.attendence_status === 'P'
                ? this.presentStudents.add(item.student_id)
                : this.absentStudents.add(item.student_id);
            });
          } else {
            // Processing studentsData for present list if attendance not taken
            studentsData.forEach(item => {
              this.presentStudents.add(item.student_id);
            });
          }

          this.setState({
            studentsData,
            isLoading: false,
            isListRefreshing: false,
          });
          // } else {
          //   if (response.isAttendanceTaken) {
          //     // Pop current screen and Navigate to Absent screen
          //     const absentStudentsData = response.absentStudents;
          //     this.setState({isLoading: false});
          //     // this.props.navigation.pop();
          //     this.props.navigation.push('StudentAbsent', {absentStudentsData});
          //   } else {
          //     // Pop current screen and show Attendance not taken toast
          //     // this.props.navigation.pop();
          //     // showToast(response.message);
          //     showToast('Image Not Taken');
          //     this.setState({isLoading: false});
          //   }
          // }
        } else {
          this.setState({isLoading: false, isListRefreshing: false});
          //Alert.alert('', response.message);
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handleMarkAttendance = (isAbsent, studentId) => {
    if (isAbsent) {
      // If absent, delete from present and add to absent Set
      this.presentStudents.delete(studentId);
      this.absentStudents.add(studentId);
    } else {
      // If present, delete from absent and add to present Set
      this.absentStudents.delete(studentId);
      this.presentStudents.add(studentId);
    }
  };

  renderItem = ({item}) => {
    return (
      <TakePhotoItem
        item={item}
        handleMarkAttendance={this.handleMarkAttendance}
        handleSend={this.handleSend}
        nav={this.props.navigation}
      />
    );
  };
  handleSend = data => {
    // console.log('data', data);
    this.setState({showFilterPopup: true, dataPhoto: data});
  };
  closePopup2 = () => {
    this.setState({showFilterPopup: false});
  };
  // keyExtractor = (item, index) => item.student_id.toString();
  keyExtractor = (item, index) => item.id;

  itemSeparator = () => <View style={styles.separator} />;

  handleAttendanceUpdate = async () => {
    try {
      if (this.classId && this.sectionId) {
        // Starting progress loader
        this.setState({isUpdatingAttendance: true});

        // Converting Set to Array then, comma separated string
        const presentStudents = [...this.presentStudents].join();
        const absentStudents = [...this.absentStudents].join();

        // Calling API
        await this.props.updateStudentAttendance(
          this.classId,
          this.sectionId,
          presentStudents,
          absentStudents,
        );
        const response = this.props.isUpdateStudentAttendance;

        // Stopping progress loader
        this.setState({isUpdatingAttendance: false});

        if (response.success === 1) {
          const {getParam, pop} = this.props.navigation;
          const refreshAttendancePanel = getParam(
            'refreshAttendancePanel',
            null,
          );

          if (refreshAttendancePanel) {
            // Navigating back
            pop();

            // Calling refreshing callback
            refreshAttendancePanel();

            // Success Toast
            showToast(response.message);
          }
        } else {
          showToast('Unable to update attendance! Try Again!');
        }
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchStudentAttendanceList();
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    return this.state.isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Take Student Photo"
              nav={this.props.navigation}
            />
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderItem1}>Photo</Text>
              <Text style={styles.listHeaderItem2}>Enroll No</Text>
              <Text style={styles.listHeaderItem3}>Name</Text>
              {/* <Text style={styles.listHeaderItem3}>Image</Text> */}
            </View>
            <FlatList
              data={this.state.studentsData}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.itemSeparator}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={true} // for iOS only
              contentContainerStyle={styles.contentContainer}
              maxToRenderPerBatch={5}
              initialNumToRender={5}
              removeClippedSubviews={true}
              updateCellsBatchingPeriod={25}
              refreshing={this.state.isListRefreshing}
              onRefresh={this.handleListRefresh}
            />
            {/* <TouchableHighlight
          onPress={this.handleAttendanceUpdate}
          style={styles.attendanceBtn}>
          <Text style={styles.attendanceBtnText}>Update Image</Text>
        </TouchableHighlight> */}
            {this.state.showFilterPopup && (
              <PhotoPopup
                closePopup={this.closePopup2}
                nav={this.props.navigation}
                photo={this.state.dataPhoto}
              />
            )}
            {this.state.isUpdatingAttendance && (
              <View style={styles.progressLoader}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}
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
  // isGetStudentAttendanceList:
  // teacherSelectors.isGetStudentAttendanceList(state),
  isGetStudentList: teacherSelectors.isGetStudentList(state),
  isUpdateStudentAttendance: teacherSelectors.isUpdateStudentAttendance(state),
});
const mapDispatchToProps = {
  // getStudentAttendanceList: teacherOperations.getStudentAttendanceList,
  getStudentList: teacherOperations.getStudentList,
  updateStudentAttendance: teacherOperations.updateStudentAttendance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentAttendanceScreen);
