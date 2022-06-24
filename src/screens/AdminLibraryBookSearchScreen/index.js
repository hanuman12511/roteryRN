import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './styles';
import PickerModal from 'react-native-picker-modal-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import ProcessingLoader from 'components/ProcessingLoader';

// Icons
import ic_back from 'assets/icons/ic_back.png';
import ic_drop_down_arrow from 'assets/icons/ic_drop_down_arrow.png';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';
import {getActiveSchool} from 'api/UserPreference';
class AdminLibraryBookSearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      showProcessingLoader: false,

      bookCategories: null,
      selectedBookCategory: {
        Id: -1,
        Name: 'Book Category',
        Value: 'Book Category',
      },
      connectionState: true,
      bookName: '',
      authorName: '',
      subtitle: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchBookCategories();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchBookCategories = async () => {
    try {
      // fetching active school from local storage
      await this.props.getBookCategories();
      const response = this.props.isGetBookCategories;
      if (this.state.connectionState === true) {
        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {category: categoryList} = response;

            const bookCategories = categoryList.map(item => ({
              Id: item.value,
              Name: item.name,
              Value: item.name,
            }));

            this.setState({bookCategories, isLoading: false});
          }
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  renderSelectCategoryPicker = (disabled, selected, showModal) => {
    const {selectedBookCategory} = this.state;
    const {Value} = selectedBookCategory;

    const labelStyle = {
      flex: 1,
      fontSize: wp(3),
      color: '#000',
    };

    if (Value === 'Book Category') {
      labelStyle.color = '#ccc';
    }

    const handlePress = disabled ? null : showModal;

    return (
      <TouchableHighlight underlayColor="transparent" onPress={handlePress}>
        <View style={styles.pickerSelectView}>
          <Text style={labelStyle}>{Value}</Text>
          <Image
            source={ic_drop_down_arrow}
            resizeMode="cover"
            style={styles.pickerSelectViewIcon}
          />
        </View>
      </TouchableHighlight>
    );
  };

  handleSelectBookCategory = selectedBookCategory => {
    this.setState({selectedBookCategory});
    return selectedBookCategory;
  };

  handleSelectBookCategoryClose = () => {
    const {selectedBookCategory} = this.state;
    this.setState({selectedBookCategory});
  };

  handleBookNameChange = bookName => {
    this.setState({bookName});
  };

  handleAuthorNameChange = authorName => {
    this.setState({authorName});
  };

  handleSubtitleChange = subtitle => {
    this.setState({subtitle});
  };

  handleBookSearch = async () => {
    try {
      const {selectedBookCategory, bookName, authorName, subtitle} = this.state;

      // validations
      if (selectedBookCategory.Value === 'Book Category') {
        Alert.alert('', 'Please select book category', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

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
        category: selectedBookCategory.Id,
        bookName,
        author: authorName,
        subTitle: subtitle,
        idsprimeID,
      };

      // calling api
      await this.props.getBookInLibrary(params);
      const response = this.props.isGetBookInLibrary;
      // processing response
      if (response) {
        // stopping loader
        this.setState({showProcessingLoader: false});

        const {success} = response;

        if (success === 1) {
          const {books} = response;
          this.props.navigation.push('AdminLibraryBookSearchResult', {
            searchResult: {books, message: null},
          });
        } else if (success === 0) {
          const {message} = response;
          this.props.navigation.push('AdminLibraryBookSearchResult', {
            searchResult: {message, books: null},
          });
        }
      } else {
        const {message} = response;
        this.props.navigation.push('AdminLibraryBookSearchResult', {
          searchResult: {message, books: null},
        });
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {
      bookCategories,
      selectedBookCategory,
      bookName,
      authorName,
      subtitle,
      showProcessingLoader,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              backIcon={ic_back}
              title="Book Search"
              nav={this.props.navigation}
            />

            <KeyboardAwareScrollView
              enableOnAndroid
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View style={styles.formContainer}>
                <PickerModal
                  items={bookCategories}
                  selected={selectedBookCategory}
                  onSelected={this.handleSelectBookCategory}
                  onClosed={this.handleSelectBookCategoryClose}
                  backButtonDisabled
                  showToTopButton={true}
                  showAlphabeticalIndex={true}
                  autoGenerateAlphabeticalIndex={true}
                  searchPlaceholderText="Search"
                  renderSelectView={this.renderSelectCategoryPicker}
                />

                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Book Name"
                    placeholderTextColor="#ccc"
                    value={bookName}
                    onChangeText={this.handleBookNameChange}
                  />
                </View>

                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Author Name"
                    placeholderTextColor="#ccc"
                    value={authorName}
                    onChangeText={this.handleAuthorNameChange}
                  />
                </View>

                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Subtitle"
                    placeholderTextColor="#ccc"
                    value={subtitle}
                    onChangeText={this.handleSubtitleChange}
                  />
                </View>

                <TouchableHighlight
                  underlayColor="#1ba2de80"
                  onPress={this.handleBookSearch}
                  style={styles.searchButton}>
                  <Text style={styles.searchButtonText}>Search</Text>
                </TouchableHighlight>
              </View>
            </KeyboardAwareScrollView>

            {showProcessingLoader && <ProcessingLoader />}
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
  isGetBookCategories: studentSelectors.isGetBookCategories(state),
  isGetBookInLibrary: studentSelectors.isGetBookInLibrary(state),
});
const mapDispatchToProps = {
  getBookCategories: studentOperations.getBookCategories,
  getBookInLibrary: studentOperations.getBookInLibrary,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminLibraryBookSearchScreen);
