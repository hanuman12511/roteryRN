import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Images
import memberImage from '../assets/images/memberImage.jpg';
import RotaryClub from '../assets/images/RotaryClub.png';

// Icons
import ic_phone_yellow from '../assets/icons/ic_phone_yellow.png';
import ic_occupation_yellow from '../assets/icons/ic_occupation_yellow.png';

export default class ClubComponent extends Component {
  onEventItemClick = () => {
    this.props.nav.navigate('ClubsDetail');
  };

  render() {
    const {ClubName, Members, FDate} = this.props.item;
    return (
      <TouchableOpacity
        style={styles.tileContainer}
        onPress={this.onEventItemClick}>
        <Image
          source={RotaryClub}
          resizeMode="cover"
          style={styles.memberImage}
        />
        <View style={styles.memberDetail}>
          <Text style={styles.name}>
            {ClubName}{' '}
            <Text style={styles.designation}>({Members} Members)</Text>
          </Text>
          <View style={styles.iconData}>
            <Image
              source={ic_phone_yellow}
              resizeMode="cover"
              style={styles.icons}
            />
            <Text style={styles.number}>Date of Formation: {FDate}</Text>
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
    fontWeight: '400',
    color: '#333',
  },
  number: {
    fontSize: wp(3.5),
    color: '#333',
  },
  occupation: {
    fontSize: wp(3.5),
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
