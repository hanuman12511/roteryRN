import React, {Component} from 'react';
import {View} from 'react-native';
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
import ic_attendance from 'assets/icons/ic_attendance.png';
import staffAttendance from 'assets/icons/staffAttendance.png';
import ic_fee from 'assets/icons/ic_fee.png';
import ic_timetable from 'assets/icons/ic_timetable.png';
import ic_library from 'assets/icons/ic_library.png';
import ic_calendar from 'assets/icons/ic_calendar.png';
import ic_date_sheet from 'assets/icons/ic_date_sheet.png';
import ic_notice_board from 'assets/icons/ic_notice_board.png';
import StudentSummary from 'assets/icons/StudentSummary.png';
import schoolProfile from 'assets/icons/schoolProfile.png';
import ic_HomeWork from 'assets/icons/ic_HomeWork.png';
import ic_TeacherDetail from 'assets/icons/ic_TeacherDetail.png';
import visitorCard from 'assets/icons/visitorCard.png';
import ic_feedback from 'assets/icons/ic_feedback.png';
import ic_complaint from 'assets/icons/ic_complaint.png';
import ic_gallery from 'assets/icons/ic_gallery_white.png';
import lead_management from 'assets/icons/lead_management.png';
import Prospectus_manager from 'assets/icons/Prospectus_manager.png';
import offline from 'assets/icons/internetConnectionState.gif';
//data
import {connect} from 'react-redux';
import {sliderOperations, sliderSelectors} from 'idsStore/data/slider';

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
                images={sliderImages}
              />
            </View>
            <View style={styles.tilesContainer}>
              <View style={styles.tilesRow}>
                <Tile
                  title="School Profile"
                  color="#e80000"
                  image={schoolProfile}
                  nav={navigation}
                />
                <Tile
                  title="Staff Attendance"
                  color="#c850b0"
                  image={staffAttendance}
                  nav={navigation}
                />
                <Tile
                  title="Student Summary"
                  color="#1e73be"
                  image={StudentSummary}
                  nav={navigation}
                />
              </View>
              <View style={styles.tilesRow}>
                <Tile
                  title="Student Attendance"
                  color="#660a60"
                  image={ic_attendance}
                  nav={navigation}
                />
                <Tile
                  title="Homework"
                  color="#d4ab70"
                  image={ic_HomeWork}
                  nav={navigation}
                />
                <Tile
                  title="Teacher Detail"
                  color="#982257"
                  image={ic_TeacherDetail}
                  nav={navigation}
                />
              </View>
              <View style={styles.tilesRow}>
                <Tile
                  title="Fees"
                  color="#f51663"
                  image={ic_fee}
                  nav={navigation}
                />
                <Tile
                  title="Time Table"
                  color="#fd7f20"
                  image={ic_timetable}
                  nav={navigation}
                />
                <Tile
                  title="Notification"
                  color="#335120"
                  image={ic_notice_board}
                  nav={navigation}
                />
              </View>
              <View style={styles.tilesRow}>
                <Tile
                  title="Library"
                  color="#905fd0"
                  image={ic_library}
                  nav={navigation}
                />
                <Tile
                  title="Calendar"
                  color="#657f6d"
                  image={ic_calendar}
                  nav={navigation}
                />
                <Tile
                  title="Date Sheet/Syllabus"
                  color="#3e004a"
                  image={ic_date_sheet}
                  nav={navigation}
                />
                {/* <Tile
              title="Transport"
              color="#0d5f8a"
              image={ic_tranport}
              nav={navigation}
            />
            <Tile
              title="Hostel"
              color="#d15a50"
              image={ic_hostel}
              nav={navigation}
            /> */}
              </View>
              <View style={styles.tilesRow}>
                <Tile
                  title="Visitor"
                  color="#d15a50"
                  image={visitorCard}
                  nav={navigation}
                />
                <Tile
                  title="Raise Complaint"
                  color="#594f92"
                  image={ic_feedback}
                  nav={navigation}
                />
                <Tile
                  title="Photo Gallery"
                  color="#0d5f8a"
                  image={ic_gallery}
                  nav={navigation}
                />
              </View>
              <View style={styles.tilesRow}>
                <Tile
                  title="Leads"
                  color="#d15a50"
                  image={lead_management}
                  nav={navigation}
                />
                <Tile
                  title="Prospectus"
                  color="#594f92"
                  image={Prospectus_manager}
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
