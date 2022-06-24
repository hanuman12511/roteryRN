import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

// Components
import ScreenHeader from 'components/ScreenHeader';
import ScreenFooter from 'components/ScreenFooter';
import DetailListComponent from 'components/DetailListComponent';

// Icons
import ic_back from 'assets/icons/ic_back.png';

// Images
import hostel_slider_image from 'assets/images/hostel_slider_image.png';

export default class HostelScree extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.titleArr = [
      'Hostel Name',
      'Room No.',
      'Warden Name',
      'Warden Mobile No.',
      'Total Fee',
      'Paid Fee',
    ];

    this.infoArr = [
      'Sarswati',
      '2',
      'Radha',
      '9694401209',
      '30000/-',
      '30000/-',
    ];

    // Navigation object
    this.nav = this.props.navigation;

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Hostel" showSchoolLogo nav={this.nav} />
        <View style={styles.transportScreenSection}>
          <Image
            style={styles.transportImg}
            source={hostel_slider_image}
            resizeMode="cover"
          />
          <View style={styles.OutstandingFeeDetailBox}>
            <DetailListComponent
              titleArr={this.titleArr}
              infoArr={this.infoArr}
            />
          </View>
        </View>
        {/* <ScreenFooter /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1ba2de',
    width: '100%',
  },

  transportScreenSection: {flex: 1, backgroundColor: '#fff'},
  transportImg: {height: 170},
});
