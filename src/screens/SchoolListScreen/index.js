import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import SchoolListItem from 'components/SchoolListItem';
import CustomLoader from 'components/CustomLoader';

// User Preference
import {getData, setActiveSchool} from 'api/UserPreference';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
export default class SchoolListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      schools: null,
      connectionState: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchSchoolsInfo();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchSchoolsInfo = async () => {
    try {
      // fetching userInfo
      const userInfo = await getData();
      if (!userInfo) {
        return;
      }

      const {detail: schools} = userInfo;

      if (schools.length > 1) {
        this.setState({schools, isLoading: false});
      } else if (schools.length === 1) {
        // setting active school
        const [firstSchool] = schools;
        await setActiveSchool(firstSchool);

        // stopping loader
        this.setState({isLoading: false});

        // navigating
        this.props.navigation.replace('StudentList');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item}) => (
    <SchoolListItem item={item} navigation={this.props.navigation} />
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
              <Text style={styles.headerContent}>School List</Text>
            </View>
            <View style={styles.listContainer}>
              <FlatList
                data={this.state.schools}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.itemSeparator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContentContainer}
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
