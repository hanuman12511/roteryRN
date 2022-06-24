import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import edit from 'assets/images/user_image.png';
import edit_now from 'assets/icons/pencil.png';
import CheckBox from 'react-native-check-box';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
class TakePhotoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  UNSAFE_componentWillMount() {
    const {attendence_status: attendanceStatus} = this.props.item;
    attendanceStatus === 'A' && this.setState({isChecked: true});
  }

  handleCheckBoxClick = async () => {
    try {
      const {item} = this.props;
      this.props.nav.navigate('takeStudentPhoto', {item});
      // await this.setState({isChecked: !this.state.isChecked});

      // // Calling callback to mark attendance
      // this.props.handleMarkAttendance(
      //   this.state.isChecked,
      //   this.props.item.student_id,
      // );
    } catch (error) {
      console.log(error.message);
    }
  };

  handleSeen = () => {
    try {
      const {item} = this.props;
      this.props.handleSend(item);
    } catch (error) {}
  };

  render() {
    const {
      enroll,
      name,
      studentimage,
      attendence_statusmachine: machineAttendanceStatus,
    } = this.props.item;

    const infoColor = {
      color: machineAttendanceStatus === 'A' ? 'red' : '#000',
    };
    const container = {
      backgroundColor:
        '#' +
        (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
        0x15,
      flexDirection: 'row',
      padding: wp(2),
      borderRadius: 2,

      alignItems: 'center',
    };
    return studentimage !== null ? (
      <TouchableHighlight underlayColor="transparent" onPress={this.handleSeen}>
        <View style={container}>
          <View style={styles.item1}>
            <View style={styles.iconContainer}>
              <FastImage
                style={styles.iconContainer3}
                source={{
                  uri: studentimage,
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          </View>
          <Text style={[styles.item2]}>{enroll}</Text>
          <Text style={[styles.item3]}>{name}</Text>
          <TouchableOpacity
            onPress={this.handleCheckBoxClick}
            style={{flexDirection: 'row', paddingVertical: 6}}>
            <Image source={edit_now} style={styles.iconContainer2} />
          </TouchableOpacity>
        </View>
      </TouchableHighlight>
    ) : (
      <TouchableHighlight
        underlayColor="transparent"
        onPress={this.handleCheckBoxClick}>
        <View style={styles.container}>
          <View style={styles.item1}>
            <Image
              source={edit}
              style={styles.iconContainer}
              resizeMode="cover"
              resizeMethod="auto"
            />
            <Image
              source={edit_now}
              style={styles.iconContainer2}
              resizeMode="cover"
              resizeMethod="auto"
            />
          </View>
          <Text style={[styles.item2]}>{enroll}</Text>
          <Text style={[styles.item3]}>{name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default TakePhotoItem;
const styles = StyleSheet.create({
  item1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item2: {
    flex: 1,
    textAlign: 'center',
    paddingRight: wp(3),
  },
  item3: {
    flex: 2,
  },
  iconContainer: {
    width: wp(15),
    height: wp(15),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(7.5),
  },
  iconContainer3: {
    width: wp(20),
    height: wp(20),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(7.5),
  },
  iconContainer2: {
    width: 25,
    aspectRatio: 1 / 1,
    marginLeft: 10,

    //     position: 'absolute',
    //     top: 0,
    //     right: 0,
    //     zIndex: 9999,
  },
});
