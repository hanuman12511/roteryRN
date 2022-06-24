import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import ResultItem from 'components/ResultItem';
import CustomLoader from 'components/CustomLoader';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

class ResultScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      infoArr: null,
      message: null,
      isListRefreshing: false,
      connectionState: true,
    };

    this.titleArr = ['Class', 'Declared On'];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchResult();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchResult = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.getResult();
      const response = this.props.isGetResult;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          this.resultData = response.output;

          if (this.resultData) {
            let infoArr = [];

            for (const result of this.resultData) {
              infoArr.push([result.class, result.resultdeclare]);
            }

            this.setState({infoArr, isLoading: false, isListRefreshing: false});
          } else {
            const message = response.message;
            this.setState({message, isLoading: false, isListRefreshing: false});
          }
        } else {
          const message = response.message;
          //Alert.alert('', response.message);
          this.setState({message, isLoading: false, isListRefreshing: false});
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
    const {examname: examName, link: url} = this.resultData[index];

    return (
      <ResultItem
        titleArr={this.titleArr}
        item={item}
        examName={examName}
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
      await this.fetchResult();
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
              title="Results"
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
              <ScrollView
                contentContainerStyle={styles.messageContainer}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isListRefreshing}
                    onRefresh={this.handleListRefresh}
                  />
                }>
                <Text style={styles.messageText}>{this.state.message}</Text>
              </ScrollView>
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
  isGetResult: studentSelectors.isGetResult(state),
});
const mapDispatchToProps = {
  getResult: studentOperations.getResult,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultScreen);
