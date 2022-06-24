import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// Screen
import AdminTimeTableTeacherScreen from 'screens/AdminTimeTableTeacherScreen';
import AdminTimeTableStudentScreen from 'screens/AdminTimeTableStudentScreen';

export default class AdminTimeTableScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      connectionState: true,
      routes: [
        {key: 'first', title: 'Teacher'},
        {key: 'second', title: 'Class'},
      ],
    };

    // tab view config
    const FirstRoute = () => (
      <AdminTimeTableTeacherScreen nav={this.props.navigation} />
    );
    const SecondRoute = () => (
      <AdminTimeTableStudentScreen nav={this.props.navigation} />
    );
    this.renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });
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
    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Time Table"
              showSchoolLogo
              nav={this.props.navigation}
            />

            <View style={styles.attendanceTeacherStudent}>
              <TabView
                navigationState={this.state}
                renderScene={this.renderScene}
                onIndexChange={index => this.setState({index})}
                initialLayout={{width: Dimensions.get('window').width}}
                renderTabBar={props => (
                  <TabBar
                    {...props}
                    indicatorStyle={{backgroundColor: 'white'}}
                    style={{backgroundColor: '#1ba2de'}}
                    indicatorStyle={styles.tabBarIndicator}
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
