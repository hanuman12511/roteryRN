import React, {Component} from 'react';
import {Text, View, Alert, FlatList} from 'react-native';

import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import StudentAssignmentItem from 'components/StudentAssignmentItem';
import CustomLoader from 'components/CustomLoader';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

class StudentAssignmentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      infoArr: null,
      status: null,
      isListRefreshing: false,
      connectionState: true,
    };

    this.titleArr = [
      'Subject',
      'Add On',
      'Submission Date',
      'Description',
      'Given By',
    ];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchAssignments();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchAssignments = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.getStudentAssignment();
      const response = this.props.isGetStudentAssignment;
      if (this.state.connectionState === true) {
        if (response !== null) {
          if (response.success === 1) {
            const assignments = response.output;
            let infoArr = [];

            for (const assignment of assignments) {
              infoArr.push({
                info: [
                  assignment.subject,
                  assignment.created,
                  assignment.end_date,
                  assignment.description,
                  assignment.teacherName,
                ],
                file: assignment.file,
              });
            }

            this.setState({infoArr, isLoading: false, isListRefreshing: false});
          } else if (response.success === 0) {
            const status = response.message;
            //Alert.alert('', response.message);
            this.setState({
              status,
              infoArr: null,
              isLoading: false,
              isListRefreshing: false,
            });
          }
        } else {
          const status = 'Server Issues';
          //Alert.alert('', response.message);
          this.setState({
            status,
            infoArr: null,
            isLoading: false,
            isListRefreshing: false,
          });
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  renderItem = ({item}) => (
    <StudentAssignmentItem titleArr={this.titleArr} item={item} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchAssignments();
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
              title="Homework"
              showSchoolLogo
              nav={this.props.navigation}
            />
            {this.state.infoArr === null ? (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{this.state.status}</Text>
              </View>
            ) : (
              <FlatList
                data={this.state.infoArr}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.itemSeparator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContentContainer}
                refreshing={this.state.isListRefreshing}
                onRefresh={this.handleListRefresh}
              />
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
  isGetStudentAssignment: studentSelectors.isGetStudentAssignment(state),
});
const mapDispatchToProps = {
  getStudentAssignment: studentOperations.getStudentAssignment,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentAssignmentScreen);
