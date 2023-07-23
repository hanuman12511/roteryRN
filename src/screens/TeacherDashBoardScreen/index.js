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

import offline from 'assets/icons/internetConnectionState.gif';
//data
import {connect} from 'react-redux';
import {sliderOperations, sliderSelectors} from 'idsStore/data/slider';

import {getBannerSlider, getTilesData} from 'api/UserPreference';

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
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchData = async () => {
    try {
      const data = await getBannerSlider();
      const tiles_Data = await getTilesData();
      let sliderData = JSON.parse(data);
      this.bannerSlider = Object.values(sliderData?.slider_banners);
      // let tiles_data = JSON.parse(tiles_Data);
      // console.log('tiles_data', tiles_data);
      this.tiles = tiles_Data.President_tiles;
      this.tileStyle = tiles_Data.President_tiles?.length / 3;
      this.setState({isLoading: false});
      // console.log(
      //   'tiles',
      //   this.bannerSlider,
      //   tiles_Data.President_tiles,
      //   parseInt(this.tileStyle),
      // );
    } catch (error) {
      console.log('banner slider issues', error);
    }
  };

  renderItem = ({item}) => {
    return (
      item?.isVisible && (
        <View style={styles.tilesContainer}>
          <View
            style={{
              height: hp(67) / parseInt(this.tileStyle),
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

            <FlatList
              data={this.tiles}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.itemSeparator}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
              numColumns={3}
            />
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

// import React from 'react';
// import {View, Alert, AppState} from 'react-native';
// import {styles} from './styles';
// import ImageSlider from 'react-native-image-slider';
// import {SafeAreaView} from 'react-native-safe-area-context';

// // Components
// import Tile from 'components/Tile';
// import ScreenHeader from 'components/ScreenHeader';
// import CustomLoader from 'components/CustomLoader';
// // network alert
// import NetInfo from '@react-native-community/netinfo';
// import FastImage from 'react-native-fast-image';
// // Icons
// import ic_attendance from 'assets/icons/ic_dashboard_club.png';
// import ic_fee from 'assets/icons/ic_fee.png';
// import ic_timetable from 'assets/icons/ic_dashboard_events.png';
// import ic_results from 'assets/icons/ic_results.png';
// import ic_library from 'assets/icons/ic_dashboard_members.png';
// import ic_calendar from 'assets/icons/ic_calendar.png';
// import ic_tranport from 'assets/icons/ic_tranport.png';
// import ic_gallery from 'assets/icons/ic_gallery.png';
// import ic_hostel from 'assets/icons/ic_hostel.png';
// import ic_date_sheet from 'assets/icons/ic_date_sheet.png';
// import ic_notification_white from 'assets/icons/ic_notification_white.png';
// import ic_notice_board from 'assets/icons/ic_notice_board.png';
// import ic_assignment_white from 'assets/icons/ic_dashboard_directory.png';
// import ic_multi_student from 'assets/icons/ic_multi_student.png';
// import ic_gatepass from 'assets/icons/ic_dashboard_faq.png';
// import ic_my_suggestion from 'assets/icons/ic_my_suggestion.png';
// import ic_view_profile from 'assets/icons/ic_view_profile.png';
// import ic_dashboard_profile_white from 'assets/icons/ic_dashboard_profile_white.png';
// import offline from 'assets/icons/internetConnectionState.gif';
// //data
// import {connect} from 'react-redux';
// import {sliderOperations, sliderSelectors} from 'idsStore/data/slider';
// import {
//   notificationOperations,
//   notificationSelectors,
// } from 'idsStore/data/notifi';
// import {teacherOperations, teacherSelectors} from 'idsStore/data/teacher';
// // User Preference
// import {getData, getActiveSchool, teacherDesignation} from 'api/UserPreference';

// class DashBoardScreen extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLoading: true,
//       isClassTeacher: false,
//       connectionState: true,
//       sliderImages: [],
//       notificationCount: 0,
//       appState: AppState.currentState,
//     };
//   }

//   componentDidMount() {
//     this.unsubscribe = NetInfo.addEventListener(state => {
//       this.setState({connectionState: state.isConnected});
//     });
//     AppState.addEventListener('change', this.handleAppStateChange);
//     this.fetchSliderImages();
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//     AppState.removeEventListener('change', this.handleAppStateChange);
//   }

//   fetchSliderImages = async () => {
//     try {
//       // const response = await dashboardSlider();
//       await this.props.getDashboardSlider();
//       const response = this.props.isSliderGet;
//       if (this.state.connectionState === true) {
//         if (response.success === 1) {
//           const sliderImages = response.slider.map(item => item.image);
//           this.setState({sliderImages});

//           // fetching notification count
//           await this.fetchNotificationCount();
//           await this.checkTeachProfile();
//         } else {
//           // fetching notification count
//           await this.checkTeachProfile();
//           await this.fetchNotificationCount();
//           this.setState({sliderImages: [], isLoading: false});
//         }
//       } else {
//         this.setState({isLoading: false});
//       }
//     } catch (error) {
//       Alert.alert('', error);
//       console.log(error.message);
//     }
//   };

//   fetchNotificationCount = async () => {
//     try {
//       // fetching active school from local storage
//       const activeSchool = await getActiveSchool();
//       if (!activeSchool) {
//         return;
//       }

//       // fetching empId from local storage
//       const userInfo = await getData();

//       if (userInfo) {
//         const {idsprimeID} = activeSchool;
//         const {empId} = userInfo;

//         // preparing params
//         const params = {
//           userId: empId,
//           login_type: 'Teacher',
//           idsprimeID,
//         };

//         // calling api
//         await this.props.getNotificationCount(params);
//         const response = this.props.isGetNotificationCount;

//         // processing response
//         if (response) {
//           const {success} = response;

//           if (success === 1) {
//             const {notificationCount} = response;
//             this.setState({notificationCount, isLoading: false});
//           } else {
//             this.setState({notificationCount: 0, isLoading: false});
//             //Alert.alert('', response.message);
//           }
//         } else {
//           this.setState({notificationCount: 0, isLoading: false});
//           //Alert.alert('', response.message);
//         }
//       }
//     } catch (error) {
//       Alert.alert('', error);
//       console.log(error.message);
//     }
//   };

//   // Checking its callTeacher or not
//   checkTeachProfile = async () => {
//     try {
//       await this.props.getTeacherInfo();
//       const response = this.props.isGetTeacherInfo;
//       if (response && response.success === 1) {
//         const {details} = response;
//         const {designation} = details;

//         if (designation === 'Class Teacher') {
//           await teacherDesignation(designation);

//           this.setState({isClassTeacher: true});
//         } else {
//           await teacherDesignation(designation);

//           this.setState({isClassTeacher: false});
//         }
//       } else {
//         this.setState({isClassTeacher: false});
//       }
//     } catch (error) {}
//   };

//   handleAppStateChange = async nextAppState => {
//     try {
//       const {appState} = this.state;
//       if (appState.match(/inactive|background/) && nextAppState === 'active') {
//         await this.fetchNotificationCount();
//         await this.checkTeachProfile();
//       }

//       this.setState({appState: nextAppState});
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   render() {
//     if (this.state.isLoading) {
//       return <CustomLoader />;
//     }

//     // Processing data
//     const {sliderImages, notificationCount} = this.state;
//     const {navigation} = this.props;

//     return (
//       <SafeAreaView style={styles.container}>
//         {this.state.connectionState && (
//           <>
//             <ScreenHeader title="Home" showSchoolLogo nav={navigation} />

//             <View style={styles.imageSliderContainer}>
//               <ImageSlider
//                 loop
//                 loopBothSides
//                 autoPlayWithInterval={2000}
//                 images={sliderImages}
//               />
//             </View>

//             <View style={styles.tilesContainer}>
//               <View style={styles.tilesRow}>
//                 <Tile
//                   title="DG Message"
//                   color="#f2713a"
//                   image={ic_date_sheet}
//                   nav={navigation}
//                 />
//                 <Tile
//                   title="Committee"
//                   color="#c09960"
//                   image={ic_library}
//                   nav={navigation}
//                 />
//                 <Tile
//                   title="Clubs"
//                   color="#5366c7"
//                   image={ic_attendance}
//                   nav={navigation}
//                 />
//               </View>
//               <View style={styles.tilesRow}>
//                 <Tile
//                   title="Directory"
//                   color="#f17b91"
//                   image={ic_assignment_white}
//                   nav={navigation}
//                 />

//                 <Tile
//                   title="Events"
//                   color="#982257"
//                   image={ic_timetable}
//                   nav={navigation}
//                 />
//                 <Tile
//                   title="Photo Gallery"
//                   color="#dec03e"
//                   image={ic_gallery}
//                   nav={navigation}
//                 />
//               </View>
//               <View style={styles.tilesRow}>
//                 <Tile
//                   title="FAQ"
//                   color="#ffa000"
//                   image={ic_gatepass}
//                   nav={navigation}
//                 />
//                 <Tile
//                   title="Profile"
//                   color="#ff2f5d"
//                   image={ic_dashboard_profile_white}
//                   nav={navigation}
//                 />
//                 {notificationCount !== 0 ? (
//                   <Tile
//                     title="Notification"
//                     color="#eea023"
//                     // image={ic_notice_board}
//                     image={require('assets/images/79167-notification-bell.gif')}
//                     nav={navigation}
//                     showNotification
//                     notificationCount={notificationCount}
//                   />
//                 ) : (
//                   <Tile
//                     title="Notification"
//                     color="#eea023"
//                     image={ic_notice_board}
//                     // image={require('assets/images/79167-notification-bell.gif')}
//                     nav={navigation}
//                     showNotification
//                     notificationCount={notificationCount}
//                   />
//                 )}
//               </View>
//             </View>
//           </>
//         )}
//         {this.state.connectionState === false ? (
//           <View style={styles.offlineStyle}>
//             <FastImage source={offline} style={styles.networkIssue} />
//           </View>
//         ) : null}
//       </SafeAreaView>
//     );
//   }
// }
// const mapStateToProps = state => ({
//   isSliderGet: sliderSelectors.isSliderGet(state),
//   isGetNotificationCount: notificationSelectors.isGetNotificationCount(state),
//   isGetTeacherInfo: teacherSelectors.isGetTeacherInfo(state),
// });
// const mapDispatchToProps = {
//   getDashboardSlider: sliderOperations.getDashboardSlider,
//   getNotificationCount: notificationOperations.getNotificationCount,
//   getTeacherInfo: teacherOperations.getTeacherInfo,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
