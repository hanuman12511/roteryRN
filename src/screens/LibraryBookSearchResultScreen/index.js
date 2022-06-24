import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';
import LibraryBookSearchResultComponent from 'components/LibraryBookSearchResultComponent';
import ProcessingLoader from 'components/ProcessingLoader';
import showToast from 'components/CustomToast';

// Icons
import ic_back from 'assets/icons/ic_back.png';

// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

class LibraryBookSearchResultScreen extends Component {
  constructor(props) {
    super(props);

    // fetching navigation params
    const searchResult = this.props.navigation.getParam('searchResult', null);

    let initialState = {
      books: null,
      message: null,
    };

    if (searchResult) {
      const {books, message} = searchResult;

      if (books) {
        const transformedBooks = books.map(book => {
          const {category, name, author, status, id} = book;
          return [category, name, author, status, id];
        });

        initialState.books = transformedBooks;
      }

      initialState.message = message;
    }

    this.state = {
      showProcessingLoader: false,
      ...initialState,
    };
  }

  handleConfirmBookRequest = book => {
    const {id, name} = book;

    const handleAlertYes = async () => {
      try {
        await this.handleBookRequest(id);
      } catch (error) {
        console.log(error.message);
      }
    };

    Alert.alert(
      'Request Book',
      'Confirm book "' + name + '" request?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: handleAlertYes,
        },
      ],
      {cancelable: false},
    );
  };

  handleBookRequest = async bookId => {
    try {
      // starting loader
      this.setState({showProcessingLoader: true});
      await this.props.requestBookLibrary(bookId);
      const response = this.props.isRequestBookLibrary;

      // processing response
      if (response) {
        // stopping loader
        this.setState({showProcessingLoader: false});

        const {success, message} = response;

        if (success === 1) {
          showToast(message);

          this.props.navigation.popToTop();
        } else if (success === 0) {
          showToast(message);
        }
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  renderItem = ({item}) => {
    const titleArr = ['Book Category', 'Book Name', 'Author Name', 'Status'];
    return (
      <LibraryBookSearchResultComponent
        item={item}
        titleArr={titleArr}
        handleConfirmBookRequest={this.handleConfirmBookRequest}
      />
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {books, message, showProcessingLoader} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          backIcon={ic_back}
          title="Book Search Result"
          nav={this.props.navigation}
        />

        {books ? (
          <FlatList
            data={books}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.itemSeparator}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true} // for iOS only
            contentContainerStyle={styles.listContentContainer}
          />
        ) : (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        )}

        {showProcessingLoader && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isRequestBookLibrary: studentSelectors.isRequestBookLibrary(state),
  isGetBookInLibrary: studentSelectors.isGetBookInLibrary(state),
});
const mapDispatchToProps = {
  requestBookLibrary: studentOperations.requestBookLibrary,
  getBookInLibrary: studentOperations.getBookInLibrary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LibraryBookSearchResultScreen);
