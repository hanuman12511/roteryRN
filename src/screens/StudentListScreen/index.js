import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {styles} from './styles';

// Components
import StudentListItem from 'components/StudentListItem';
import CustomLoader from 'components/CustomLoader';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

class StudentListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      students: null,
      isListRefreshing: false,
      connectionState: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchStudentInfo();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchStudentInfo = async () => {
    try {
      await this.props.getStudentInfo();
      const response = this.props.isUserInfoGet;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          this.setState({
            students: response.students,
            isLoading: false,
            isListRefreshing: false,
          });
        } else {
          this.setState({isListRefreshing: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchStudentInfo();
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item}) => (
    <StudentListItem item={item} navigation={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return this.state.isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <View style={styles.headerContainer}>
              <Text style={styles.headerContent}>Student List</Text>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={this.state.students}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.itemSeparator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContentContainer}
                refreshing={this.state.isListRefreshing}
                onRefresh={this.handleListRefresh}
              />
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
  isUserInfoGet: studentSelectors.isUserInfoGet(state),
});

const mapDispatchToProps = {
  getStudentInfo: studentOperations.getStudentInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentListScreen);
