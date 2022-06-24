import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// Components
import ScreenHeader from 'components/ScreenHeader';
import AdminHomeworkComponent from './AdminHomeworkComponent';
import CustomLoader from 'components/CustomLoader';
// Icons
import ic_search_black from 'assets/icons/ic_search_black.png';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class AdminHomeworkScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      infoArr1: [],
      infoArr2: [],
      isLoading: false,
      connectionState: true,
      infoArr: null,
      status: null,
      isListRefreshing: false,
    };

    this.titleArr = [
      'Subject',
      'Submission Date',
      'Description',
      'Class',
      'Given By',
      'Section Name',
    ];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.fetchAssignments();
    // this.didFocusSubscription = this.props.navigation.addListener(
    //   'didFocus',
    //   () => {
    //     this.fetchAssignments();
    //   },
    // );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    // this.didFocusSubscription.remove();
  }

  fetchAssignments = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.adminGetHomework();
      const response = this.props.isAdminGetHomework;
      if (this.state.connectionState === true) {
        if (response !== null) {
          if (response.success === 1) {
            const assignments = response.output;
            // let infoArr = [];

            // for (const assignment of assignments) {
            //   infoArr.push({
            //     info: [
            //       assignment.subject,
            //       assignment.end_date,
            //       assignment.description,
            //     ],
            //     file: assignment.file,
            //   });
            // }

            this.setState({
              infoArr: assignments,
              infoArr2: assignments,
              isLoading: false,
              isListRefreshing: false,
            });
          } else if (response.success === 0) {
            const status = response.message;
            this.setState({
              status,
              infoArr: null,
              isLoading: false,
              isListRefreshing: false,
            });
          }
        } else {
          const status = response.message;

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

  handleSearch = searchText => {
    this.setState({searchText});
    const searchTextLength = searchText.length;
    const foodProducts = this.state.infoArr2;
    if (searchTextLength === 0 || searchTextLength >= 1) {
      const filteredData = this.state.infoArr.filter(item => {
        const searchPattern = searchText;
        // const searchPattern = searchText;
        const {classname, givenby, subject} = item;
        let data = classname;
        let data2 = givenby;
        let data3 = subject;
        let found = data.indexOf(searchPattern) > -1;
        let found1 = data2.indexOf(searchPattern) > -1;
        let found2 = data3.indexOf(searchPattern) > -1;

        let {selected} = item;
        selected = false;

        if (!found || !found1 || !found2) {
          const {classname, givenby, subject} = item;
          data = classname;
          data2 = givenby;
          data3 = subject;
          found = data.indexOf(searchText) > -1;
          found1 = data2.indexOf(searchText) > -1;
          found2 = data3.indexOf(searchText) > -1;
          // found = data.indexOf(searchText) > -1;
        }
        return found || found1 || found2;
      });
      this.setState({infoArr: filteredData});
    }
    if (searchTextLength === 0) {
      // var ouput2 = foodProducts;
      // console.log('Output', ouput2);
      this.setState({infoArr: foodProducts});
    }
  };

  renderItem = ({item}) => (
    <AdminHomeworkComponent titleArr={this.titleArr} item={item} />
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
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Search by Class Name"
                placeholderTextColor="#666"
                style={styles.searchBar}
                onChangeText={value => this.handleSearch(value)}
                value={this.state.searchText}
              />
              <TouchableOpacity>
                <Image
                  source={ic_search_black}
                  resizeMode="cover"
                  style={styles.searchIcon}
                />
              </TouchableOpacity>
            </View>
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
  isAdminGetHomework: adminSelectors.isAdminGetHomework(state),
});
const mapDispatchToProps = {
  adminGetHomework: adminOperations.adminGetHomework,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminHomeworkScreen);
