import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from './styles';
import PickerModal from 'react-native-picker-modal-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import ProcessingLoader from 'components/ProcessingLoader';

// Icons
import ic_back from 'assets/icons/ic_back.png';
import ic_drop_down_arrow from 'assets/icons/ic_drop_down_arrow.png';
import ic_category from 'assets/icons/ic_category.png';
import ic_suggestion from 'assets/icons/ic_suggestion.png';

// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

// User Preference
import {getActiveSchool} from 'api/UserPreference';

class AddMySuggestionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      showProcessingLoader: false,
      connectionState: true,
      categories: null,
      selectedCategory: {
        Id: -1,
        Name: 'Select Category',
        Value: 'Select Category',
      },
      suggestion: '',
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchSuggestionCategories();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchSuggestionCategories = async () => {
    try {
      await this.props.viewFeedbackCategories();
      const response = this.props.isViewFeedbackCategories;
      // processing response
      if (this.state.connectionState === true) {
        const {success} = response;

        if (success) {
          const {category: categoryList} = response;

          const categories = categoryList.map(item => ({
            Id: item.id,
            Name: item.name,
            Value: item.name,
          }));

          this.setState({categories, isLoading: false});
        } else {
          this.setState({categories: null, isLoading: false});
          //Alert.alert('', response.message);
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handleSuggestionChange = suggestion => {
    this.setState({suggestion});
  };

  renderSelectCategoryPicker = (disabled, selected, showModal) => {
    const {selectedCategory} = this.state;
    const {Value} = selectedCategory;

    const labelStyle = {
      flex: 1,
      fontSize: wp(4),
      color: '#000',
    };

    if (Value === 'Select Category') {
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

  handleSelectCategory = selectedCategory => {
    this.setState({selectedCategory});
    return selectedCategory;
  };

  handleSelectCategoryClose = () => {
    const {selectedCategory} = this.state;
    this.setState({selectedCategory});
  };

  handleSubmitPress = async () => {
    try {
      const {selectedCategory, suggestion} = this.state;

      // validations
      if (selectedCategory.Value === 'Select Category') {
        Alert.alert('', 'Please select category', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (suggestion.trim() === '') {
        Alert.alert('', 'Please enter your suggestion', [{text: 'OK'}], {
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

      const {userdetail: students, idsprimeID} = activeSchool;

      // processing for students id
      let studentIds = students.map(student => student.id);
      studentIds = studentIds.join();

      // preparing params
      const params = {
        userId: studentIds,
        feedbackCat: selectedCategory.Id,
        feedback: suggestion,
        idsprimeID,
      };

      // calling api
      await this.props.submitFeedback(params);
      const response = this.props.isSubmitFeedback;

      // processing response
      if (response) {
        const {success, message} = response;

        if (success === 1) {
          const {navigation} = this.props;
          const refreshMySuggestionsCallback = navigation.getParam(
            'refreshMySuggestionsCallback',
            null,
          );

          if (refreshMySuggestionsCallback) {
            // stopping loader
            this.setState({showProcessingLoader: false});

            // navigating back
            navigation.pop();

            // refresh callback
            refreshMySuggestionsCallback(message);
          }
        }
      } else {
        //Alert.alert('', response.message);
        this.setState({
          isLoading: false,
          isListRefreshing: false,
          showProcessingLoader: false,
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

    const {categories, selectedCategory, suggestion, showProcessingLoader} =
      this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              backIcon={ic_back}
              title="Provide Suggestion"
              nav={this.props.navigation}
            />

            {categories !== null ? (
              <KeyboardAwareScrollView
                enableOnAndroid
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Image
                      source={ic_category}
                      resizeMode="cover"
                      style={styles.inputIcon}
                    />
                    <PickerModal
                      items={categories}
                      selected={selectedCategory}
                      onSelected={this.handleSelectCategory}
                      onClosed={this.handleSelectCategoryClose}
                      backButtonDisabled
                      showToTopButton={true}
                      showAlphabeticalIndex={true}
                      autoGenerateAlphabeticalIndex={true}
                      searchPlaceholderText="Search"
                      renderSelectView={this.renderSelectCategoryPicker}
                      style={styles.pickerInput}
                    />
                  </View>

                  <View style={styles.textareaContainer}>
                    <Image
                      source={ic_suggestion}
                      resizeMode="cover"
                      style={styles.textAreaIcon}
                    />
                    <TextInput
                      style={styles.textareaInput}
                      placeholder="Suggestion"
                      placeholderTextColor="#ccc"
                      multiline={true}
                      numberOfLines={8}
                      value={suggestion}
                      onChangeText={this.handleSuggestionChange}
                    />
                  </View>

                  <TouchableHighlight
                    underlayColor="#1ba2de80"
                    onPress={this.handleSubmitPress}
                    style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </TouchableHighlight>
                </View>
              </KeyboardAwareScrollView>
            ) : (
              <View style={styles.errMsg}>
                <Text style={styles.erroMsg}>No Data</Text>
              </View>
            )}
          </>
        )}
        {this.state.connectionState === false ? (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        ) : null}
        {showProcessingLoader && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isViewFeedbackCategories: studentSelectors.isViewFeedbackCategories(state),
  isSubmitFeedback: studentSelectors.isSubmitFeedback(state),
});
const mapDispatchToProps = {
  viewFeedbackCategories: studentOperations.viewFeedbackCategories,
  submitFeedback: studentOperations.submitFeedback,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddMySuggestionScreen);
