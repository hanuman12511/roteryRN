import React, {Component} from 'react';
import {View, Alert} from 'react-native';
import {styles} from './styles';
import ImageSlider from 'react-native-image-slider';
import {SafeAreaView} from 'react-native-safe-area-context';

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
import {KEYS, bannerSlider, getBannerSlider} from 'api/UserPreference';

class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      sliderImages: [],
      connectionState: true,

      // appState: AppState.currentState,
    };
    this.bannerSlider = '';
  }

  componentDidMount() {
    this.fetchSliderImages();
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.getRemoteConfig();
    this.fetchData();
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
        let banners = confVal.banners._value;
        await bannerSlider(banners);
      } else {
        Alert.alert('', 'not data activated');
      }
    } catch (err) {}
  };

  fetchData = async () => {
    try {
      const data = await getBannerSlider();
      this.bannerSlider = JSON.parse(data);
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

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }
    console.log(Object.values(this.bannerSlider.slider_banners));
    // Processing data
    const {sliderImages} = this.state;
    const {navigation} = this.props;
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
                images={Object.values(this.bannerSlider.slider_banners)}
              />
            </View>
            <View style={styles.tilesContainer}>
              <View style={styles.tilesRow}>
                <Tile
                  title="DG Message"
                  color="#f2713a"
                  image={ic_date_sheet}
                  nav={navigation}
                />
                <Tile
                  title="Committee"
                  color="#c09960"
                  image={ic_library}
                  nav={navigation}
                />
                <Tile
                  title="Clubs"
                  color="#5366c7"
                  image={ic_attendance}
                  nav={navigation}
                />
              </View>
              <View style={styles.tilesRow}>
                <Tile
                  title="Directory"
                  color="#f17b91"
                  image={ic_assignment_white}
                  nav={navigation}
                />

                <Tile
                  title="Events"
                  color="#982257"
                  image={ic_timetable}
                  nav={navigation}
                />
                <Tile
                  title="Photo Gallery"
                  color="#dec03e"
                  image={ic_gallery}
                  nav={navigation}
                />
              </View>
              <View style={styles.tilesRow}>
                <Tile
                  title="FAQ"
                  color="#ffa000"
                  image={ic_gatepass}
                  nav={navigation}
                />
                <Tile
                  title="Profile"
                  color="#ff2f5d"
                  image={ic_dashboard_profile_white}
                  nav={navigation}
                />
                <Tile
                  title="Notification"
                  color="#335120"
                  image={ic_notice_board}
                  nav={navigation}
                />
              </View>
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
  isSliderGet: sliderSelectors.isSliderGet(state),
});
const mapDispatchToProps = {
  getDashboardSlider: sliderOperations.getDashboardSlider,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
