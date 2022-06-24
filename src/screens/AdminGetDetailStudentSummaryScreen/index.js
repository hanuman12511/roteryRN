import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableHighlight,
  Alert,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
// Components
import ScreenHeader from 'components/ScreenHeader';

import CustomLoader from 'components/CustomLoader';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
import PickerModal from 'react-native-picker-modal-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ic_drop_down_arrow from 'assets/icons/ic_drop_down_arrow.png';

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class AdminStudentSummaryScreen extends Component {
  constructor(props) {
    super(props);
    this.navi = props.navigation;
    this.state = {
      isLoading: true, // get in true by default
      infoArr: null,
      connectionState: true,
      isStudentProfile: true,
      teacherDesignation: '',
      activeInfoTab: 'Left', // Left / Right
      isClassSelected: false,
      isSectionSelected: false,
      isStudentSelected: false,
      email: '',
      isEmailEditable: false,
      buildingCategory: [],
      selectedClassName: {
        Id: -1,
        Name: 'Select Class',
        Value: 'Select Class',
      },
      floorCategory: [],
      selectedSectionName: {
        Id: -1,
        Name: 'Select Section',
        Value: 'Select Section',
      },
      RoomCategory: [],
      selectedStudentName: {
        Id: -1,
        Name: 'Select Student Name',
        Value: 'Select Student Name',
      },
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.profileDataFetch();
    this.setState({
      isClassSelected: false,
      isSectionSelected: false,
      isStudentSelected: false,
    });
    this.didFocusSubscription = this.navi.addListener('didFocus', payload => {
      this.profileDataFetch(payload);
      this.setState({
        isClassSelected: false,
        isSectionSelected: false,
        isStudentSelected: false,
      });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  profileDataFetch = async () => {
    try {
      await this.props.getClassSectionData();
      const response = this.props.isGetClassSectionData;
      if (this.state.connectionState === true) {
        if (response) {
          if (response.success === 1) {
            const {classes, sections} = response;

            const buildingCategory = classes.map(item => ({
              Id: item.id,
              Name: item.name,
              Value: item.name,
            }));
            const floorCategory = sections.map(item => ({
              Id: item.id,
              Name: item.name,
              Value: item.name,
            }));

            this.setState({
              buildingCategory,
              floorCategory,
              isLoading: false,
            });
          } else {
            this.setState({
              buildingCategory: [],
              floorCategory: [],
              isLoading: false,
            });
            //Alert.alert('', response.message);
          }
        } else {
          this.setState({
            buildingCategory: [],
            floorCategory: [],
            isLoading: false,
          });
          //Alert.alert('', response.message);
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
    }
  };

  handleFetchStudentName = async selectedSectionName => {
    try {
      this.setState({isLoading: true});
      const {selectedClassName} = this.state;

      await this.props.getClassWiseStudentData(
        selectedClassName.Id,
        selectedSectionName.Id,
      );
      const response = this.props.isGetClassWiseStudentData;
      if (response) {
        if (response.success === 1) {
          const {students} = response;
          const RoomCategory = students.map(item => ({
            Id: item.id,
            Name: item.name,
            Value: item.name,
          }));

          this.setState({
            RoomCategory,
            isSectionSelected: true,
            isLoading: false,
          });
        } else {
          this.setState({
            RoomCategory: [],
            isSectionSelected: true,
            isLoading: false,
          });
          //Alert.alert('', response.message);
        }
      } else {
        this.setState({
          RoomCategory: [],
          isSectionSelected: true,
          isLoading: false,
        });
        //Alert.alert('', response.message);
      }
    } catch (error) {
      Alert.alert('', error);
    }
  };

  //* class handling
  renderSelectCategoryPicker = (disabled, selected, showModal) => {
    const {selectedClassName} = this.state;
    const {Value} = selectedClassName;

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

  handleSelectBookCategory = selectedClassName => {
    this.setState({selectedClassName, isClassSelected: true});
    return selectedClassName;
  };

  handleSelectBookCategoryClose = () => {
    const {selectedClassName} = this.state;
    this.setState({selectedClassName});
  };
  //* Section Handling
  renderSelectFloorCategoryPicker = (disabled, selected, showModal) => {
    const {selectedSectionName} = this.state;
    const {Value} = selectedSectionName;

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

  handleSelectFloorCategory = selectedSectionName => {
    this.handleFetchStudentName(selectedSectionName);
    this.setState({selectedSectionName});
    // return selectedSectionName;
  };

  handleSelectFloorCategoryClose = () => {
    const {selectedSectionName} = this.state;
    this.setState({selectedSectionName});
  };
  //* student Name
  renderSelectRoomCategoryPicker = (disabled, selected, showModal) => {
    const {selectedStudentName} = this.state;
    const {Value} = selectedStudentName;

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

  handleSelectRoomCategory = selectedStudentName => {
    this.setState({selectedStudentName, isStudentSelected: true});
    return selectedStudentName;
  };

  handleSelectRoomCategoryClose = () => {
    const {selectedStudentName} = this.state;
    this.setState({selectedStudentName});
  };

  onPressLearnMore = () => {
    try {
      const {selectedClassName, selectedSectionName, selectedStudentName} =
        this.state;
      if ((selectedClassName, selectedSectionName, selectedStudentName)) {
        const stId = selectedStudentName.Id;
        this.props.navigation.navigate('GetDetailSummary', {stId});
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Student Summary"
              showSchoolLogo
              nav={this.props.navigation}
            />

            <KeyboardAvoidingView
              behavior="padding"
              style={styles.profileInnerContent}>
              <View>
                <View style={styles.pickerModelcategory}>
                  <PickerModal
                    items={this.state.buildingCategory}
                    selected={this.state.selectedClassName}
                    onSelected={this.handleSelectBookCategory}
                    onClosed={this.handleSelectBookCategoryClose}
                    backButtonDisabled
                    showToTopButton={true}
                    showAlphabeticalIndex={true}
                    autoGenerateAlphabeticalIndex={true}
                    searchPlaceholderText="Search"
                    renderSelectView={this.renderSelectCategoryPicker}
                  />
                </View>
                {this.state.isClassSelected ? (
                  <View style={styles.pickerModelcategory}>
                    <PickerModal
                      items={this.state.floorCategory}
                      selected={this.state.selectedSectionName}
                      onSelected={this.handleSelectFloorCategory}
                      onClosed={this.handleSelectFloorCategoryClose}
                      backButtonDisabled
                      showToTopButton={true}
                      showAlphabeticalIndex={true}
                      autoGenerateAlphabeticalIndex={true}
                      searchPlaceholderText="Search"
                      renderSelectView={this.renderSelectFloorCategoryPicker}
                    />
                  </View>
                ) : null}
                {this.state.isClassSelected && this.state.isSectionSelected ? (
                  <View style={styles.pickerModelcategory}>
                    <PickerModal
                      items={this.state.RoomCategory}
                      selected={this.state.selectedStudentName}
                      onSelected={this.handleSelectRoomCategory}
                      onClosed={this.handleSelectRoomCategoryClose}
                      backButtonDisabled
                      showToTopButton={true}
                      showAlphabeticalIndex={true}
                      autoGenerateAlphabeticalIndex={true}
                      searchPlaceholderText="Search"
                      renderSelectView={this.renderSelectRoomCategoryPicker}
                    />
                  </View>
                ) : null}
              </View>
              {this.state.isClassSelected &&
              this.state.isSectionSelected &&
              this.state.isStudentSelected ? (
                <View style={styles.button}>
                  <Button
                    onPress={this.onPressLearnMore}
                    title="Get Summary"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
              ) : null}
            </KeyboardAvoidingView>
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
  isGetClassSectionData: adminSelectors.isGetClassSectionData(state),
  isGetClassWiseStudentData: adminSelectors.isGetClassWiseStudentData(state),
  isGetSingleStudentProfileData:
    adminSelectors.isGetSingleStudentProfileData(state),
});
const mapDispatchToProps = {
  getClassSectionData: adminOperations.getClassSectionData,
  getClassWiseStudentData: adminOperations.getClassWiseStudentData,
  getSingleStudentProfileData: adminOperations.getSingleStudentProfileData,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminStudentSummaryScreen);
