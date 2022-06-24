import React, {useState, useEffect} from 'react';
import {Image, Dimensions, View, TouchableHighlight} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';

// Icons
import ic_search_white from 'assets/icons/ic_search_white.png';

// Tab Screens
import LibraryIssuedBooksScreen from 'screens/LibraryIssuedBooksScreen';
import LibraryRequestedBooksScreen from 'screens/LibraryRequestedBooksScreen';
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
  const FirstRoute = () => <LibraryIssuedBooksScreen navigation={navigation} />;
  const SecondRoute = () => (
    <LibraryRequestedBooksScreen navigation={navigation} />
  );

  // TabView config
  const initialLayout = {width: Dimensions.get('window').width};

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Issued'},
    {key: 'second', title: 'Requested'},
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
          <ScreenHeader title="Library" showSchoolLogo nav={navigation} />

          <TabView
            initialLayout={initialLayout}
            renderTabBar={renderTabBar}
            renderScene={renderScene}
            navigationState={navigationState}
            onIndexChange={setIndex}
          />

          <TouchableHighlight
            underlayColor="#1ba2de80"
            onPress={handleBookSearch}
            style={styles.floatingSearchButton}>
            <Image
              source={ic_search_white}
              resizeMode="cover"
              style={styles.floatingSearchIcon}
            />
          </TouchableHighlight>
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
