import React, {Component} from 'react';
import {View, Text, FlatList, TouchableHighlight} from 'react-native';
import {styles} from './styles';

// Components
import CustomLoader from 'components/CustomLoader';

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
class AdminTimeTableStudentScreen extends Component {
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
    this.fetchStudentTimeTable();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchStudentTimeTable = async () => {
    try {
      await this.props.adminClassTimetableList();
      const response = this.props.isAdminClassTimetableList;
      if (this.state.connectionState === true) {
        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {output: timeTableInfo} = response;
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

  handleTimeTableDetail = (classId, sectionId) => () => {
    const info = {userType: 'ClassSection', classId, sectionId};
    this.props.nav.push('AdminTimeTableDetail', {info});
  };

  renderItem = ({item, index}) => {
    const {classId, sectionId, class: classSection} = item;
    const schoolClassSection = classSection.split('-');
    const [schoolClass, schoolSection] = schoolClassSection;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.handleTimeTableDetail(classId, sectionId)}>
        <View style={styles.listItemContainer}>
          <Text style={[styles.listItemText, styles.flex1]}>{index + 1}</Text>
          <Text style={[styles.listItemText, styles.flex4]}>{schoolClass}</Text>
          <Text style={[styles.listItemText, styles.flex2]}>
            {schoolSection}
          </Text>
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
                  <Text style={[styles.title, styles.flex4]}>Class</Text>
                  <Text style={[styles.title, styles.flex2]}>Section</Text>
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
  isAdminClassTimetableList: adminSelectors.isAdminClassTimetableList(state),
});
const mapDispatchToProps = {
  adminClassTimetableList: adminOperations.adminClassTimetableList,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminTimeTableStudentScreen);
