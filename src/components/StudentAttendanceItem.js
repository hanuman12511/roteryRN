import React, {Component} from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBox from 'react-native-check-box';

export default class StudentAttendanceItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  UNSAFE_componentWillMount() {
    const {attendence_status} = this.props.item;
    attendence_status === 'A' && this.setState({isChecked: true});
  }

  handleCheckBoxClick = async () => {
    try {
      await this.setState({isChecked: !this.state.isChecked});

      // Calling callback to mark attendance
      this.props.handleMarkAttendance(
        this.state.isChecked,
        this.props.item.student_id,
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    const {enroll, name, attendence_statusmachine, attendence_status} =
      this.props.item;

    const infoColor = {
      // color: attendence_statusmachine === 'A' ? 'red' : '#000',
      color: attendence_status === 'A' ? 'red' : '#4c9509',
    };

    const container = {
      flexDirection: 'row',
      height: 40,
      paddingHorizontal: 4,
      borderRadius: 2,
      // backgroundColor: '#fff',
      backgroundColor:
        '#' +
        (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
        0x15,
      alignItems: 'center',
    };

    return (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.handleCheckBoxClick}>
        <View style={container}>
          <View style={styles.item1}>
            <CheckBox
              isChecked={this.state.isChecked}
              onClick={this.handleCheckBoxClick}
            />
          </View>
          <Text style={[styles.item2, infoColor]}>{enroll}</Text>
          <Text style={[styles.item3, infoColor]}>{name}</Text>
          {/* <Text style={[styles.item3, infoColor]}>Upload Image</Text> */}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  item1: {
    flex: 1,
  },
  item2: {
    flex: 1,
  },
  item3: {
    flex: 2,
  },
});
