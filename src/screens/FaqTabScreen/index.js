import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

// Components
import ScreenHeader from 'components/ScreenHeader';

// Screen
import ClubFaqTab from 'screens/FAQScreen';
import GlobalFaqTab from 'screens/FAQScreen';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';

//gif
import offline from 'assets/icons/internetConnectionState.gif';
export default class AdminAttendanceScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      connectionState: true,
      routes: [
        {key: 'ClubFaqTab', title: 'Club'},
        {key: 'GlobalFaqTab', title: 'Global'},
      ],
    };
  }
  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader title="Faq's" showSchoolLogo nav={navigation} />

            <View style={styles.attendanceTeacherStudent}>
              <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                  ClubFaqTab: ClubFaqTab,
                  GlobalFaqTab: GlobalFaqTab,
                })}
                onIndexChange={index => this.setState({index})}
                initialLayout={{width: Dimensions.get('window').width}}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    indicatorStyle={(styles.indicator, styles.tabBarIndicator)}
                    style={styles.tabBar}
                    labelStyle={styles.tabBarLabel}
                  />
                )}
              />
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
