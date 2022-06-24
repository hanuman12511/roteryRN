import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {styles} from './styles';
import screenHeader from 'components/ScreenHeader';

// Components
import ScreenHeader from 'components/ScreenHeader';
import ScreenFooter from 'components/ScreenFooter';

// Icons
import ic_header_option_icon from 'assets/icons/ic_header_option_icon.png';
import calendar from 'assets/icons/calendar.png';

export default class teacherAbsentReason extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Attendance" image={ic_header_option_icon} />
        <View style={styles.absentReasonContainer}>
          <Text style={styles.teacherName}>
            Teacher Name : Deepak Kumar Dhamani
          </Text>
          <View style={styles.reasonListHeading}>
            <Text style={[styles.sNo, styles.whiteColor]}>S No.</Text>
            <Text style={[styles.abDate, styles.whiteColor]}>Absent Date</Text>
            <Text style={[styles.abReason, styles.whiteColor]}>
              Absent Reason
            </Text>
          </View>
          <View style={styles.reasonListContainer}>
            <View style={styles.reasonListRow}>
              <Text style={styles.sNo}>1</Text>
              <Text style={styles.abDate}>03-02-2019</Text>
              <Text style={styles.abReason}>Feaver</Text>
            </View>
            <View style={styles.reasonListRow}>
              <Text style={styles.sNo}>1</Text>
              <Text style={styles.abDate}>14-02-2019</Text>
              <Text style={styles.abReason}>Feaver</Text>
            </View>
            <View style={styles.reasonListRow}>
              <Text style={styles.sNo}>1</Text>
              <Text style={styles.abDate}>19-02-2019</Text>
              <Text style={styles.abReason}>Feaver</Text>
            </View>
            <View style={styles.reasonListRow}>
              <Text style={styles.sNo}>1</Text>
              <Text style={styles.abDate}>28-03-2019</Text>
              <Text style={styles.abReason}>Feaver</Text>
            </View>
          </View>
        </View>
        <ScreenFooter />
      </View>
    );
  }
}
