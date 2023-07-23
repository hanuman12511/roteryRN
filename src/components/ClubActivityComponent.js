import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import React, {Component} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Images
import eventImage from '../assets/images/eventImage.jpg';

// Icons
import ic_location_yellow from '../assets/icons/ic_location_yellow.png';
import ic_event_time from '../assets/icons/ic_event_time.png';

export default class DirectoryComponent extends Component {
  onEventItemClick = () => {
    this.props.nav.navigate('EventDetail');
  };

  render() {
    const {
      eventName,
      location,
      startDate,
      startTime,
      endDate,
      endTime,
    } = this.props.item;
    return (
      <TouchableHighlight
        style={styles.tileContainer}
        // onPress={this.onEventItemClick}
        underlayColor="transparent">
        <ImageBackground
          source={eventImage}
          //   backgroundSize="cover"
          style="backgroundImage">
          <View style={styles.memberDetail}>
            <View style={styles.titleRow}>
              {/* <Image
                  source={ic_phone_yellow}
                  resizeMode="cover"
                  style={styles.icons}
                /> */}
              <Text style={styles.name}>{eventName}</Text>
            </View>
            <View style={styles.iconData}>
              <Image
                source={ic_location_yellow}
                resizeMode="cover"
                style={styles.icons}
              />
              <Text style={styles.location}>{location}</Text>
            </View>
            {/* <View style={styles.iconData}>
              <Image
                source={ic_event_time}
                resizeMode="cover"
                style={styles.icons}
              />
              <Text style={styles.occupation}>{startDate}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.occupation}>{startTime}</Text>
            </View> */}
            <View style={styles.iconData}>
              <Image
                source={ic_event_time}
                resizeMode="cover"
                style={styles.icons}
              />
              <Text style={styles.occupation}>{endDate}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.occupation}>{endTime}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: '#fff',
    // padding: wp(3),
    elevation: 10,
    shadowColor: '#0008',
    shadowRadius: 4.65,
    borderRadius: wp(1),
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    // aspectRatio: 3 / 1,
    // borderRadius: wp(1),
  },
  memberDetail: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    // paddingHorizontal: wp(3),
    padding: wp(3),
  },
  name: {
    fontSize: wp(4.5),
    fontWeight: '700',
    color: '#fff',
  },
  location: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: '#fff',
  },
  occupation: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: '#fff',
  },
  separator: {
    color: '#fff',
    marginHorizontal: wp(2),
  },
  iconData: {
    flexDirection: 'row',
    paddingVertical: wp(1),
  },
  titleRow: {
    flexDirection: 'row',
    paddingVertical: wp(1),
    marginTop: hp(1),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icons: {
    width: wp(5),
    aspectRatio: 1 / 1,
    borderRadius: wp(1),
    marginRight: wp(2),
  },
  buyTicket: {
    backgroundColor: '#f7aa14',
    paddingVertical: wp(2),
    paddingHorizontal: wp(3),
    borderRadius: wp(1),
  },
  buttonText: {
    fontSize: wp(3.5),
    fontWeight: '700',
  },
});
