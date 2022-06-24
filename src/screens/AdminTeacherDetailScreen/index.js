import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import {Menu, MenuItem, MenuDivider} from 'react-native-material-menu';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ic_search_black from 'assets/icons/ic_search_black.png';
import ic_drop_down_arrow from 'assets/icons/ic_drop_down_arrow.png';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// Components
import ScreenHeader from 'components/ScreenHeader';
import TeacherListComponent from './TeacherListComponent';

import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

let pickerItems = [
  <Picker.Item label="Teaching Staff" value="teacherData" key={0} />,
  <Picker.Item label="Non-Teaching Staff" value="nonTeacherData" key={1} />,
];

class AdminTeacherDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false, // get in true by default
      selectedStaffType: 'teacherData',
      selectedStaffName: 'Teaching Staff',
      teacherData: null,
      nonTeacherData: null,
      teacherDataTemp: null,
      nonTeacherDataTemp: null,
      searchText: '',
      infoArr: null,
      status: null,
      connectionState: true,
      isListRefreshing: false,
      isMenuVisible2: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => this.handleStaffDataList(),
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription;
  }

  handleStaffDataList = async () => {
    try {
      await this.props.getTeacherListData();
      const response = this.props.isGetTeacherListData;
      if (this.state.connectionState === true) {
        if (response) {
          if (response.success === 1) {
            const {teacherData, nonTeacherData} = response;
            this.setState({
              teacherData,
              nonTeacherData,
              isListRefreshing: false,
              isLoading: false,
              teacherDataTemp: teacherData,
              nonTeacherDataTemp: nonTeacherData,
            });
          } else {
            //Alert.alert('', response.message);
            this.setState({
              teacherData: null,
              nonTeacherData: null,
              isListRefreshing: false,
              isLoading: false,
            });
          }
        } else {
          //Alert.alert('', response.message);
          this.setState({
            teacherData: null,
            nonTeacherData: null,
            isListRefreshing: false,
            isLoading: false,
          });
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log('error in teacher Details', error);
    }
  };

  onStaffTypeChange = (itemValue, itemName) => () => {
    try {
      this.setState({
        // reset class-section
        selectedStaffType: itemValue,
        selectedStaffName: itemName,
        isMenuVisible2: false,
      });
    } catch (error) {
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  handleSearch = searchText => {
    this.setState({searchText});
    const searchTextLength = searchText.length;
    if (this.state.selectedStaffType === 'teacherData') {
      var searchResponse = this.state.teacherData;
    } else {
      var searchResponse = this.state.nonTeacherData;
    }
    if (searchTextLength === 0 || searchTextLength >= 1) {
      const infoArr =
        this.state.selectedStaffType === 'teacherData'
          ? this.state.teacherDataTemp
          : this.state.nonTeacherDataTemp;
      const filteredData = infoArr.filter(item => {
        const searchPattern = searchText;
        // const searchPattern = searchText;
        const {name, dob, mobile} = item;
        let data = name;
        let data2 = dob;
        let data3 = mobile;
        let found = data.indexOf(searchPattern) > -1;
        let found1 = data2.indexOf(searchPattern) > -1;
        let found2 = data3.indexOf(searchPattern) > -1;

        let {selected} = item;
        selected = false;

        if (!found || !found1 || !found2) {
          const {name, dob, mobile} = item;
          data = name;
          data2 = dob;
          data3 = mobile;
          found = data.indexOf(searchText) > -1;
          found1 = data2.indexOf(searchText) > -1;
          found2 = data3.indexOf(searchText) > -1;
          // found = data.indexOf(searchText) > -1;
        }
        return found || found1 || found2;
      });
      if (this.state.selectedStaffType === 'teacherData') {
        this.setState({teacherData: filteredData});
      } else {
        this.setState({nonTeacherData: filteredData});
      }
    }
    if (searchTextLength === 0) {
      if (this.state.selectedStaffType === 'teacherData') {
        this.setState({teacherData: searchResponse});
      } else {
        this.setState({nonTeacherData: searchResponse});
      }
    }
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.handleStaffDataList();
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item}) => {
    return <TeacherListComponent item={item} nav={this.props.navigation} />;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
    pickerItems = [...pickerItems];

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Teacher Detail"
              showSchoolLogo
              nav={this.props.navigation}
            />

            <View style={{flexDirection: 'row', padding: wp(1)}}>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.inputData}
                  placeholder="Search"
                  onChangeText={value => this.handleSearch(value)}
                  value={this.state.searchText}
                />
                <Image
                  source={ic_search_black}
                  resizeMode="cover"
                  style={styles.searchIcon}
                />
              </View>

              <View style={styles.profileInnerContainer}>
                {/* <Picker
              style={{
                width: 120,
                transform: [{scale: 0.8}],
              }}
              selectedValue={this.state.selectedStaffType}
              onValueChange={this.onStaffTypeChange}>
              {pickerItems}
            </Picker> */}
                <View
                  style={{
                    width: 120,
                    transform: [{scale: 0.8}],
                  }}>
                  <Menu
                    visible={this.state.isMenuVisible2}
                    anchor={
                      <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                          this.setState({isMenuVisible2: true});
                        }}>
                        <Text>{this.state.selectedStaffName}</Text>
                        <Image
                          source={ic_drop_down_arrow}
                          resizeMode="cover"
                          style={styles.showMoreIcon}
                        />
                      </TouchableOpacity>
                    }
                    onRequestClose={() => {
                      this.setState({isMenuVisible2: false});
                    }}>
                    <MenuItem
                      onPress={this.onStaffTypeChange(
                        'teacherData',
                        'Teaching Staff',
                      )}>
                      Teaching Staff
                    </MenuItem>
                    <MenuItem
                      onPress={this.onStaffTypeChange(
                        'nonTeacherData',
                        'Non-Teaching Staff',
                      )}>
                      Non-Teaching Staff
                    </MenuItem>
                  </Menu>
                </View>
              </View>
            </View>

            <View style={styles.profileInnerContent}>
              <FlatList
                data={
                  this.state.selectedStaffType === 'teacherData'
                    ? this.state.teacherData
                    : this.state.nonTeacherData
                }
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.itemSeparator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: wp(2),
                  paddingBottom: wp(2),
                }}
                refreshing={this.state.isListRefreshing}
                onRefresh={this.handleListRefresh}
                extraData={this.state.selectedStaffType}
              />
            </View>
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
  isGetTeacherListData: adminSelectors.isGetTeacherListData(state),
});

const mapDispatchToProps = {
  getTeacherListData: adminOperations.getTeacherListData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminTeacherDetailScreen);
