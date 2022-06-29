import React, {useState, useEffect} from 'react';
import {Image, Dimensions, View, TouchableHighlight} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';

// Icons
import ic_search_white from 'assets/icons/ic_search_white.png';

// Screen
import ClubPhotoGalleryTab from 'screens/AdminPhotoGalleryScreens/PhotoGalleryFolderScreen';
import GlobalPhotoGalleryTab from 'screens/AdminPhotoGalleryScreens/PhotoGalleryFolderScreen';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
const LibraryHomeScreen = props => {
  const {navigation} = props;
  const [connectionState, setConnectionState] = useState(true);

  //useEffect
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setConnectionState(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Tab Routes
  const FirstRoute = () => <ClubPhotoGalleryTab navigation={navigation} />;
  const SecondRoute = () => <GlobalPhotoGalleryTab navigation={navigation} />;

  // TabView config
  const initialLayout = {width: Dimensions.get('window').width};

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Club'},
    {key: 'second', title: 'Global'},
  ]);
  const navigationState = {index, routes};

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = tabBarProps => (
    <TabBar
      {...tabBarProps}
      indicatorStyle={styles.tabBarIndicatorStyle}
      style={styles.tabBarStyle}
      indicatorStyle={styles.tabBarIndicator}
      labelStyle={styles.tabBarLabel}
    />
  );

  const handleBookSearch = () => {
    navigation.push('LibraryBookSearch');
  };

  return (
    <SafeAreaView style={styles.container}>
      {connectionState && (
        <>
          <ScreenHeader title="Gallery" showSchoolLogo nav={navigation} />

          <TabView
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            navigationState={navigationState}
            onIndexChange={setIndex}
          />
        </>
      )}
      {connectionState === false ? (
        <View style={styles.offlineStyle}>
          <FastImage source={offline} style={styles.networkIssue} />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default LibraryHomeScreen;

// import React, {Component} from 'react';
// import {View, Dimensions} from 'react-native';
// import styles from './styles';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

// // Components
// import ScreenHeader from 'components/ScreenHeader';

// // Screen
// import ClubPhotoGalleryTab from 'screens/AdminPhotoGalleryScreens/PhotoGalleryFolderScreen';
// import GlobalPhotoGalleryTab from 'screens/AdminPhotoGalleryScreens/PhotoGalleryFolderScreen';

// // network alert
// import NetInfo from '@react-native-community/netinfo';
// import FastImage from 'react-native-fast-image';

// //gif
// import offline from 'assets/icons/internetConnectionState.gif';
// export default class AdminAttendanceScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       index: 0,
//       connectionState: true,
//       routes: [
//         {key: 'ClubPhotoGalleryTab', title: 'Club'},
//         {key: 'GlobalPhotoGalleryTab', title: 'Global'},
//       ],
//     };
//   }
//   componentDidMount() {
//     this.unsubscribe = NetInfo.addEventListener(state => {
//       this.setState({connectionState: state.isConnected});
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//   render() {
//     const {navigation} = this.props;

//     return (
//       <SafeAreaView style={styles.container}>
//         {this.state.connectionState && (
//           <>
//             <ScreenHeader
//               title="Gallery"
//               showSchoolLogo
//               nav={this.props.navigation}
//             />

//             <View style={styles.attendanceTeacherStudent}>
//               <TabView
//                 navigationState={this.state}
//                 renderScene={SceneMap({
//                   ClubPhotoGalleryTab: ClubPhotoGalleryTab,
//                   GlobalPhotoGalleryTab: GlobalPhotoGalleryTab,
//                 })}
//                 onIndexChange={index => this.setState({index})}
//                 initialLayout={{width: Dimensions.get('window').width}}
//                 renderTabBar={props => (
//                   <TabBar
//                     {...props}
//                     indicatorStyle={(styles.indicator, styles.tabBarIndicator)}
//                     style={styles.tabBar}
//                     labelStyle={styles.tabBarLabel}
//                   />
//                 )}
//               />
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
