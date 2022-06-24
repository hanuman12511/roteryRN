import React, {Component} from 'react';
import {View, Alert, Text, ScrollView} from 'react-native';

import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import PeriodListComponent from 'components/PeriodListComponent';
import PeriodLectureContainerComponent from 'components/PeriodLectureContainerComponent';
import CustomLoader from 'components/CustomLoader';

// Icons
import ic_back from 'assets/icons/ic_back.png';

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
class AdminTimeTableDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      timeTableData: null,
      connectionState: true,
    };
  }

  componentDidMount() {
    this.fetchTimeTableDetail();
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchTimeTableDetail = async () => {
    try {
      // fetching navigation params
      const info = this.props.navigation.getParam('info', null);
      if (!info) {
        return;
      }

      await this.props.adminTimeTableDetails(info);
      const response = this.props.isAdminTimeTableDetails;
      if (this.state.connectionState === true) {
        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {timeTable: timeTableData} = response;
            this.setState({timeTableData, isLoading: false});
          } else {
            //Alert.alert('', response.message);
            this.setState({timeTableData: null, isLoading: false});
          }
        } else {
          //Alert.alert('', response.message);
          this.setState({timeTableData: null, isLoading: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }

    const {timeTableData} = this.state;
    const breakPosition = timeTableData.break;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Time Table"
              backIcon={ic_back}
              nav={this.props.navigation}
            />

            <View style={styles.timeTableSection}>
              <View style={styles.leftPart}>
                <View style={styles.leftPartHeader}>
                  <Text style={styles.leftPartHeaderContent}>Period</Text>
                </View>

                <PeriodListComponent breakPosition={breakPosition} />
              </View>

              <View style={styles.rightPart}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
  isAdminTimeTableDetails: adminSelectors.isAdminTimeTableDetails(state),
});
const mapDispatchToProps = {
  adminTimeTableDetails: adminOperations.adminTimeTableDetails,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminTimeTableDetailScreen);
