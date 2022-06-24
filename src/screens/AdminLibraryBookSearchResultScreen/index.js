import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// Components
import ScreenHeader from 'components/ScreenHeader';
import AdminLibraryBookSearchResultComponent from 'components/AdminLibraryBookSearchResultComponent';

// Icons
import ic_back from 'assets/icons/ic_back.png';

export default class AdminLibraryBookSearchResultScreen extends Component {
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
      ...initialState,
      connectionState: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  renderItem = ({item}) => {
    const titleArr = ['Book Category', 'Book Name', 'Author Name', 'Status'];
    return (
      <AdminLibraryBookSearchResultComponent item={item} titleArr={titleArr} />
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {books, message} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
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
