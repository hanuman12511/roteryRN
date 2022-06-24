import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
// Icons
import ic_search_white from 'assets/icons/ic_search_white.png';
// Components
import ScreenHeader from 'components/ScreenHeader';
import LibraryRowComponent from 'components/LibraryRowComponent';
import CustomLoader from 'components/CustomLoader';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';

class TeacherLibraryScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      issuedBooks: null,
      message: null,
      isListRefreshing: false,
      connectionState: true,
    };

    this.titleArr = ['Book Name', 'Issue Date', 'Due Date'];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        this.fetchIssuedBooks();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchIssuedBooks = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      // calling api
      await this.props.getIssuedBooks();
      const response = this.props.isGetIssuedBooks;
      if (this.state.connectionState === true) {
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
              message: null,
              isLoading: false,
              isListRefreshing: false,
            });
          } else {
            const message = response.message;
            this.setState({
              message,
              issuedBooks: null,
              isLoading: false,
              isListRefreshing: false,
            });
          }
        } else {
          const message = response.message;
          this.setState({
            message,
            issuedBooks: null,
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
      await this.fetchIssuedBooks();
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item}) => (
    <LibraryRowComponent item={item} titleArr={this.titleArr} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;
  handleBookSearch = () => {
    this.props.navigation.push('LibraryBookSearch');
  };
  render() {
    return this.state.isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Library"
              showSchoolLogo
              nav={this.props.navigation}
            />
            {this.state.issuedBooks ? (
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
            )}
            <TouchableOpacity
              underlayColor="#1ba2de80"
              onPress={this.handleBookSearch}
              style={styles.floatingSearchButton}>
              <Image
                source={ic_search_white}
                resizeMode="cover"
                style={styles.floatingSearchIcon}
              />
            </TouchableOpacity>
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
  isGetIssuedBooks: teacherSelectors.isGetIssuedBooks(state),
});
const mapDispatchToProps = {getIssuedBooks: teacherOperations.getIssuedBooks};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherLibraryScreen);
