import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';
import ScreenFooter from 'components/ScreenFooter';
import DetailListComponent from 'components/DetailListComponent';

// Icons
import ic_back from 'assets/icons/ic_back.png';

// Images
import transport_slider_image from 'assets/images/transport_slider_image.jpg';

export default class TransportScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.titleArr = [
      'Driver Name',
      'Mobile No.',
      'Vehicle No.',
      'Location',
      'Total Fee',
      'Paid Fee',
      'Outstanding Fee',
    ];

    this.infoArr = [
      'Vikram Ji',
      '9694401208',
      'RJ14 2526',
      'Murlipura',
      '15000/-',
      '6000/-',
      '9000/-',
    ];

    // Navigation object
    this.nav = this.props.navigation;

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.transportScreenContant}>
          <ScreenHeader title="Transport" showSchoolLogo nav={this.nav} />
          <View style={styles.transportScreenSection}>
            <Image
              style={styles.transportImg}
              source={transport_slider_image}
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
      </View>
    );
  }
}
