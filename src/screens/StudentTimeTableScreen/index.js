import React, {Component} from 'react';
import {View, Alert, Text, ScrollView, RefreshControl} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import PeriodListComponent from 'components/PeriodListComponent';
import PeriodLectureContainerComponent from 'components/PeriodLectureContainerComponent';
import CustomLoader from 'components/CustomLoader';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

class StudentTimeTableScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      timeTableData: null,
      isListRefreshing: false,
      connectionState: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchTimeTable();
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchTimeTable();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchTimeTable = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.getTimeTable();
      const response = this.props.isGetTimeTable;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          const timeTableData = response.timeTable;

          this.setState({
            timeTableData,
            isLoading: false,
            isListRefreshing: false,
          });
          // if (timeTableData.monday[1] === '-') {
          //   Alert.alert('', 'No data Present in time table');
          // }
        } else {
          this.setState({isLoading: false, isListRefreshing: false});
          Alert.alert('', response.message);
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert('', error);
    }
  };
  handleListRefresh = () => {
    this.setState({isListRefreshing: true});
    this.fetchTimeTable();
  };
  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }

    const {timeTableData} = this.state;
    if (timeTableData !== null && timeTableData.break !== undefined) {
      var breakPosition = timeTableData.break;
    }

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Time Table"
              showSchoolLogo
              nav={this.props.navigation}
            />
            {timeTableData !== null ? (
              <View style={styles.timeTableSection}>
                <View style={styles.leftPart}>
                  <View style={styles.leftPartHeader}>
                    <Text style={styles.leftPartHeaderContent}>Period</Text>
                  </View>

                  <PeriodListComponent breakPosition={breakPosition} />
                </View>

                <View style={styles.rightPart}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isListRefreshing}
                        onRefresh={this.handleListRefresh}
                      />
                    }>
                    <View>
                      <View style={styles.rightPartHeader}>
                        <View style={styles.dayBoxBorder}>
                          <Text style={styles.dayBox}>Monday</Text>
                        </View>

                        <View style={styles.dayBoxBorder}>
                          <Text style={styles.dayBox}>Tuesday</Text>
                        </View>

                        <View style={styles.dayBoxBorder}>
                          <Text style={styles.dayBox}>Wednesday</Text>
                        </View>

                        <View style={styles.dayBoxBorder}>
                          <Text style={styles.dayBox}>Thursday</Text>
                        </View>

                        <View style={styles.dayBoxBorder}>
                          <Text style={styles.dayBox}>Friday</Text>
                        </View>

                        <View>
                          <Text style={styles.dayBox}>Saturday</Text>
                        </View>
                      </View>

                      <PeriodLectureContainerComponent
                        timeTableData={timeTableData}
                        breakPosition={breakPosition}
                      />
                    </View>
                  </ScrollView>
                </View>
              </View>
            ) : (
              <View style={styles.errMsg}>
                <Text>No Data</Text>
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
  isGetTimeTable: studentSelectors.isGetTimeTable(state),
});
const mapDispatchToProps = {
  getTimeTable: studentOperations.getTimeTable,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentTimeTableScreen);
