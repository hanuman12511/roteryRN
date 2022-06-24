import React, {Component} from 'react';
import {View, Text, Alert, StyleSheet, FlatList} from 'react-native';
import {styles} from './styles';

// Components
import showToast from 'components/CustomToast';
import CustomLoader from 'components/CustomLoader';
import ProcessingLoader from 'components/ProcessingLoader';
import LibraryRequestedBookListComponent from 'components/LibraryRequestedBookListComponent';

// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

// User Preferences
import {getActiveSchool} from 'api/UserPreference';

class LibraryRequestedBooksScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      requestedBooks: null,
      message: null,
      isListRefreshing: false,
      showProcessingLoader: false,
    };
  }

  componentDidMount() {
    this.fetchRequestedBooks();
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchRequestedBooks();
      },
    );
  }
  componentWillUnmount() {
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }
  fetchRequestedBooks = async (callbackMessage = null) => {
    try {
      // starting loader
      this.setState({isLoading: true});
      await this.props.getRequestBookList();
      const response = this.props.isGetRequestBookList;
      // processing response
      if (response) {
        const {success} = response;

        if (success === 1) {
          const {output} = response;

          const requestedBooks = output.map(item => {
            const {
              bookCategory,
              bookName,
              AuthorName,
              status,
              requestDate,
              bookRequestId,
            } = item;
            return [
              bookCategory,
              bookName,
              AuthorName,
              status,
              requestDate,
              bookRequestId,
            ];
          });

          this.setState(
            {
              requestedBooks,
              message: null,
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

          this.setState(
            {
              message,
              requestedBooks: null,
              isLoading: false,
              isListRefreshing: false,
            },
            () => {
              if (callbackMessage) {
                showToast(callbackMessage);
              }
            },
          );
        }
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handleCancelBookRequestCallback = async bookRequestId => {
    try {
      // starting loader
      this.setState({showProcessingLoader: true});

      // fetching active school from local storage
      const activeSchool = await getActiveSchool();
      if (!activeSchool) {
        return;
      }

      const {idsprimeID} = activeSchool;

      // preparing params
      const params = {
        bookRequestId,
        idsprimeID,
      };

      // calling api
      await this.props.cancelRequestBookList(params);
      const response = this.props.isCancelRequestBookList;
      // processing response
      if (response) {
        const {success, message} = response;

        if (success === 1) {
          console.log('cancel response', response);
          // stopping loader
          this.setState({showProcessingLoader: false});

          showToast(message);
          await this.fetchRequestedBooks(message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item}) => {
    const titleArr = ['Book Category', 'Book Name', 'Author Name', 'Status'];
    return (
      <LibraryRequestedBookListComponent
        item={item}
        titleArr={titleArr}
        handleCancelBookRequestCallback={this.handleCancelBookRequestCallback}
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
      await this.fetchRequestedBooks();
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {requestedBooks, isListRefreshing, message, showProcessingLoader} =
      this.state;

    return requestedBooks ? (
      <View style={styles.container}>
        <FlatList
          data={requestedBooks}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true} // for iOS only
          contentContainerStyle={styles.listContentContainer}
          refreshing={isListRefreshing}
          onRefresh={this.handleListRefresh}
        />

        {showProcessingLoader && <ProcessingLoader />}
      </View>
    ) : (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isGetRequestBookList: studentSelectors.isGetRequestBookList(state),
  isCancelRequestBookList: studentSelectors.isCancelRequestBookList(state),
});
const mapDispatchToProps = {
  getRequestBookList: studentOperations.getRequestBookList,
  cancelRequestBookList: studentOperations.cancelRequestBookList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LibraryRequestedBooksScreen);
