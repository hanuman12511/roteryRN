import React, {Component} from 'react';
import {View, StyleSheet, Alert, AppState, StatusBar} from 'react-native';
import {styles} from './styles';
import ImageSlider from 'react-native-image-slider';
import {SafeAreaView} from 'react-native-safe-area-context';

//cache management
import clear from 'react-native-clear-cache-lcm';

// Components
import Tile from 'components/Tile';
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
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

import B1 from 'assets/images/B1.jpeg';
import B2 from 'assets/images/B2.jpeg';
import B3 from 'assets/images/B3.jpeg';
//data
import {connect} from 'react-redux';
import {sliderOperations, sliderSelectors} from 'idsStore/data/slider';
import {
  notificationOperations,
  notificationSelectors,
} from 'idsStore/data/notifi';

// User Preference
import {getActiveSchool, getActiveStudent} from 'api/UserPreference';

// // Delegates
// import {
//   isAppOpenedByRemoteNotificationWhenAppClosed,
//   resetIsAppOpenedByRemoteNotificationWhenAppClosed,
// } from '../firebase_api/FirebaseAPI';

class DashBoardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      connectionState: true,
      sliderImages: [(image = B1), (image = B2), (image = B3)],
      notificationCount: 0,
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    clear.runClearCache(() => {
      console.log('data clear');
    });
    AppState.addEventListener('change', this.handleAppStateChange);
    this.fetchSliderImages();
  }

  componentWillUnmount() {
    this.unsubscribe();
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  fetchSliderImages = async () => {
    try {
      // const response = await dashboardSlider();
      await this.props.getDashboardSlider();
      const response = this.props.isSliderGet;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          if (response.slider !== null) {
            const sliderImages = response.slider.map(item => item.image);

            const postStateUpdateCallback = async () => {
              try {
                // fetching notification count
                await this.fetchNotificationCount();
              } catch (error) {
                console.log(error.message);
              }
            };

            this.setState({isLoading: false}, postStateUpdateCallback);
          } else {
            await this.fetchNotificationCount();
            this.setState({sliderImages: [], isLoading: false});
          }
        } else {
          //Alert.alert('', response.message);
          const postStateUpdateCallback = async () => {
            try {
              // fetching notification count
              await this.fetchNotificationCount();
            } catch (error) {
              console.log(error.message);
            }
          };
          this.setState(
            {sliderImages: [], isLoading: false},
            postStateUpdateCallback,
          );
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  fetchNotificationCount = async () => {
    try {
      // fetching active school from local storage
      const activeSchool = await getActiveSchool();

      // fetching activeStudentId from local storage
      const activeStudentId = await getActiveStudent();
      if (this.state.connectionState === true) {
        if (activeSchool && activeStudentId) {
          const {idsprimeID} = activeSchool;

          // preparing params
          const params = {
            userId: activeStudentId,
            login_type: 'Student',
            idsprimeID,
          };

          // calling api
          await this.props.getNotificationCount(params);
          const response = this.props.isGetNotificationCount;

          // processing response
          if (response) {
            const {success} = response;

            if (success === 1) {
              const {notificationCount} = response;
              this.setState({notificationCount});
            }
          } else {
            //Alert.alert('', response.message);
          }
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handleAppStateChange = async nextAppState => {
    try {
      const {appState} = this.state;
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        await this.fetchNotificationCount();
      }

      this.setState({appState: nextAppState});
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }

    // Processing data
    const {sliderImages, notificationCount} = this.state;
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <StatusBar backgroundColor="#02abe3" barStyle="light-content" />
            <ScreenHeader
              title="Home"
              studentListIcon={ic_multi_student}
              showSchoolLogo
              nav={navigation}
            />

            <View style={styles.imageSliderContainer}>
              <ImageSlider
                loop
                loopBothSides
                autoPlayWithInterval={2000}
                images={sliderImages}
              />
            </View>

            <View style={styles.tilesContainer}>
              <View style={styles.tilesRow}>
                <Tile
                  title="Clubs"
                  color="#5366c7"
                  image={ic_attendance}
                  nav={navigation}
                />
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
              </View>

              <View style={styles.tilesRow}>
                <Tile
                  title="Photo Gallery"
                  color="#dec03e"
                  image={ic_gallery}
                  nav={navigation}
                />
                {/* shifted here from below row(to be removed) */}
                {notificationCount !== 0 ? (
                  <Tile
                    title="Notification"
                    color="#33a375"
                    image={ic_notification_white}
                    nav={navigation}
                    showNotification
                    notificationCount={notificationCount}
                  />
                ) : (
                  <Tile
                    title="Notification"
                    color="#33a375"
                    image={ic_notification_white}
                    nav={navigation}
                    showNotification
                    notificationCount={notificationCount}
                  />
                )}
                <Tile
                  title="Member List"
                  color="#c09960"
                  image={ic_library}
                  nav={navigation}
                />
              </View>

              <View style={styles.tilesRow}>
                <Tile
                  title="Calendar"
                  color="#eea023"
                  image={ic_calendar}
                  nav={navigation}
                />

                <Tile
                  title="President Message"
                  color="#f2713a"
                  image={ic_date_sheet}
                  nav={navigation}
                />
                <Tile
                  title="Faq"
                  color="#33a375"
                  image={ic_gatepass}
                  nav={navigation}
                />
              </View>
              {/* <View style={styles.tilesRow}>
                <Tile
                  title="Gate Pass"
                  color="#33a375"
                  image={ic_gatepass}
                  nav={navigation}
                />
                <Tile
                  title="My Suggestion"
                  color="#9b2a3e"
                  image={ic_my_suggestion}
                  nav={navigation}
                />
                <Tile
                  title="Photo Gallery"
                  color="#dec03e"
                  image={ic_gallery}
                  nav={navigation}
                />
              </View> */}
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
  isGetNotificationCount: notificationSelectors.isGetNotificationCount(state),
});
const mapDispatchToProps = {
  getDashboardSlider: sliderOperations.getDashboardSlider,
  getNotificationCount: notificationOperations.getNotificationCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
