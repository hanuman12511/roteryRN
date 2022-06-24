import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomCalendar from 'components/CustomCalendar';
import CustomLoader from 'components/CustomLoader';
import ProcessingLoader from 'components/ProcessingLoader';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';
class AttendanceScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      showProcessingLoader: false,
      reload: true,
      connectionState: true,
      attendanceStatus: null,
      holidays: null,
      sessionStartDate: null,
      visibleDate: null,
      currentDate: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        // starting loader
        this.setState({isLoading: true});

        this.fetchAttendanceDetail();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchAttendanceDetail = async (yearMonth = '') => {
    try {
      this.setState({showProcessingLoader: true});
      // calling api
      await this.props.getAttendanceDetail(yearMonth);
      const response = this.props.isGetAttendanceDetail;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          const attendanceStatus = response.attendanceStatus;
          const holidays = response.holidays;
          const sessionStartDate = response.sessionStartDate;
          const currentDate = response.currentDate;

          this.setState({
            attendanceStatus,
            holidays,
            sessionStartDate,
            visibleDate: yearMonth,
            currentDate,
          });

          if (this.state.isLoading) {
            const visibleDate = response.currentDate;
            this.setState({visibleDate, isLoading: false});
          }
          this.setState({isLoading: false, showProcessingLoader: false});
        } else {
          //Alert.alert('', response.message);
          this.setState({isLoading: false, showProcessingLoader: false});
        }
      } else {
        this.setState({isLoading: false, showProcessingLoader: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  reloadComponent = () => {
    this.setState({reload: !this.state.reload});
  };

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }

    const {
      P: presentDates,
      A: absentDates,
      month: monthStates,
      year: yearStates,
    } = this.state.attendanceStatus;

    const {holidays} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Attendance"
              showSchoolLogo
              nav={this.props.navigation}
            />

            <View style={styles.calendarContainer}>
              <CustomCalendar
                presentDates={presentDates}
                absentDates={absentDates}
                holidayDates={holidays}
                sessionStartDate={this.state.sessionStartDate}
                visibleDate={this.state.visibleDate}
                currentDate={this.state.currentDate}
                fetchAttendanceDetail={this.fetchAttendanceDetail}
                reloadComponent={this.reloadComponent}
              />
            </View>

            <View style={styles.monthlyAttendance}>
              {/* <Text style={styles.totalDays}>
							{'Total\n' + monthStates.workingDays}
						</Text> */}
              <Text style={styles.holiday}>
                {'Holiday\n' + monthStates.holidays}
              </Text>
              <Text style={styles.present}>
                {'Present\n' + monthStates.present}
              </Text>
              <Text style={styles.absent}>
                {'Absent\n' + monthStates.absent}
              </Text>
            </View>

            <Text style={styles.yearlyAttendanceHeading}>
              Till Date Year Attendance
            </Text>

            <View style={styles.yearlyAttendance}>
              {/* <Text style={styles.yearlyAttendanceContent}>
							{'Total\n' + yearStates.totalDays}
						</Text> */}
              <Text style={styles.yearlyAttendanceContent}>
                {'Holiday\n' + yearStates.holidays}
              </Text>
              <Text style={styles.yearlyAttendanceContent}>
                {'Present\n' + yearStates.present}
              </Text>
              <Text style={styles.yearlyAttendanceContent}>
                {'Absent\n' + yearStates.absent}
              </Text>
            </View>
          </>
        )}
        {this.state.connectionState === false ? (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        ) : null}
        {this.state.showProcessingLoader && (
          <ProcessingLoader message="Checking Attendance" />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetAttendanceDetail: studentSelectors.isGetAttendanceDetail(state),
});
const mapDispatchToProps = {
  getAttendanceDetail: studentOperations.getAttendanceDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceScreen);
