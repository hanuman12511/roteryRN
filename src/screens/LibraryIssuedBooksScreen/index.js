import React, {Component} from 'react';
import {View, Text, Alert, FlatList} from 'react-native';
import {styles} from './styles';

// Components
import LibraryRowComponent from 'components/LibraryRowComponent';
import CustomLoader from 'components/CustomLoader';

// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

class LibraryIssuedBooksScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      issuedBooks: null,
      message: null,
      isListRefreshing: false,
    };

    this.titleArr = ['Book Name', 'Issue Date', 'Due Date'];
  }

  componentDidMount() {
    this.fetchIssuedBooks();
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchIssuedBooks();
      },
    );
  }
  componentWillUnmount() {
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchIssuedBooks = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.getIssuedBook();
      const response = this.props.isGetIssuedBook;

      if (response.success === 1) {
        const issuedBooksData = response.output;

        if (issuedBooksData) {
          let issuedBooks = [];

          for (const issuedBook of issuedBooksData) {
            issuedBooks.push([
              issuedBook.book_name,
              issuedBook.issue_date,
              issuedBook.due_date,
            ]);
          }

          this.setState({
            issuedBooks,
            isLoading: false,
            isListRefreshing: false,
          });
        } else {
          const message = response.message;
          this.setState({message, isLoading: false, isListRefreshing: false});
        }
      } else {
        //Alert.alert('', response.message);
        this.setState({
          issuedBooks: null,
          isLoading: false,
          isListRefreshing: false,
        });
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  renderItem = ({item}) => (
    <LibraryRowComponent item={item} titleArr={this.titleArr} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchIssuedBooks();
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return this.state.isLoading ? (
      <CustomLoader />
    ) : this.state.issuedBooks ? (
      <FlatList
        data={this.state.issuedBooks}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        ItemSeparatorComponent={this.itemSeparator}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true} // for iOS only
        contentContainerStyle={styles.listContentContainer}
        refreshing={this.state.isListRefreshing}
        onRefresh={this.handleListRefresh}
      />
    ) : (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{this.state.message}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isGetIssuedBook: studentSelectors.isGetIssuedBook(state),
});
const mapDispatchToProps = {
  getIssuedBook: studentOperations.getIssuedBook,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LibraryIssuedBooksScreen);
