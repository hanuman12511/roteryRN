import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import PickerModal from 'react-native-picker-modal-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ic_drop_down_arrow from 'assets/icons/ic_drop_down_arrow.png';
import ic_back from 'assets/icons/ic_back.png';
// Components
import ScreenHeader from 'components/ScreenHeader';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
// User Preference
import {getActiveSchool, getData} from 'api/UserPreference';
export class AdminRaiseComplaintScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, // get in true by default
      connectionState: true,
      infoArr: null,
      isStudentProfile: true,
      teacherDesignation: '',
      activeInfoTab: 'Left', // Left / Right
      feedbackQuestion: [],
      complaintDescription: null,
      email: '',
      isEmailEditable: false,
      selectedFeedbackCategory: {
        Id: -1,
        Name: 'Please Gives Your Reason',
        Value: 'Please Gives Your Reason',
      },
    };
  }
  static propTypes = {
    prop: PropTypes,
  };
  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (this.isNextScreenPushed) {
          this.isNextScreenPushed = false;
          return;
        }

        this.profileDataFetch();
      },
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  profileDataFetch = async () => {
    try {
      await this.props.feedbackCategory();
      const response = this.props.isFeedbackCategory;
      if (this.state.connectionState === true) {
        if (response) {
          const {success, message} = response;
          if (success === 1) {
            const {category} = response;
            const feedbackQuestion = category.map(item => ({
              Id: item.id,
              Name: item.name,
              Value: item.name,
            }));
            console.log('ques', feedbackQuestion);
            this.setState({feedbackQuestion});
          }
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {}
  };

  onDescriptionChange = changedText => {
    this.setState({complaintDescription: changedText});
  };
  onPressLearnMore = async () => {
    try {
      const {selectedFeedbackCategory, feedbackQuestion, complaintDescription} =
        this.state;
      // if ((selectedBuilding, selectedFloor, selectedRoom, selectedDepartment)) {
      //   this.props.navigation.navigate('GetDetailSummary');
      // }

      // validations
      if (selectedFeedbackCategory.Value === 'Select Category') {
        Alert.alert('', 'Please select category', [{text: 'OK'}], {
          cancelable: false,
        });
        return;
      }

      if (complaintDescription.trim() === '') {
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

      // fetching empId from local storage
      const userInfo = await getData();
      if (!userInfo) {
        return;
      }

      const {idsprimeID} = activeSchool;
      const {empId: userId} = userInfo;

      // preparing params
      const params = {
        userId,
        feedbackCat: selectedFeedbackCategory.Id,
        feedback: complaintDescription,
        idsprimeID,
      };

      // calling api
      await this.props.handleFeedback(params);
      const response = this.props.isHandleFeedback;

      // processing response
      if (response) {
        const {success, message} = response;

        if (success === 1) {
          // stopping loader
          this.setState({showProcessingLoader: false});

          // navigating back
          this.props.navigation.goBack();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  renderSelectCategoryPicker = (disabled, selected, showModal) => {
    const {selectedFeedbackCategory} = this.state;
    const {Value} = selectedFeedbackCategory;

    const labelStyle = {
      flex: 1,
      fontSize: wp(3),
      color: '#000',
    };

    if (Value === 'Book Category') {
      labelStyle.color = '#666';
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

  handleSelectBookCategory = selectedFeedbackCategory => {
    this.setState({selectedFeedbackCategory});
    return selectedFeedbackCategory;
  };

  handleSelectBookCategoryClose = () => {
    const {selectedFeedbackCategory} = this.state;
    this.setState({selectedFeedbackCategory});
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Raise Complaint"
              backIcon={ic_back}
              showSchoolLogo
              nav={this.props.navigation}
            />
            <KeyboardAwareScrollView
              enableOnAndroid
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={styles.formContainer}>
              <View>
                <PickerModal
                  items={this.state.feedbackQuestion}
                  selected={this.state.selectedFeedbackCategory}
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
                    placeholder="Description"
                    placeholderTextColor="#666"
                    value={this.state.complaintDescription}
                    onChangeText={this.onDescriptionChange}
                    maxLength={300}
                  />
                </View>

                <View style={styles.button}>
                  <Button
                    onPress={this.onPressLearnMore}
                    title="Submit"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
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
  isFeedbackCategory: adminSelectors.isFeedbackCategory(state),
  isHandleFeedback: adminSelectors.isHandleFeedback(state),
});

const mapDispatchToProps = {
  feedbackCategory: adminOperations.feedbackCategory,
  handleFeedback: adminOperations.handleFeedback,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminRaiseComplaintScreen);
