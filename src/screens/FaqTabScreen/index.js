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
import ClubFaqTab from 'screens/FAQScreen';
import GlobalFaqTab from 'screens/FAQScreen';

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
  const FirstRoute = () => <ClubFaqTab navigation={navigation} />;
  const SecondRoute = () => <GlobalFaqTab navigation={navigation} />;

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
          <ScreenHeader title="FAQ's" showSchoolLogo nav={navigation} />

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
