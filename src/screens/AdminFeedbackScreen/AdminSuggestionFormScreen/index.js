import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Alert,
  TouchableHighlight,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// Images

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class MySuggestionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      mySuggestions: null,
      status: null,
      isListRefreshing: false,

      addAssignmentButtonZIndex: 0,
    };
  }

  componentDidMount() {
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        // if (this.isScreenPushed) {
        //   this.isScreenPushed = false;
        //   return;
        // }

        this.fetchMySuggestions();
      },
    );
  }

  componentWillUnmount() {
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchMySuggestions = async (callbackMessage = null) => {
    try {
      // starting loader
      this.setState({isLoading: true});
      await this.props.getFeedbackData();
      const response = this.props.isGetFeedbackData;

      // console.log('my suggestions response', response);
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
      } else {
        const {message} = response;

        this.setState({
          status: message,
          mySuggestions: null,
          isLoading: false,
          isListRefreshing: false,
        });
      }
    } catch (error) {
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
    this.props.navigation.push('AdminSuggestionForm', {
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
        <ScreenHeader
          title="Raise Complaint"
          showSchoolLogo
          nav={this.props.navigation}
        />

        {status ? (
          <ScrollView
            contentContainerStyle={styles.messageContainer}
            refreshControl={
              <RefreshControl
                refreshing={isListRefreshing}
                onRefresh={this.handleListRefresh}
              />
            }>
            <Text style={styles.messageText}>{status}</Text>
          </ScrollView>
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
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetFeedbackData: adminSelectors.isGetFeedbackData(state),
});
const mapDispatchToProps = {
  getFeedbackData: adminOperations.getFeedbackData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MySuggestionScreen);
