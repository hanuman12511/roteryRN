import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import ScreenHeader from 'components/ScreenHeader';
import ScreenFooter from 'components/ScreenFooter';

// Images

// Icons
import ic_header_option_icon from 'assets/icons/ic_header_option_icon.png';

export default class timeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Navigation object
    this.nav = this.props.navigation;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Time Table" showSchoolLogo nav={this.nav} />

        <View style={styles.timeTable}>
          <Text>Attendance Teacher Student Tab</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeTable: {
    flex: 1,
    backgroundColor: '#f2f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
