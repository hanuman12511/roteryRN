import React, {Component} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  View,
  Animated,
} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

//Firebase API
import {
  checkPermission,
  createOnTokenRefreshListener,
  removeOnTokenRefreshListener,
  createNotificationListeners,
  removeNotificationListeners,
} from './src/firebase_api';

// network alert
import InternetConnectionAlert from 'react-native-internet-connection-alert';

// root toast support library
import {RootSiblingParent} from 'react-native-root-siblings';
// Routes
import {nsSetTopLevelNavigator} from './src/routes/NavigationService';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import DashBoardScreen from './src/screens/DashBoardScreen';
import TeacherDashBoardScreen from './src/screens/TeacherDashBoardScreen';
import AdminDashBoardScreen from './src/screens/AdminDashBoardScreen';
import AdminSearchScreen from './src/screens/AdminSearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import StudentChangePasswordScreen from './src/screens/StudentChangePasswordScreen';
import TeacherChangePasswordScreen from './src/screens/TeacherChangePasswordScreen';
import TeacherNotificationScreen from './src/screens/TeacherNotificationScreen';
import StudentNotificationScreen from './src/screens/StudentNotificationScreen';
import StudentNotificationDetail from './src/screens/StudentNotificationDetailscreen';
import AdminNoticeBoardScreen from './src/screens/AdminNoticeBoardScreen';
import StudentListScreen from './src/screens/StudentListScreen';
import SchoolListScreen from './src/screens/SchoolListScreen';
import SplashScreen from './src/screens/SplashScreen';
import UpdateTeacherPhoto from './src/screens/ProfileScreen/updateTeacherPhoto';

// FAQ Screen
import FaqTabScreen from 'screens/FaqTabScreen';
import FAQScreen from 'screens/FAQScreen/FAQScreen';
import FAQQuestionsScreen from 'screens/FAQQuestionsScreen';
import FAQAnsScreen from 'screens/FAQAnsScreen/FAQAnsScreen';

// Member List
import MemberList from './src/screens/MemberList';
import MemberDetailScreen from './src/screens/MemberDetailScreen';
// Directory
import DirectoryScreen from './src/screens/DirectoryScreen';
// Event
import EventsScreen from './src/screens/EventsScreen';
import EventsDetailScreen from './src/screens/EventsDetailScreen';
// Clubs
import ClubsScreen from './src/screens/ClubsScreen';
import ClubsDetailScreen from './src/screens/ClubsDetailScreen';

// DG Message
import DGMessageScreen from './src/screens/DGMessageScreen';

//admin photo gallery screens
import GalleryTabScreen from './src/screens/GalleryTabScreen';
import PhotoGalleryFolderScreen from './src/screens/AdminPhotoGalleryScreens/PhotoGalleryFolderScreen';
import PhotoGalleryScreen from './src/screens/AdminPhotoGalleryScreens/PhotoGalleryScreen';
import PhotoGalleryViewerScreen from './src/screens/AdminPhotoGalleryScreens/PhotoGalleryViewerScreen';

import rotary_logo from './src/assets/images/rotary-logo.png';
import ic_home_black from './src/assets/icons/drawer_icons/ic_home_black.png';
import ic_logout_black from './src/assets/icons/drawer_icons/ic_logout_black.png';
import ic_notice_board_black from './src/assets/icons/drawer_icons/ic_notice_board_black.png';
import ic_gallery from './src/assets/icons/drawer_icons/ic_gallery.png';
import ic_change_password from './src/assets/icons/drawer_icons/ic_change_password.png';
import ic_view_profile_black from './src/assets/icons/drawer_icons/ic_view_profile_black.png';
import ic_notification from './src/assets/icons/drawer_icons/ic_notification.png';
import ic_dashboard_club from './src/assets/icons/drawer_icons/ic_dashboard_club_black.png';
import ic_dashboard_directory from './src/assets/icons/drawer_icons/ic_dashboard_directory_black.png';
import ic_dashboard_events from './src/assets/icons/drawer_icons/ic_dashboard_events_black.png';
import ic_dashboard_faq from './src/assets/icons/drawer_icons/ic_dashboard_faq_black.png';
import ic_dashboard_members from './src/assets/icons/drawer_icons/ic_dashboard_members_black.png';
import ic_dg_message from './src/assets/icons/drawer_icons/ic_dg_message.png';

// User Preference
import {
  getRoleId,
  clearData,
  getTeacherDesignation,
} from './src/api/UserPreference';

// Style Sheet
const styles = StyleSheet.create({
  drawerItemIcon: {
    height: wp(5),
    aspectRatio: 1 / 1,
  },
  drawerContentContainer: {
    flex: 1,
  },
  drawerLabel: {
    fontSize: wp(3),
  },
});

// ---------------------------- Navigation set up -------------------------------
const setDrawerItemIcon = itemIcon => ({
  drawerIcon: (
    <Image source={itemIcon} resizeMode="cover" style={styles.drawerItemIcon} />
  ),
});

const drawerContentContainerInset = {
  top: 'always',
  horizontal: 'never',
};

const onLogoutYesPress = nav => async () => {
  try {
    // Clearing user preferences from local storage
    await clearData();

    // Resetting Navigation to initial state for login again
    nav.navigate('LoggedOut');
  } catch (error) {
    console.log(error.message);
  }
};
const onCheckData = nav => async () => {
  try {
    // Clearing user preferences from local storage

    // Resetting Navigation to initial state for login again
    nav.goBack();
  } catch (error) {
    console.log(error.message);
  }
};

const onDrawerItemPress = props => async route => {
  const designationData = await getTeacherDesignation();

  if (route.route.routeName !== 'Logout') {
    props.onItemPress(route);
    return;
  }

  // If 'Logout' route pressed
  props.navigation.closeDrawer();

  Alert.alert(
    'Logout',
    'Are you sure, you want to logout?',
    [
      {text: 'NO', style: 'cancel'},
      {text: 'YES', onPress: onLogoutYesPress(props.navigation)},
    ],
    {
      cancelable: false,
    },
  );
};

const CustomDrawerContentComponent = props => {
  // const translateX = Animated.interpolate(drawerOpenProgress, {
  //   inputRange: [0, 1],
  //   outputRange: [-100, 0],
  // });
  return (
    <Animated.View>
      <ScrollView>
        <SafeAreaView
          style={styles.drawerContentContainer}
          forceInset={drawerContentContainerInset}>
          <View
            style={{
              height: wp(25),

              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={rotary_logo}
              style={{height: wp(15), aspectRatio: 2.66 / 1}}
            />
          </View>
          <DrawerItems
            {...props}
            onItemPress={onDrawerItemPress(props)}
            activeTintColor="#1ba2de"
            labelStyle={styles.drawerLabel}
          />
        </SafeAreaView>
      </ScrollView>
    </Animated.View>
  );
};

const AddNoticeStackNavigator = createStackNavigator(
  {
    NoticeBoard: AdminNoticeBoardScreen,
    // AddNotice: AdminAddNotice,
  },
  {
    initialRouteName: 'NoticeBoard',
    headerMode: 'none',
  },
);

const AdminHomeStackNavigator = createStackNavigator(
  {
    AdminDashBoard: AdminDashBoardScreen,
    AdminSearch: AdminSearchScreen,
  },
  {
    initialRouteName: 'AdminDashBoard',
    headerMode: 'none',
  },
);

const AdminPhotoGalleryNavigator = createStackNavigator(
  {
    GalleryTabScreen: GalleryTabScreen,
    'Photo Gallery': PhotoGalleryFolderScreen,
    PhotoGallery: PhotoGalleryScreen,
    PhotoGalleryViewer: PhotoGalleryViewerScreen,
  },
  {
    initialRouteName: 'GalleryTabScreen',
    defaultNavigationOptions: {
      headerShown: false,
    },
  },
);

const UpdateProfileNavigator = createStackNavigator(
  {
    'View Profile': ProfileScreen,
    UpdateTeacherPhoto: UpdateTeacherPhoto,
  },
  {
    initialRouteName: 'View Profile',
    headerMode: 'none',
  },
);

const StudentNotificationDetailkNavigator = createStackNavigator(
  {
    Notification: StudentNotificationScreen,
    StudentNotificationDetail: StudentNotificationDetail,
  },
  {
    initialRouteName: 'Notification',
    headerMode: 'none',
  },
);

const EventNavigator = createStackNavigator(
  {
    Events: EventsScreen,
    EventDetail: EventsDetailScreen,
  },
  {
    initialRouteName: 'Events',
    headerMode: 'none',
  },
);

const ClubNavigator = createStackNavigator(
  {
    Clubs: ClubsScreen,
    ClubsDetail: ClubsDetailScreen,
    MemberDetail: MemberDetailScreen,
  },
  {
    initialRouteName: 'Clubs',
    headerMode: 'none',
  },
);

const CommitteeNavigator = createStackNavigator(
  {
    Member: MemberList,
    MemberDetail: MemberDetailScreen,
  },
  {
    initialRouteName: 'Member',
    headerMode: 'none',
  },
);

const FaqNavigator = createStackNavigator(
  {
    FaqTab: FaqTabScreen,
    FAQ: FAQScreen,
    'FAQ Questions': FAQQuestionsScreen,
    'FAQ Answer': FAQAnsScreen,
  },
  {
    initialRouteName: 'FaqTab',
    headerMode: 'none',
  },
);
const ClassTeacherDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: TeacherDashBoardScreen,
      navigationOptions: setDrawerItemIcon(ic_home_black),
    },
    'View Profile': {
      screen: UpdateProfileNavigator,
      navigationOptions: setDrawerItemIcon(ic_view_profile_black),
    },
    'DG Message': {
      screen: DGMessageScreen,
      navigationOptions: setDrawerItemIcon(ic_dg_message),
    },
    Committee: {
      screen: CommitteeNavigator,
      navigationOptions: setDrawerItemIcon(ic_dashboard_members),
    },
    Clubs: {
      screen: ClubNavigator,
      navigationOptions: setDrawerItemIcon(ic_dashboard_club),
    },
    Directory: {
      screen: DirectoryScreen,
      navigationOptions: setDrawerItemIcon(ic_dashboard_directory),
    },
    Events: {
      screen: EventNavigator,
      navigationOptions: setDrawerItemIcon(ic_dashboard_events),
    },
    Notification: {
      screen: TeacherNotificationScreen,
      navigationOptions: setDrawerItemIcon(ic_notice_board_black),
    },

    'Photo Gallery': {
      screen: AdminPhotoGalleryNavigator,
      navigationOptions: setDrawerItemIcon(ic_gallery),
    },

    'Change Password': {
      screen: TeacherChangePasswordScreen,
      navigationOptions: setDrawerItemIcon(ic_change_password),
    },
    Logout: {
      screen: 'NoScreen',
      navigationOptions: setDrawerItemIcon(ic_logout_black),
    },
  },
  {
    initialRouteName: 'Home',
    overlayColor: 'rgba(0,0,0,0.7)',
    contentComponent: CustomDrawerContentComponent,
  },
);
const AdminDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AdminHomeStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_home_black),
    },
    'DG Message': {
      screen: DGMessageScreen,
      navigationOptions: setDrawerItemIcon(ic_dg_message),
    },
    Committee: {
      screen: CommitteeNavigator,
      navigationOptions: setDrawerItemIcon(ic_dashboard_members),
    },
    Clubs: {
      screen: ClubNavigator,
      navigationOptions: setDrawerItemIcon(ic_dashboard_club),
    },
    Directory: {
      screen: DirectoryScreen,
      navigationOptions: setDrawerItemIcon(ic_dashboard_directory),
    },
    Events: {
      screen: EventNavigator,
      navigationOptions: setDrawerItemIcon(ic_dashboard_events),
    },
    Notification: {
      screen: AddNoticeStackNavigator,
      navigationOptions: setDrawerItemIcon(ic_notice_board_black),
    },
    'Photo Gallery': {
      screen: AdminPhotoGalleryNavigator,
      navigationOptions: setDrawerItemIcon(ic_gallery),
    },

    'Change Password': {
      screen: TeacherChangePasswordScreen,
      navigationOptions: setDrawerItemIcon(ic_change_password),
    },
    Logout: {
      screen: 'NoScreen',
      navigationOptions: setDrawerItemIcon(ic_logout_black),
    },
  },
  {
    initialRouteName: 'Home',
    unmountInactiveRoutes: true,
    overlayColor: 'rgba(0,0,0,0.7)',
    contentComponent: CustomDrawerContentComponent,
  },
);
const StudentDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: DashBoardScreen,
      navigationOptions: setDrawerItemIcon(ic_home_black),
    },
    'DG Message': {
      screen: DGMessageScreen,
      navigationOptions: setDrawerItemIcon(ic_dg_message),
    },
    Committee: {
      screen: CommitteeNavigator,
      navigationOptions: setDrawerItemIcon(ic_dashboard_members),
    },

    Events: {
      screen: EventNavigator,
      navigationOptions: setDrawerItemIcon(ic_dashboard_events),
    },

    'Photo Gallery': {
      screen: AdminPhotoGalleryNavigator,
      navigationOptions: setDrawerItemIcon(ic_gallery),
    },
    FAQ: {
      screen: FaqNavigator,
      navigationOptions: setDrawerItemIcon(ic_dashboard_faq),
    },
    Announcement: {
      screen: StudentNotificationDetailkNavigator,
      navigationOptions: setDrawerItemIcon(ic_notification),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: setDrawerItemIcon(ic_view_profile_black),
    },
    'Change Password': {
      screen: StudentChangePasswordScreen,
      navigationOptions: setDrawerItemIcon(ic_change_password),
    },
    Logout: {
      screen: 'NoScreen',
      navigationOptions: setDrawerItemIcon(ic_logout_black),
    },
  },
  {
    initialRouteName: 'Home',
    overlayColor: 'rgba(0,0,0,0.7)',
    contentComponent: CustomDrawerContentComponent,
  },
);

const SchoolStudentListStackNavigator = createStackNavigator(
  {
    SchoolList: SchoolListScreen,
    StudentList: StudentListScreen,
  },
  {
    initialRouteName: 'SchoolList',
    headerMode: 'none',
  },
);

const StudentSwitchNavigator = createSwitchNavigator(
  {
    SchoolStudentList: SchoolStudentListStackNavigator,
    StudentDrawer: StudentDrawerNavigator,
  },
  {
    initialRouteName: 'SchoolStudentList',
  },
);

const LoginStackNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,
    OTPVerification: OTPVerificationScreen,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  },
);

const createRootNavigator = roleId => {
  const ROUTES = {
    // LoggedOut routes
    LoggedOut: LoginStackNavigator,

    // LoggedIn routes
    StudentHome: StudentSwitchNavigator,
    TeacherHome: ClassTeacherDrawerNavigator,

    AdminHome: AdminDrawerNavigator,
  };

  let initialRouteName = 'LoggedOut';

  if (roleId) {
    switch (roleId) {
      case 'STUDENT':
        initialRouteName = 'StudentHome';
        break;

      case 'TEACHER':
        initialRouteName = 'TeacherHome';
        break;

      case 'GUARD':
        initialRouteName = 'GuardHome';
        break;

      case 'ADMIN':
        initialRouteName = 'AdminHome';
    }
  }

  return createSwitchNavigator(ROUTES, {initialRouteName});
};

// ------------------- App Component -------------------
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      roleId: null,
      desiData: null, //  TEACHER - ADMIN - student
    };
  }

  componentDidMount() {
    // Initial setup
    setTimeout(this.initialSetup, 2000);
    // Adding firebase listeners
    createOnTokenRefreshListener(this);
    createNotificationListeners(this);
  }

  UNSAFE_componentWillMount() {
    // Removing firebase listeners
    removeOnTokenRefreshListener(this);
    removeNotificationListeners(this);
  }

  initialSetup = async () => {
    try {
      // Fetching roleId
      const roleId = await getRoleId();
      checkPermission(this);
      this.setState({roleId, isLoading: false});
    } catch (error) {
      console.log(error.message);
    }
  };

  setNavigatorRef = ref => {
    nsSetTopLevelNavigator(ref);
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <SplashScreen />;
    }

    const {roleId, desiData} = this.state;
    const RootNavigator = createRootNavigator(roleId, desiData);
    const AppContainer = createAppContainer(RootNavigator);
    return (
      <InternetConnectionAlert
        onChange={connectionState => {
          console.log('Connection State: ', connectionState);
        }}>
        <RootSiblingParent>
          <SafeAreaProvider>
            <AppContainer ref={this.setNavigatorRef} />
          </SafeAreaProvider>
        </RootSiblingParent>
      </InternetConnectionAlert>
    );
  }
}
