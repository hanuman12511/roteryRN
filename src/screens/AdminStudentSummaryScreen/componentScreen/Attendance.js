import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import CustomLoader from 'components/CustomLoader';
// Images

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
class AttendanceScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isListRefreshing: false,
      infoArr: [],
      message: '',
    };
  }

  componentDidMount() {
    this.handleAttendanceData();
  }

  handleAttendanceData = async () => {
    try {
      this.setState({isLoading: true});
      const stId = this.props.stId;
      await this.props.getStudentAttendanceReport(stId);
      const response = this.props.isGetStudentAttendanceReport;
      if (response && response.success === 1) {
        const {attendancedetails} = response;

        this.setState({infoArr: attendancedetails, isLoading: false});
      } else {
        const {message} = response;
        this.setState({infoArr: null, isLoading: false, message});
      }
    } catch (error) {
      Alert.alert('', error);
    }
  };

  fetchStudentAttendance = () => {
    this.setState({isListRefreshing: false});
  };

  handleListRefresh = () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.fetchStudentAttendance();
    } catch (error) {
      console.log(error.message);
    }
  };
  itemSeprator = () => <View style={{height: wp(2)}} />;
  renderItem = ({item}) => {
    return (
      <View style={styles.bodyHeaderContainer}>
        <View style={styles.monthStyle}>
          <Text style={styles.textStyle1}>{item.month}</Text>
        </View>

        <View style={styles.secondContainer}>
          <View style={{flex: 1}}>
            <Text style={styles.textStyle2}>{item.present}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textStyle3}>{item.absent}</Text>
          </View>
          {/* <Text style={styles.textStyle4}>{item.leave}</Text> */}
        </View>
      </View>
    );
  };
  keyExtractor = (item, index) => item.id;
  keyExtractor2 = (item, index) => item.id;
  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }
    this.state.infoArr.forEach(item => {});
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.bodyHeaderContainer}>
          <View style={styles.monthStyle}></View>
          <View style={styles.secondContainer}>
            <Text style={styles.textStyle}>Present</Text>
            <Text style={styles.textStyle}>Absent</Text>
            {/* <Text style={styles.textStyle}>Leave</Text> */}
          </View>
        </View>
        {this.state.infoArr ? (
          <View>
            <FlatList
              data={this.state.infoArr}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.itemSeprator}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
              refreshing={this.state.isListRefreshing}
              onRefresh={this.handleListRefresh}
            />
          </View>
        ) : (
          <View>
            <Text>no data available</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetStudentAttendanceReport:
    adminSelectors.isGetStudentAttendanceReport(state),
});
const mapDispatchToProps = {
  getStudentAttendanceReport: adminOperations.getStudentAttendanceReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(2.5),
  },
  bodyHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthStyle: {
    flex: 1,
  },
  secondContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  Spacecontainer: {
    flex: 4,
  },
  textStyle: {
    flex: 1,
    textAlign: 'center',
  },
  textStyle2: {
    textAlign: 'center',
    backgroundColor: '#16701520',
    padding: wp(1),
    paddingHorizontal: wp(4),
    alignSelf: 'center',
    color: '#065605',
    borderColor: '#16701550',
    borderWidth: 1,
    width: wp(15),
  },
  textStyle3: {
    textAlign: 'center',
    color: '#6c1414',
    backgroundColor: '#6c141420',
    padding: wp(1),
    paddingHorizontal: wp(4),
    alignSelf: 'center',
    borderColor: '#6c141450',
    borderWidth: 1,
    width: wp(15),
  },
  textStyle4: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#FF6700',
    borderRadius: 100,
  },
  textStyle1: {
    flex: 1,
    textAlign: 'left',
    fontSize: wp(3.2),
    fontWeight: '400',
    textTransform: 'uppercase',
    textAlignVertical: 'center',
  },
  listContentContainer: {
    paddingTop: wp(2),
  },
});
