import React, {Component} from 'react';
import {View, Alert, FlatList, Dimensions} from 'react-native';
import {styles} from './styles';
import ImageSlider from 'react-native-image-slider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Components
import Tile from 'components/Tile';
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
// Icons
import ic_attendance from 'assets/icons/ic_dashboard_club.png';
import ic_fee from 'assets/icons/ic_fee.png';
import ic_timetable from 'assets/icons/ic_dashboard_events.png';
import ic_results from 'assets/icons/ic_results.png';
import ic_library from 'assets/icons/ic_dashboard_members.png';
import ic_calendar from 'assets/icons/ic_calendar.png';
import ic_tranport from 'assets/icons/ic_tranport.png';
import ic_gallery from 'assets/icons/ic_gallery.png';
import ic_hostel from 'assets/icons/ic_hostel.png';
import ic_date_sheet from 'assets/icons/ic_date_sheet.png';
import ic_notification_white from 'assets/icons/ic_notification_white.png';
import ic_notice_board from 'assets/icons/ic_notice_board.png';
import ic_assignment_white from 'assets/icons/ic_dashboard_directory.png';
import ic_multi_student from 'assets/icons/ic_multi_student.png';
import ic_gatepass from 'assets/icons/ic_dashboard_faq.png';
import ic_my_suggestion from 'assets/icons/ic_my_suggestion.png';
import ic_view_profile from 'assets/icons/ic_view_profile.png';
import ic_dashboard_profile_white from 'assets/icons/ic_dashboard_profile_white.png';
import offline from 'assets/icons/internetConnectionState.gif';
//data
import {connect} from 'react-redux';
import {sliderOperations, sliderSelectors} from 'idsStore/data/slider';

import remoteConfig from '@react-native-firebase/remote-config';
import {
  bannerSlider,
  getBannerSlider,
  storeTilesData,
  getTilesData,
} from 'api/UserPreference';
const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      sliderImages: [],
      connectionState: true,

      // appState: AppState.currentState,
    };
  }

  componentDidMount() {
    this.fetchSliderImages();
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.getRemoteConfig();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchSliderImages = async () => {
    try {
      // const response = await dashboardSlider();
      await this.props.getDashboardSlider();
      const response = this.props.isSliderGet;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          const sliderImages = response.slider.map(item => item.image);
          this.setState({sliderImages, isLoading: false});

          // fetching notification count
          // await this.fetchNotificationCount();
        } else {
          this.setState({sliderImages: [], isLoading: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getRemoteConfig = async () => {
    try {
      console.log('data RC 1');
      await remoteConfig().setDefaults({
        banners: 'https://www.daac.in/api/mobile/',
      });
      console.log('data RC 2');
      await remoteConfig().setConfigSettings({
        isDeveloperModeEnabled: __DEV__,
      });
      console.log('data RC 3');
      await remoteConfig().fetch(10);
      console.log('data RC 4');
      const activated = await remoteConfig().activate();
      // const activated = await remoteConfig().fetchAndActivate();
      console.log('data RC 5', activated);
      if (activated) {
        console.log('data activated');
        let confVal = await remoteConfig().getAll();
        // let confVal = remoteConfig().getValue('base_url').asString();
        let tiles = confVal?.tileManager?._value;
        let banners = confVal?.banners?._value;
        let slider_data = JSON.parse(banners);
        let sliderBanner = Object.values(slider_data?.slider_banners);
        let tiles_Data = JSON.parse(tiles);
        let tiles_data = Object.values(tiles_Data);
        this.bannerSlider = sliderBanner;
        this.tiles = tiles_data;
        // console.log('data', this.bannerSlider, this.tiles);
        await bannerSlider(banners);
        await storeTilesData(tiles_data);
        await this.fetchData();
      } else {
        await this.fetchData();
        Alert.alert('', 'not data activated');
      }
    } catch (err) {}
  };

  fetchData = async () => {
    try {
      const data = await getBannerSlider();
      const tiles_Data = await getTilesData();
      let sliderData = JSON.parse(data);
      this.bannerSlider = Object.values(sliderData?.slider_banners);
      // let tiles_data = JSON.parse(tiles_Data);
      // console.log('tiles_data', tiles_data);
      this.tiles = tiles_Data;
      this.tileStyle = this.tiles[0]?.length / 3;
      // console.log('tiles', tiles_Data);
    } catch (error) {
      console.log('banner slider issues', error);
    }
  };

  // fetchNotificationCount = async () => {
  //   try {
  //     // fetching active school from local storage
  //     const activeSchool = await getActiveSchool();
  //     if (!activeSchool) {
  //       return;
  //     }

  //     // fetching empId from local storage
  //     const userInfo = await getData();

  //     if (userInfo) {
  //       const {idsprimeID} = activeSchool;
  //       const {empId} = userInfo;

  //       // preparing params
  //       const params = {
  //         userId: empId,
  //         login_type: 'Admin',
  //         idsprimeID,
  //       };

  //       // calling api
  //       const response = await makeRequest(
  //         BASE_URL + 'getNotificationCount',
  //         params,
  //       );

  //       // processing response
  //       if (response) {
  //         const {success} = response;

  //         if (success === 1) {
  //           const {notificationCount} = response;
  //           this.setState({notificationCount, isLoading: false});
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // handleAppStateChange = async nextAppState => {
  //   try {
  //     const {appState} = this.state;
  //     if (appState.match(/inactive|background/) && nextAppState === 'active') {
  //       await this.fetchNotificationCount();
  //     }

  //     this.setState({appState: nextAppState});
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  renderItem = ({item}) => {
    return (
      item?.isVisible && (
        <View style={styles.tilesContainer}>
          <View
            style={{
              height: hp(67) / this.tileStyle,
              justifyContent: 'space-between',
            }}>
            <Tile
              title={item?.name}
              color={item?.color}
              image={item?.image}
              nav={this.props.navigation}
            />
          </View>
        </View>
      )
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }
    // Processing data
    const {sliderImages} = this.state;
    const {navigation} = this.props;
    console.log();
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Home"
              nav={navigation}
              // showSearchIcon
              showSchoolLogo
            />
            <View style={styles.imageSliderContainer}>
              <ImageSlider
                loop
                loopBothSides
                autoPlayWithInterval={2000}
                images={this.bannerSlider}
              />
            </View>

            {this.tiles?.map(data => (
              <FlatList
                data={data}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.itemSeparator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContentContainer}
                numColumns={3}
              />
            ))}
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
  isSliderGet: sliderSelectors.isSliderGet(state),
});
const mapDispatchToProps = {
  getDashboardSlider: sliderOperations.getDashboardSlider,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
