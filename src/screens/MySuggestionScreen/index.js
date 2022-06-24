import React, {Component} from 'react';
import {Text, View, FlatList, Alert, TouchableHighlight} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

class MySuggestionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      mySuggestions: null,
      status: null,
      isListRefreshing: false,
      connectionState: true,
      addAssignmentButtonZIndex: 0,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (this.isScreenPushed) {
          this.isScreenPushed = false;
          return;
        }

        this.fetchMySuggestions();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchMySuggestions = async (callbackMessage = null) => {
    try {
      // starting loader
      this.setState({isLoading: true});
      await this.props.viewFeedback();
      const response = this.props.isViewFeedback;

      if (this.state.connectionState === true) {
        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {output: mySuggestions} = response;

            this.setState(
              {
                mySuggestions,
                status: null,
                isLoading: false,
                isListRefreshing: false,
              },
              () => {
                if (callbackMessage) {
                  showToast(callbackMessage);
                }
              },
            );
          } else if (success === 0) {
            const {message} = response;

            this.setState({
              status: message,
              mySuggestions: null,
              isLoading: false,
              isListRefreshing: false,
            });
          }
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      this.setState({isLoading: false, isListRefreshing: false});
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchMySuggestions();
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item}) => {
    const {feedback, status, date, reply} = item;
    const isClosed = status === 'Closed';

    return (
      <View style={styles.transportScreenSection}>
        <Text style={styles.noticeHeading}>{feedback}</Text>

        <View style={styles.suggestionInfo}>
          <Text style={styles.suggestionStatus}>Status: {status}</Text>
          <Text style={styles.noticePosted}>Submitted on: {date}</Text>
        </View>

        {isClosed && (
          <View style={styles.suggestionReplyContainer}>
            <Text style={styles.replyMessage}>{reply.message}</Text>
            <Text style={styles.replyDate}>{reply.date}</Text>
          </View>
        )}
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleGiveSuggestion = () => {
    this.isScreenPushed = true;
    this.props.navigation.push('AddMySuggestion', {
      refreshMySuggestionsCallback: this.fetchMySuggestions,
    });
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {status, mySuggestions, isListRefreshing, addAssignmentButtonZIndex} =
      this.state;

    const addAssignmentButtonZIndexStyle = {
      zIndex: addAssignmentButtonZIndex,
    };

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="My Suggestion"
              showSchoolLogo
              nav={this.props.navigation}
            />
            {status ? (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{status}</Text>
              </View>
            ) : (
              <FlatList
                data={mySuggestions}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.itemSeparator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContentContainer}
                refreshing={isListRefreshing}
                onRefresh={this.handleListRefresh}
              />
            )}
            <TouchableHighlight
              underlayColor="#414042"
              onPress={this.handleGiveSuggestion}
              style={[styles.addAssignmentBtn, addAssignmentButtonZIndexStyle]}>
              <Text style={styles.addAssignmentBtnIcon}>+</Text>
            </TouchableHighlight>
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
  isViewFeedback: studentSelectors.isViewFeedback(state),
});
const mapDispatchToProps = {
  viewFeedback: studentOperations.viewFeedback,
};

export default connect(mapStateToProps, mapDispatchToProps)(MySuggestionScreen);
