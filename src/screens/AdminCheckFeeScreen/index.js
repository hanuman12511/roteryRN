import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

export default class attendanceTabTeacherStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {connectionState: true};
    // Navigation object
    this.nav = this.props.navigation;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader title="Check Fees" showSchoolLogo nav={this.nav} />
        <View style={styles.checkFeebox}>
          <TextInput
            placeholder="Sr. No."
            style={styles.checkFeeInput}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
          <TouchableHighlight
            style={styles.checkFeeBtn}
            onPress={this.onLoginPress}
            underlayColor={'#333'}>
            <Text style={styles.checkFeeBtnText}>Check Fees</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}
