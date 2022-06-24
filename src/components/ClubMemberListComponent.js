import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Images
import memberImage from '../assets/images/memberImage.jpg';

// Icons
import ic_phone_yellow from '../assets/icons/ic_phone_yellow.png';
import ic_occupation_yellow from '../assets/icons/ic_occupation_yellow.png';

export default class MemberListComponent extends Component {
  onEventItemClick = () => {
    this.props.nav.navigate('MemberDetail');
  };
  render() {
    const {memberName, designation, PhoneNo, occupation} = this.props.item;
    return (
      <TouchableOpacity
        style={styles.tileContainer}
        onPress={this.onEventItemClick}>
        <Image
          source={memberImage}
          resizeMode="cover"
          style={styles.memberImage}
        />
        <View style={styles.memberDetail}>
          <Text style={styles.name}>
            {memberName} <Text style={styles.designation}>({designation})</Text>
          </Text>
          <View style={styles.iconData}>
            <Image
              source={ic_phone_yellow}
              resizeMode="cover"
              style={styles.icons}
            />
            <Text style={styles.number}>{PhoneNo}</Text>
          </View>
          <View style={styles.iconData}>
            <Image
              source={ic_occupation_yellow}
              resizeMode="cover"
              style={styles.icons}
            />
            <Text style={styles.occupation}>{occupation}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: '#fff',
    padding: wp(3),
    elevation: 10,
    shadowColor: '#0008',
    shadowRadius: 4.65,
    borderRadius: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberImage: {
    width: wp(17),
    aspectRatio: 1 / 1,
    borderRadius: wp(1),
  },
  memberDetail: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  name: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#333',
  },
  designation: {
    fontSize: wp(3),
    color: '#333',
  },
  number: {
    fontSize: wp(3),
    color: '#333',
  },
  occupation: {
    fontSize: wp(3),
    color: '#333',
  },
  iconData: {
    flexDirection: 'row',
    paddingVertical: wp(1),
  },
  icons: {
    width: wp(5),
    aspectRatio: 1 / 1,
    borderRadius: wp(1),
    marginRight: wp(2),
  },
});
