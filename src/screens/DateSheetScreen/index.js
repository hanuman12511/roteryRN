import React, {Component} from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import DateSheetItem from 'components/DateSheetItem';
import CustomLoader from 'components/CustomLoader';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

class DateSheetScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      infoArr: null,
      message: null,
      isListRefreshing: false,
      connectionState: true,
    };

    this.titleArr = ['Exam Starting On', 'Exam Ends On'];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchDateSheet();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchDateSheet = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.getDateSheet();
      const response = this.props.isGetDateSheet;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          this.dateSheetData = response.dateSheet;

          if (this.dateSheetData) {
            let infoArr = [];

            for (const dateSheet of this.dateSheetData) {
              infoArr.push([dateSheet.start_date, dateSheet.end_date]);
            }

            this.setState({infoArr, isLoading: false, isListRefreshing: false});
          } else {
            const message = response.message;
            this.setState({message, isLoading: false, isListRefreshing: false});
          }
        } else {
          const message = response.message;
          this.setState({
            message,
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
      console.log(error.message);
    }
  };

  renderItem = ({item, index}) => {
    const {title, url} = this.dateSheetData[index];

    return (
      <DateSheetItem
        titleArr={this.titleArr}
        item={item}
        title={title}
        url={url}
      />
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchDateSheet();
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Date Sheet/Syllabus"
              showSchoolLogo
              nav={this.props.navigation}
            />
            {this.state.infoArr ? (
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
            ) : (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{this.state.message}</Text>
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
  isGetDateSheet: studentSelectors.isGetDateSheet(state),
});
const mapDispatchToProps = {
  getDateSheet: studentOperations.getDateSheet,
};
export default connect(mapStateToProps, mapDispatchToProps)(DateSheetScreen);
