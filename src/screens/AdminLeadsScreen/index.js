import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ScreenHeader from 'components/ScreenHeader';
// icons
import ic_enquiry_info from 'assets/icons/ic_enquiry_info.png';
import CustomLoader from 'components/CustomLoader';
import AdminEnquiryComponent from './componentScreen/AdminEnquiryComponent';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

class AdminResultComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      visitors: ['Hello', 'hello'],
      currentDate: null,
      status: null,
      isListRefreshing: false,
      showPopupScreen: false,
      connectionState: true,
      popUpData: '',
      results: [],
      addAssignmentButtonZIndex: 0,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.handleResultData();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  handleResultData = async () => {
    try {
      await this.props.getAdminLeadManagement();
      const response = this.props.isGetAdminLeadManagement;
      if (this.state.connectionState === true) {
        if (response && response.success === 1) {
          const {results} = response;
          console.log(results[0]);
          this.setState({
            results: results,
            isLoading: false,
            isListRefreshing: false,
          });
        } else {
          //Alert.alert('', response.message);
          this.setState({
            results: [],
            isLoading: false,
            isListRefreshing: false,
          });
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log('error in handle result data', error);
    }
  };
  handlePressEnquiryButton = value => {
    this.setState({showPopupScreen: true, popUpData: value});
  };
  renderItem = ({item}) => {
    const listStyle = {
      // borderLeftWidth: 3,
      // backgroundColor: item.bg,
      backgroundColor:
        '#' +
        (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
        0x15,
      // backgroundColor: '#fff',
      borderRadius: 2,
      // padding: wp(1),
      flexDirection: 'row',
      alignItems: 'flex-start',
      alignItems: 'center',
      padding: wp(3),
      borderWidth: 1,
      borderColor: '#00000015',
    };

    return (
      <TouchableOpacity
        onPress={() => this.handlePressEnquiryButton(item)}
        style={listStyle}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.listText}>
              {item.name} <Text style={styles.listText2}>({item.class})</Text>
            </Text>
            <View style={styles.listData}>
              <Text style={styles.listText2}>Mobile </Text>
              <Text style={styles.listText3}>-</Text>
              <Text style={styles.listText4}>{item.mobile}</Text>
            </View>
            <View style={styles.listData}>
              <Text style={styles.listText2}>Mode </Text>
              <Text style={styles.listText3}>-</Text>
              <Text style={styles.listText4}>{item.mode}</Text>
            </View>
            <View style={styles.listData}>
              <Text style={styles.listText2}>FollowUp</Text>
              <Text style={styles.listText3}>-</Text>
              <Text style={styles.listText4}>{item.followup_date}</Text>
            </View>
            <View style={styles.listData}>
              <Text style={styles.listText2}>Enquiry</Text>
              <Text style={styles.listText3}>-</Text>
              <Text style={styles.listText4}>{item.enquiry_date}</Text>
            </View>
            <Text style={styles.listText5}>{item.remark}</Text>
          </View>
          <TouchableOpacity onPress={() => this.handlePressEnquiryButton(item)}>
            <Image source={ic_enquiry_info} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  handleDownload = async value => {
    try {
      console.log(value);
      const url = value.result_link;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(url);
        // showToast('Unable to handle this url!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;
  closePopup = () => {
    this.setState({showPopupScreen: false});
  };
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.handleResultData();
    } catch (error) {
      console.log(error.message);
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
              title="Leads Management"
              showSchoolLogo
              nav={this.props.navigation}
            />
            <FlatList
              data={this.state.results}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.itemSeparator}
              contentContainerStyle={styles.listContentContainer}
              refreshing={this.state.isListRefreshing}
              onRefresh={this.handleListRefresh}
            />
            {this.state.showPopupScreen && (
              <AdminEnquiryComponent
                closePopup={this.closePopup}
                nav={this.props.navigation}
                item={this.state.popUpData}
              />
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

const mapStateToProps = state => ({
  isGetAdminLeadManagement: adminSelectors.isGetAdminLeadManagement(state),
});
const mapDispatchToProps = {
  getAdminLeadManagement: adminOperations.getAdminLeadManagement,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminResultComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listText: {
    flex: 1,
    fontSize: wp(4),
    fontWeight: '700',
  },
  listText2: {
    flex: 1,
    fontSize: wp(3),
    fontWeight: '400',
  },
  listText3: {
    paddingRight: wp(2),
    fontSize: wp(3),
    fontWeight: '400',
  },
  listText4: {
    flex: 2,
    fontSize: wp(3),
    fontWeight: '400',
  },
  listText5: {
    marginTop: wp(2),
    fontSize: wp(3),
    fontWeight: '400',
  },
  icon: {
    height: wp(6),
    aspectRatio: 1 / 1,
  },
  listContentContainer: {
    padding: wp(2),
  },
  separator: {
    height: wp(2),
  },
  listData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
