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

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class TeacherTakeStudentPhoto extends Component {
  constructor(props) {
    super(props);
    const item = props.navigation.getParam('item');
    // this.classId = nav.getParam('classId', null);
    // this.sectionId = nav.getParam('sectionId', null);
    this.classId = item[4];
    this.sectionId = item[5];
    this.state = {
      isLoading: true,
      isUpdatingAttendance: false,
      studentsData: null,
    };

    this.presentStudents = new Set();
    this.absentStudents = new Set();
  }

  componentDidMount() {
    this.fetchStudentAttendanceList();
  }

  fetchStudentAttendanceList = async () => {
    try {
      // Preparing params
      const {navigation: nav} = this.props;

      // Calling API
      await this.props.getStudentAttendanceList(this.classId, this.sectionId);
      const response = this.props.isGetStudentAttendanceList;

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
              // this.props.navigation.push('StudentAbsent', {absentStudentsData});
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
        if (response.isAttendanceTaken) {
          // Pop current screen and Navigate to Absent screen
          if (response.absentStudents.length > 0) {
            const absentStudentsData = response.absentStudents;
            this.props.navigation.pop();
            // this.props.navigation.push('StudentAbsent', {absentStudentsData});
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
        await this.props.updateAdminStudentAttendance(
          this.classId,
          this.sectionId,
          presentStudents,
          absentStudents,
        );
        this.props.navigation.goBack();
        const response = this.props.isUpdateAdminStudentAttendance;
        console.log(response);
        // Stopping progress loader
        // this.setState({isUpdatingAttendance: false});
        if (response.success === 1) {
          // const {getParam, pop} = this.props.navigation;
          // const refreshAttendancePanel = getParam(
          //   'refreshAttendancePanel',
          //   null,
          // );
          // if (refreshAttendancePanel) {
          // Navigating back
          // pop();
          this.props.navigation.goBack();
          // Calling refreshing callback
          // refreshAttendancePanel();
          // Success Toast
          showToast(response.message);
          // }
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetStudentAttendanceList: adminSelectors.isGetStudentAttendanceList(state),
  isUpdateAdminStudentAttendance:
    adminSelectors.isUpdateAdminStudentAttendance(state),
});
const mapDispatchToProps = {
  getStudentAttendanceList: adminOperations.getStudentAttendanceList,
  updateAdminStudentAttendance: adminOperations.updateAdminStudentAttendance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherTakeStudentPhoto);
