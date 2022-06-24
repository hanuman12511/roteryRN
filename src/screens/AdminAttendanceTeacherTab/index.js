import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  Alert,
} from 'react-native';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {styles} from './styles';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// Components
import CustomLoader from 'components/CustomLoader';
import ScreenHeader from 'components/ScreenHeader';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
class AdminAttendanceTeacherTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      attendanceTime: null,
      connectionState: true,
      tableData: null,
      status: null,
      isListRefreshing: false,
      tableHead: ['S.No.', 'Absent', 'Mobile No.'],
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchTeacherAttendance();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchTeacherAttendance = async () => {
    try {
      // fetching active school from local storage
      await this.props.getTeacherAttendance();
      const response = this.props.isGetTeacherAttendance;
      // processing response
      if (this.state.connectionState === true) {
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {output} = response;
            const {attendanceTime, teacherInfo} = output;
            const tableData = teacherInfo.map((teacher, index) => {
              const serialNo = `${index + 1}.`;
              const {name, mobile} = teacher;
              return [serialNo, name, mobile];
            });

            this.setState({
              attendanceTime,
              tableData,
              status: null,
              isLoading: false,
              isListRefreshing: false,
            });
          } else {
            const {message: status} = response;
            this.setState({
              status,
              attendanceTime: null,
              tableData: null,
              isLoading: false,
              isListRefreshing: false,
            });
          }
        } else {
          const {message: status} = response;
          this.setState({
            status,
            attendanceTime: null,
            tableData: null,
            isLoading: false,
            isListRefreshing: false,
          });
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handleListRefresh = () => {
    try {
      this.setState({isListRefreshing: true});
      this.fetchTeacherAttendance();
    } catch (error) {
      console.log('error while calling list refresh', error);
    }
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {attendanceTime, tableHead, widthArr, tableData, status} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Staff Attendance"
              showSchoolLogo
              nav={this.props.navigation}
            />
            {/* <View style={styles.absentReasonContainer}>
          <Text style={styles.teacherName}>
            Attendance Time - {attendanceTime}
          </Text>
        </View> */}

            {tableData ? (
              <View style={styles.contentContainer}>
                <Table borderStyle={{borderColor: 'transparent'}}>
                  <Row
                    data={tableHead}
                    widthArr={widthArr}
                    flexArr={[1, 3.8, 2]}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>

                <ScrollView
                  style={styles.dataWrapper}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.isListRefreshing}
                      onRefresh={this.handleListRefresh}
                    />
                  }>
                  <Table borderStyle={{borderColor: '#ccc'}}>
                    <TableWrapper style={styles.wrapper}>
                      <Rows
                        data={tableData}
                        flexArr={[1, 3.8, 2]}
                        style={styles.row}
                        textStyle={styles.text2}
                      />
                    </TableWrapper>
                  </Table>
                </ScrollView>
              </View>
            ) : (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{status}</Text>
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
  isGetTeacherAttendance: adminSelectors.isGetTeacherAttendance(state),
});
const mapDispatchToProps = {
  getTeacherAttendance: adminOperations.getTeacherAttendance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminAttendanceTeacherTab);
