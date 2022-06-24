import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import calendar from 'assets/icons/calendar.png';

export default class DateTimePickerTester extends Component {
  state = {
    isDateTimePickerVisible: false,
    selectedDate: '',
  };

  _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

  _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

  _handleDatePicked = date => {
    const selectedDate =
      date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
    this.setState({selectedDate});
    this._hideDateTimePicker();
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: 30, alignItems: 'center'}}>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />

        <TouchableOpacity
          style={styles.dateButton}
          onPress={this._showDateTimePicker}>
          <Text>{this.state.selectedDate.toString()}</Text>
          <Image
            style={styles.calendarIcon}
            source={calendar}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dateButton: {
    backgroundColor: 'pink',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  calendarIcon: {
    height: wp(4),
    width: wp(4),
  },
});
