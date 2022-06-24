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
import StudentAttendanceItem from 'components/StudentAttendanceItem';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// Icons
import ic_back from 'assets/icons/ic_back.png';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';

class TeacherTakeStudentPhoto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isUpdatingAttendance: false,
      studentsData: null,
      connectionState: true,
    };

    this.presentStudents = new Set();
    this.absentStudents = new Set();
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchStudentAttendanceList();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchStudentAttendanceList = async () => {
    try {
      // Preparing params
      const {navigation: nav} = this.props;
      this.classId = nav.getParam('classId', null);
      this.sectionId = nav.getParam('sectionId', null);

      // Calling API
      await this.props.getStudentAttendanceList(this.classId, this.sectionId);
      const response = this.props.isGetStudentAttendanceList;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          if (response.is_attendance_updatable) {
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

            this.setState({studentsData, isLoading: false});
          } else {
            if (response.isAttendanceTaken) {
              // Pop current screen and Navigate to Absent screen
              if (response.absentStudents.length > 0) {
                const absentStudentsData = response.absentStudents;
                this.props.navigation.pop();
                this.props.navigation.push('StudentAbsent', {
                  absentStudentsData,
                });
              } else {
                // Pop current screen and show Attendance not taken toast
                this.props.navigation.pop();
                showToast(response.message);
              }
            } else {
              // Pop current screen and show Attendance not taken toast
              this.props.navigation.pop();
              showToast(response.message);
            }
          }
        } else {
          //Alert.alert('', response.message);
          if (response.isAttendanceTaken) {
            // Pop current screen and Navigate to Absent screen
            if (response.absentStudents.length > 0) {
              const absentStudentsData = response.absentStudents;
              this.props.navigation.pop();
              this.props.navigation.push('StudentAbsent', {absentStudentsData});
            } else {
              // Pop current screen and show Attendance not taken toast
              this.props.navigation.pop();
              showToast(response.message);
            }
          } else {
            // Pop current screen and show Attendance not taken toast
            this.props.navigation.pop();
            showToast(response.message);
          }
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

  renderItem = ({item}) => (
    <StudentAttendanceItem
      item={item}
      handleMarkAttendance={this.handleMarkAttendance}
    />
  );

  keyExtractor = (item, index) => item.student_id.toString();

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
          showToast(response.message);
        }
      }
    } catch (error) {
      Alert.alert('', error);
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
              backIcon={ic_back}
              title="Take Attendance"
              nav={this.props.navigation}
            />
            <View style={styles.listHeader}>
              <Text style={styles.listHeaderItem1}>For Absent</Text>
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
              extraData={this.state}
            />
            <TouchableHighlight
              onPress={this.handleAttendanceUpdate}
              style={styles.attendanceBtn}>
              <Text style={styles.attendanceBtnText}>Update Attendance</Text>
            </TouchableHighlight>
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
  isGetStudentAttendanceList:
    teacherSelectors.isGetStudentAttendanceList(state),
  isUpdateStudentAttendance: teacherSelectors.isUpdateStudentAttendance(state),
});
const mapDispatchToProps = {
  getStudentAttendanceList: teacherOperations.getStudentAttendanceList,
  updateStudentAttendance: teacherOperations.updateStudentAttendance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherTakeStudentPhoto);
