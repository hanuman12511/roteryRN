import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Alert,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import PickerModal from 'react-native-picker-modal-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ic_drop_down_arrow from 'assets/icons/ic_drop_down_arrow.png';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
export class AdminRaiseComplaintScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, // get in true by default
      infoArr: null,
      isStudentProfile: true,
      connectionState: true,
      teacherDesignation: '',
      activeInfoTab: 'Left', // Left / Right
      selectedBuilding: null,
      selectedFloor: null,
      selectedRoom: null,
      selectedDepartment: null,
      complaintDescription: null,
      email: '',
      isEmailEditable: false,
      buildingCategory: [],
      selectedBuildingCategory: {
        Id: -1,
        Name: 'Select Building',
        Value: 'Select Building',
      },
      floorCategory: [],
      selectedFloorCategory: {
        Id: -1,
        Name: 'Select Floor',
        Value: 'Select Floor',
      },
      RoomCategory: [],
      selectedRoomCategory: {
        Id: -1,
        Name: 'Select Room',
        Value: 'Select Room',
      },
      DepartmentCategory: [],
      selectedDepartmentCategory: {
        Id: -1,
        Name: 'Select Department',
        Value: 'Select Department',
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

  profileDataFetch = () => {
    try {
      const Building = [
        {
          name: 'Block1',
          value: 'Block1',
        },
        {
          name: 'Block 2',
          value: 'Block 2',
        },
        {
          name: 'Block 3',
          value: 'Block 3',
        },
      ];
      const Floor = [
        {
          name: 'F1',
          value: 'F1',
        },
        {
          name: 'F2',
          value: 'F2',
        },
        {
          name: 'F3',
          value: 'F3',
        },
      ];
      const Room = [
        {
          name: 'R1',
          value: 'R1',
        },
        {
          name: 'R2',
          value: 'R2',
        },
        {
          name: 'R3',
          value: 'R3',
        },
      ];
      const Department = [
        {
          name: 'Library',
          value: 'Library',
        },
        {
          name: 'Account',
          value: 'Account',
        },
        {
          name: 'Teacher',
          value: 'Teacher',
        },
      ];
      const buildingCategory = Building.map(item => ({
        Id: item.value,
        Name: item.name,
        Value: item.name,
      }));
      const floorCategory = Floor.map(item => ({
        Id: item.value,
        Name: item.name,
        Value: item.name,
      }));
      const RoomCategory = Room.map(item => ({
        Id: item.value,
        Name: item.name,
        Value: item.name,
      }));
      const DepartmentCategory = Department.map(item => ({
        Id: item.value,
        Name: item.name,
        Value: item.name,
      }));
      console.log('ques', buildingCategory);
      this.setState({
        buildingCategory,
        floorCategory,
        RoomCategory,
        DepartmentCategory,
      });
    } catch (error) {}
  };

  renderSelectCategoryPicker = (disabled, selected, showModal) => {
    const {selectedBuildingCategory} = this.state;
    const {Value} = selectedBuildingCategory;

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

  handleSelectBookCategory = selectedBuildingCategory => {
    this.setState({selectedBuildingCategory});
    return selectedBuildingCategory;
  };

  handleSelectBookCategoryClose = () => {
    const {selectedBuildingCategory} = this.state;
    this.setState({selectedBuildingCategory});
  };
  renderSelectFloorCategoryPicker = (disabled, selected, showModal) => {
    const {selectedFloorCategory} = this.state;
    const {Value} = selectedFloorCategory;

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

  handleSelectFloorCategory = selectedFloorCategory => {
    this.setState({selectedFloorCategory});
    return selectedFloorCategory;
  };

  handleSelectFloorCategoryClose = () => {
    const {selectedFloorCategory} = this.state;
    this.setState({selectedFloorCategory});
  };
  renderSelectRoomCategoryPicker = (disabled, selected, showModal) => {
    const {selectedRoomCategory} = this.state;
    const {Value} = selectedRoomCategory;

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

  handleSelectRoomCategory = selectedRoomCategory => {
    this.setState({selectedRoomCategory});
    return selectedRoomCategory;
  };

  handleSelectRoomCategoryClose = () => {
    const {selectedRoomCategory} = this.state;
    this.setState({selectedRoomCategory});
  };
  renderSelectDepartmentCategoryPicker = (disabled, selected, showModal) => {
    const {selectedDepartmentCategory} = this.state;
    const {Value} = selectedDepartmentCategory;

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

  handleSelectDepartmentCategory = selectedDepartmentCategory => {
    this.setState({selectedDepartmentCategory});
    return selectedDepartmentCategory;
  };

  handleSelectDepartmentCategory = () => {
    const {selectedDepartmentCategory} = this.state;
    this.setState({selectedDepartmentCategory});
  };

  onDescriptionChange = changedText => {
    this.setState({complaintDescription: changedText});
  };
  onPressLearnMore = () => {
    try {
      const {
        selectedBuilding,
        selectedFloor,
        selectedRoom,
        selectedDepartment,
      } = this.state;
      // if ((selectedBuilding, selectedFloor, selectedRoom, selectedDepartment)) {
      //   this.props.navigation.navigate('GetDetailSummary');
      // }
      this.props.navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Raise Complaint"
              showSchoolLogo
              nav={this.props.navigation}
            />
            <KeyboardAwareScrollView
              enableOnAndroid
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={styles.formContainer}>
              <View>
                <View style={styles.pickerModelcategory}>
                  <PickerModal
                    items={this.state.buildingCategory}
                    selected={this.state.selectedBuildingCategory}
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
                <View style={styles.pickerModelcategory}>
                  <PickerModal
                    items={this.state.floorCategory}
                    selected={this.state.selectedFloorCategory}
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
                <View style={styles.pickerModelcategory}>
                  <PickerModal
                    items={this.state.RoomCategory}
                    selected={this.state.selectedRoomCategory}
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
                <View style={styles.pickerModelcategory}>
                  <PickerModal
                    items={this.state.DepartmentCategory}
                    selected={this.state.selectedDepartmentCategory}
                    onSelected={this.handleSelectDepartmentCategory}
                    onClosed={this.handleSelectBookCategoryClose}
                    backButtonDisabled
                    showToTopButton={true}
                    showAlphabeticalIndex={true}
                    autoGenerateAlphabeticalIndex={true}
                    searchPlaceholderText="Search"
                    renderSelectView={this.renderSelectDepartmentCategoryPicker}
                  />
                </View>
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

                {/* <TouchableHighlight
              underlayColor="#1ba2de80"
              onPress={this.handleBookSearch}
              style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableHighlight> */}
                <View style={styles.button}>
                  <Button
                    onPress={this.onPressLearnMore}
                    title="Submit"
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
            {/* <ScrollView
          style={styles.profileInnerContent}
          showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.profileInnerContainer}>
              <Picker
                selectedValue={this.state.selectedBuilding}
                onValueChange={this.onBuildingChange}>
                {pickerItems}
              </Picker>
            </View>
            <View style={styles.profileInnerContainer}>
              <Picker
                selectedValue={this.state.selectedFloor}
                onValueChange={this.onFloorChange}>
                {pickerItems2}
              </Picker>
            </View>
            <View style={styles.profileInnerContainer}>
              <Picker
                selectedValue={this.state.selectedRoom}
                onValueChange={this.onRoomChange}>
                {pickerItems3}
              </Picker>
            </View>
            <View style={styles.profileInnerContainer}>
              <Picker
                selectedValue={this.state.selectedDepartment}
                onValueChange={this.onDepartmentChange}>
                {pickerItems4}
              </Picker>
            </View>
            <View style={styles.profileInnerContainer2}>
              <TextInput
                value={this.state.complaintDescription}
                onChangeText={this.onDescriptionChange}
                multiline={true}
                maxLength={300}
                placeholder="Description"
                style={styles.assignmentDescription}
              />
            </View>
            <View style={styles.button}>
              <Button
                onPress={this.onPressLearnMore}
                title="Submit"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView> */}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminRaiseComplaintScreen);
