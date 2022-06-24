import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import TeacherAttendanceItem from 'components/TeacherAttendanceItem';
import CustomLoader from 'components/CustomLoader';

// API
import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';

class TeacherAttendanceScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      attendanceData: null,
      isListRefreshing: false,
    };

    this.titleArr = [
      'Class Name',
      'Section Name',
      'Teacher Role',
      'Total Students',
      'Present Student',
      'Absent Student',
    ];
  }

  componentDidMount() {
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (this.isNextScreenPushed) {
          this.isNextScreenPushed = false;
          return;
        }

        this.fetchStudentAttendancePanel();
      },
    );
  }

  componentWillUnmount() {
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchStudentAttendancePanel = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.getStudentAttendancePanel();
      const response = this.props.isGetStudentAttendancePanel;

      if (response.success === 1) {
        const classes = response.classes;
        let attendanceData = [];

        for (const item of classes) {
          attendanceData.push({
            classId: item.classId,
            sectionId: item.sectionId,
            infoArr: [
              item.className,
              item.sectionName,
              item.role,
              item.totalstudent,
              item.present,
              item.absent,
            ],
          });
        }

        this.canTakeAttendance = response.canTakeAttendance;

        this.setState({
          attendanceData,
          isLoading: false,
          isListRefreshing: false,
        });
      } else {
        //Alert.alert('', response.message);
        this.setState({
          attendanceData: null,
          isLoading: false,
          isListRefreshing: false,
        });
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
      await this.fetchStudentAttendancePanel();
    } catch (error) {
      console.log(error.message);
    }
  };

  setNextScreenPushed = () => {
    this.isNextScreenPushed = true;
  };

  renderItem = ({item}) => (
    <TeacherAttendanceItem
      item={item}
      titleArr={this.titleArr}
      canTakeAttendance={this.canTakeAttendance}
      setNextScreenPushed={this.setNextScreenPushed}
      refreshAttendancePanel={this.fetchStudentAttendancePanel}
      navigation={this.props.navigation}
    />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return this.state.isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Attendance"
          showSchoolLogo
          nav={this.props.navigation}
        />

        <FlatList
          data={this.state.attendanceData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true} // for iOS only
          contentContainerStyle={styles.contentContainer}
          refreshing={this.state.isListRefreshing}
          onRefresh={this.handleListRefresh}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetStudentAttendancePanel:
    teacherSelectors.isGetStudentAttendancePanel(state),
});
const mapDispatchToProps = {
  getStudentAttendancePanel: teacherOperations.getStudentAttendancePanel,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherAttendanceScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  separator: {
    height: wp(2),
  },
  contentContainer: {
    padding: wp(2),
  },
});
