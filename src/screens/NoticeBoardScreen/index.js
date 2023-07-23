import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import DetailListComponent from 'components/DetailListComponent';
import CustomLoader from 'components/CustomLoader';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

// API
import getNoticeBoardNews from 'api/Student/GetNoticeBoardNewsAPI';

export default class NoticeBoardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      infoArr: null,
      status: null,
      isListRefreshing: false,
      connectionState: true,
    };

    this.titleArr = ['Notice Type', 'Start Date', 'End Date', 'Description'];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchNoticeBoardNews();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchNoticeBoardNews = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      const response = await getNoticeBoardNews();
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          this.newsData = response.output;
          let infoArr = [];

          for (const news of this.newsData) {
            infoArr.push([
              news.event_type,
              news.start,
              news.end,
              news.description,
            ]);
          }

          this.setState({
            infoArr,
            status: null,
            isLoading: false,
            isListRefreshing: false,
          });
        } else if (response.success === 0) {
          const message = response.message;
          this.setState({
            status: message,
            infoArr: null,
            isLoading: false,
            isListRefreshing: false,
          });
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchNoticeBoardNews();
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item, index}) => {
    const {newsData} = this;
    const title = newsData[index].title;
    const postedOn = newsData[index].post_on;

    return (
      <View style={styles.transportScreenSection}>
        <Text style={styles.noticeHeading}>{title}</Text>
        <DetailListComponent
          titleArr={this.titleArr}
          infoArr={item}
          skipContainerStyle
        />
        <Text style={styles.noticePosted}>Posted on: {postedOn}</Text>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Notice Board"
              showSchoolLogo
              nav={this.props.navigation}
            />
            {this.state.status ? (
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
