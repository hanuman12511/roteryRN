import React, {Component} from 'react';
import {View, Text, FlatList, TouchableHighlight} from 'react-native';
import {styles} from './styles';

// Components
import CustomLoader from 'components/CustomLoader';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class timeTableTeacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      timeTableInfo: null,
      status: null,
      connectionState: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchTeacherTimeTable();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchTeacherTimeTable = async () => {
    try {
      // fetching active school from local storage
      await this.props.adminTeacherTimetableList();
      const response = this.props.isAdminTeacherTimetableList;
      if (this.state.connectionState === true) {
        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {empList: timeTableInfo} = response;
            this.setState({timeTableInfo, status: null, isLoading: false});
          } else {
            const {message: status} = response;
            this.setState({status, timeTableInfo: null, isLoading: false});
          }
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleTimeTableDetail = teacherId => () => {
    const info = {userType: 'Teacher', teacherId};
    this.props.nav.push('AdminTimeTableDetail', {info});
  };

  renderItem = ({item, index}) => {
    const {emppId: teacherId, name, mobile} = item;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.handleTimeTableDetail(teacherId)}>
        <View style={styles.listItemContainer}>
          <Text style={[styles.listItemText, styles.flex1]}>{index + 1}</Text>
          <Text style={[styles.listItemText, styles.flex4]}>{name}</Text>
          <Text style={[styles.listItemText, styles.flex2]}>{mobile}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {timeTableInfo, status} = this.state;

    return (
      <View style={styles.container}>
        {this.state.connectionState && (
          <>
            {timeTableInfo ? (
              <View style={styles.contentContainer}>
                <View style={styles.header}>
                  <Text style={[styles.title, styles.flex1]}>S.No.</Text>
                  <Text style={[styles.title, styles.flex4]}>Name</Text>
                  <Text style={[styles.title, styles.flex2]}>Mobile No.</Text>
                </View>

                <FlatList
                  data={timeTableInfo}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  ItemSeparatorComponent={this.itemSeparator}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContentContainer}
                />
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
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isAdminTeacherTimetableList:
    adminSelectors.isAdminTeacherTimetableList(state),
});
const mapDispatchToProps = {
  adminTeacherTimetableList: adminOperations.adminTeacherTimetableList,
};
export default connect(mapStateToProps, mapDispatchToProps)(timeTableTeacher);
