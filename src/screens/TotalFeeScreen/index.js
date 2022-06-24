import React, {Component} from 'react';
import {View, ScrollView, Alert} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import DetailListComponent from 'components/DetailListComponent';

// Icons

import ic_back from 'assets/icons/ic_back.png';
import {styles} from './styles';
export default class TotalFee extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.titleArr = [
      'Rcceipt No.',
      'Pay Date',
      'Quarter',
      'Fee',
      'Mode',
      'Challan No.',
      'Bank',
    ];

    this.infoArr = [
      '1863',
      '26-4-2018',
      'Quarter 1',
      '6500',
      'Cash',
      '1456xks',
      'HDFC',
    ];

    this.infoArr2 = [
      '2113',
      '2-7-2018',
      'Quarter 2',
      '6500',
      'Cash',
      '2156xks',
      'State Bank of India',
    ];

    this.titleArr3 = ['Quarter', 'Last Day', 'Fee', 'Installment'];

    this.infoArr3 = ['Quarter 3', '14-9-2018', '6500/-', 'Pending'];

    this.infoArr4 = ['Quarter 3', '15-1-2018', '6500/-', 'Pending'];
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          backIcon={ic_back}
          title="Total Fee"
          showSchoolLogo
          nav={this.props.navigation}
        />

        <ScrollView style={styles.totalFeeDetailSection}>
          <View style={styles.detailContainer}>
            <DetailListComponent
              titleArr={this.titleArr}
              infoArr={this.infoArr}
            />
          </View>

          <View style={styles.detailContainer}>
            <DetailListComponent
              titleArr={this.titleArr}
              infoArr={this.infoArr2}
            />
          </View>

          <View style={styles.detailContainer}>
            <DetailListComponent
              titleArr={this.titleArr3}
              infoArr={this.infoArr3}
            />
          </View>

          <View style={styles.detailContainer}>
            <DetailListComponent
              titleArr={this.titleArr3}
              infoArr={this.infoArr4}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
