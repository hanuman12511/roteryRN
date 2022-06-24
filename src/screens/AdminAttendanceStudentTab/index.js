import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {styles} from './styles';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Cell,
} from 'react-native-table-component';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';

//gif
import offline from 'assets/icons/internetConnectionState.gif';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Components
import CustomLoader from 'components/CustomLoader';
import ScreenHeader from 'components/ScreenHeader';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class studentAbsent extends Component {
  constructor(props) {
    super(props);
    this.navi = props.navigation;
    this.state = {
      isLoading: true,
      totalStudents: null,
      totalAbsentStudents: null,
      connectionState: true,
      tableData: null,
      status: null,

      tableHead: ['S.No.', 'Class', 'Total', 'Absent'],
    };
  }
  UNSAFE_componentWillMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.didFocusSubscription = this.navi.addListener('didFocus', () => {
      this.fetchStudentAttendance();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription;
  }

  fetchStudentAttendance = async () => {
    try {
      // processing response
      await this.props.getStudentAttendance();
      const response = this.props.isGetStudentAttendance;
      if (this.state.connectionState === true) {
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {output} = response;
            const {totalStudents, totalAbsentStudents, classInfo} = output;
            const tableData = classInfo.map((student, index) => {
              var serialNo = `${index + 1}.`;
              var {
                class: studentClass,
                totalStudent,
                totalPresent,
                totalAbsent,
                class_id,
                section_id,
              } = student;
              return [
                (serialNo = serialNo),
                (studentClass = studentClass),
                (totalStudent = totalStudent),
                (totalAbsent = totalAbsent),
                (class_id = class_id),
                (section_id = section_id),
              ];
            });
            // console.log('Student', tableData, totalStudents, totalAbsentStudents);
            this.setState({
              totalStudents,
              totalAbsentStudents,
              tableData,
              status: null,
              isLoading: false,
            });
          } else {
            const {message: status} = response;
            this.setState({
              status,
              totalStudents: null,
              totalAbsentStudents: null,
              tableData: null,
              isLoading: false,
            });
          }
        } else {
          const {message: status} = response;
          this.setState({
            status,
            totalStudents: null,
            totalAbsentStudents: null,
            tableData: null,
            isLoading: false,
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

  onPressRowSelect = data => {
    console.log('data when select', data);
  };

  itemSeparator2 = () => <View style={{height: wp(2), background: '#000'}} />;

  renderItem = ({item, index}) => {
    const onSchoolNamePress = () => {
      console.log('==', item);
      this.props.navigation.navigate('AdminTakeAttendance', {item});
    };
    const onAbsentDataPress = () => {
      if (item[3] !== 0) {
        console.log('==', item[3] !== 0);
        this.props.navigation.navigate('AbsentStudentReport', {data: item});
      }
    };

    const renderItemItem = ({item, index}) => {
      return (
        <View>
          {index === 1 ? (
            <TouchableOpacity
              onPress={() => onSchoolNamePress(item, index)}
              style={{width: wp(50)}}>
              <Text
                style={index === 1 ? {fontWeight: '700', width: wp(50)} : null}>
                {item}
              </Text>
            </TouchableOpacity>
          ) : index === 2 ? (
            <Text style={index === 2 ? {width: wp(19)} : null}>{item}</Text>
          ) : index === 3 ? (
            <TouchableOpacity onPress={() => onAbsentDataPress(item, index)}>
              <Text
                style={index === 3 ? {fontWeight: '700', width: wp(19)} : null}>
                {item}
              </Text>
            </TouchableOpacity>
          ) : index === 0 ? (
            <Text
              style={{
                width: wp(12),
                textAlign: 'left',
                paddingLeft: 5,
                paddingTop: -5,
              }}>
              {item}
            </Text>
          ) : null}
        </View>
      );
    };

    return (
      <View style={styles.schoolStyle}>
        <FlatList
          data={item}
          renderItem={renderItemItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator2}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop: wp(2)}}
        />
      </View>
    );
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {totalStudents, totalAbsentStudents, tableHead, tableData, status} =
      this.state;
    const widthArr = [wp(12), wp(50), wp(19), wp(19)];
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Student Attendance"
              showSchoolLogo
              nav={this.props.navigation}
            />
            <View style={styles.absentReasonContainer}>
              <Text style={styles.teacherName}>
                Total Students: {totalStudents}
              </Text>
              <Text style={styles.teacherName}>
                Total Absent: {totalAbsentStudents}
              </Text>
            </View>

            {tableData ? (
              <View style={styles.contentContainer}>
                <Table borderStyle={{borderColor: 'transparent'}}>
                  <Row
                    data={tableHead}
                    widthArr={widthArr}
                    // flexArr={[1, 2, 1, 1]}
                    style={styles.header}
                    textStyle={styles.text}
                  />
                </Table>

                <View style={{flex: 1, width: '100%'}}>
                  <FlatList
                    data={tableData}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    ItemSeparatorComponent={this.itemSeparator}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingTop: wp(2)}}
                    refreshing={this.state.isListRefreshing}
                    onRefresh={this.handleListRefresh}
                  />
                </View>
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
  isGetStudentAttendance: adminSelectors.isGetStudentAttendance(state),
});
const mapDispatchToProps = {
  getStudentAttendance: adminOperations.getStudentAttendance,
};

export default connect(mapStateToProps, mapDispatchToProps)(studentAbsent);
