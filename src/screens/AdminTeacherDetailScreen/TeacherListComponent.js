import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './styles';
import ic_picker_by from 'assets/icons/noImage.png';
import info from 'assets/icons/info.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class TeacherListComponent extends Component {
  handleTeacherDetail = () => {
    const data = this.props.item;
    this.props.nav.navigate('AdminGetTeacherDetail', {data});
  };
  render() {
    const listContainer = {
      backgroundColor:
        '#' +
        (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
        0x15,
      flexDirection: 'row',
      padding: wp(3),
      alignItems: 'flex-start',
      marginBottom: hp(2),
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#00000015',
    };
    const {item} = this.props;
    return (
      <TouchableOpacity
        onPress={this.handleTeacherDetail}
        style={listContainer}>
        <View style={styles.imageHolder}>
          {item.image !== null ? (
            <Image style={styles.teacherImage} source={{uri: item.file}} />
          ) : (
            <Image style={styles.teacherImage} source={ic_picker_by} />
          )}
        </View>
        <View style={styles.teacherData}>
          <Text style={styles.profileName}>
            {item.name} <Text style={styles.dob}>(DOB: {item.dob})</Text>
          </Text>
          <Text style={styles.midNameProfile}>{item.f_h_name}</Text>
          <Text style={styles.profileBasicData}>{item.mobile}</Text>
          <Text style={styles.profileBasicData}>{item.email}</Text>
          {/* <Text style={styles.profileBasicData}>Jaipur Rajasthan India</Text> */}
        </View>
        <TouchableOpacity
          onPress={this.handleTeacherDetail}
          style={styles.onPressImg}>
          <Image style={styles.profileImage4} source={info} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
