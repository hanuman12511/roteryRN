import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioForm from 'react-native-simple-radio-button';

// Components
import ScreenHeader from 'components/ScreenHeader';

// Images

// Icons
import calendar from 'assets/icons/calendar.png';
import ic_back from 'assets/icons/ic_back.png';

var radio_props = [
  {label: 'E-mail', value: 0},
  {label: 'SMS', value: 1},
  {label: 'App Notification', value: 2},
];

export default class addNotice extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isDateTimePickerVisible: false,
      selectedDate: '',
    };

    // Navigation object
    this.nav = this.props.navigation;
  }

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
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          backIcon={ic_back}
          title="Add Notice"
          showSchoolLogo
          nav={this.nav}
        />

        <View style={styles.addAssignmentSection}>
          <View style={styles.addAssignmentButton}>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({language: itemValue})
              }>
              <Picker.Item label="Notice Type" value="Notice Type" />
              <Picker.Item label="Holiday" value="Science" />
              <Picker.Item label="Exam" value="Exam" />
              <Picker.Item label="News" value="News" />
              <Picker.Item
                label="Curriculum Activities"
                value="Curriculum Activities"
              />
              <Picker.Item label="Notice" value="Notice" />
            </Picker>
          </View>

          <View style={styles.noticeTitle}>
            <TextInput
              style={styles.noticeTitleInput}
              placeholder="Notice Title"
              onChangeText={text => this.setState({text})}
            />
          </View>

          <View style={styles.datePickerContainer}>
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

          <View style={styles.datePickerContainer}>
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

          <View style={styles.noticeDiscription}>
            <TextInput
              style={styles.noticeDiscriptionInput}
              placeholder="Notice Discription"
              multiline={true}
              numberOfLines={4}
              onChangeText={text => this.setState({text})}
              value={this.state.text}
            />
          </View>

          <View style={styles.radioButtons}>
            <Text>Sent Notification By</Text>
            <RadioForm
              style={styles.radioButtosText}
              radio_props={radio_props}
              initial={0}
              formHorizontal={true}
              buttonColor={'#808285'}
              selectedButtonColor={'#1ba2de'}
              labelColor={'#1ba2de'}
              buttonSize={14}
              labelStyle={{
                fontSize: 14,
                color: '#808285',
                marginRight: 20,
                marginLeft: 2,
              }}
              onPress={value => {
                this.setState({value: value});
              }}
            />
          </View>
        </View>

        <TouchableHighlight
          style={styles.attendanceBtn}
          onPress={this._onPressButton}>
          <Text style={styles.attendanceBtnText}>Save</Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}
