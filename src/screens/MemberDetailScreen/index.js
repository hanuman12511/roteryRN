import React, {Component} from 'react';
import {Text, View, StatusBar, Image, FlatList, ScrollView} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import ScreenHeader from 'components/ScreenHeader';
import ClubMemberListComponent from 'components/ClubMemberListComponent';
import ClubActivityComponent from 'components/ClubActivityComponent';

// Images
import memberImage from 'assets/images/memberImage.jpg';
import RotaryClub from 'assets/images/RotaryClub.png';

// Icons
import ic_event_time from 'assets/icons/ic_event_time.png';
import ic_phone_yellow from 'assets/icons/ic_phone_yellow.png';
import ic_mail_yellow from 'assets/icons/ic_mail_yellow.png';
import ic_location_yellow from 'assets/icons/ic_location_yellow.png';
import ic_multi_student from 'assets/icons/ic_multi_student.png';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberData: [
        {
          memberName: 'Vikas Solanki',
          designation: 'President',
          PhoneNo: '9876543210',
          occupation: 'Businessman',
        },
        {
          memberName: 'Dheerendra Solanki',
          designation: 'Treasurer',
          PhoneNo: '9876543210',
          occupation: 'Businessman',
        },
        {
          memberName: 'Dinesh Bijarniya',
          designation: 'Secretary',
          PhoneNo: '9876543210',
          occupation: 'Businessman',
        },
        {
          memberName: 'Ajay Jangid',
          designation: 'Member',
          PhoneNo: '9876543210',
          occupation: 'Businessman',
        },
        {
          memberName: 'Vikas Solanki',
          designation: 'President',
          PhoneNo: '9876543210',
          occupation: 'Businessman',
        },
        {
          memberName: 'Dheerendra Solanki',
          designation: 'Treasurer',
          PhoneNo: '9876543210',
          occupation: 'Businessman',
        },
        {
          memberName: 'Dinesh Bijarniya',
          designation: 'Secretary',
          PhoneNo: '9876543210',
          occupation: 'Businessman',
        },
        {
          memberName: 'Ajay Jangid',
          designation: 'Member',
          PhoneNo: '9876543210',
          occupation: 'Businessman',
        },
      ],
      activityData: [
        {
          eventName: 'Rotary Seminar',
          location: 'Mumbai',
          startDate: 'Sun 26 June 2022',
          startTime: '05:00 PM',
          endDate: 'Sun 26 June 2022',
          endTime: '06:00 PM',
        },
        {
          eventName: 'Rotary Seminar',
          location: 'Mumbai',
          startDate: 'Sun 26 June 2022',
          startTime: '05:00 PM',
          endDate: 'Sun 26 June 2022',
          endTime: '06:00 PM',
        },
        {
          eventName: 'Rotary Seminar',
          location: 'Mumbai',
          startDate: 'Sun 26 June 2022',
          startTime: '05:00 PM',
          endDate: 'Sun 26 June 2022',
          endTime: '06:00 PM',
        },
      ],
    };
  }

  renderItem = ({item}) => (
    <ClubMemberListComponent item={item} nav={this.props.navigation} />
  );

  activityItem = ({item}) => (
    <ClubActivityComponent item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#02abe3" barStyle="light-content" />
        <ScreenHeader
          title="Member Detail"
          studentListIcon={ic_multi_student}
          showSchoolLogo
          nav={navigation}
        />

        <View style={styles.tileContainer}>
          <Image
            source={memberImage}
            resizeMode="cover"
            style={styles.memberImage}
          />
          <View style={styles.memberDetail}>
            <Text style={styles.mName}>Ajay Jangid</Text>
            <View style={styles.iconData}>
              <Image
                source={ic_event_time}
                resizeMode="cover"
                style={styles.icons}
              />
              <Text style={styles.number}>Date of Joining: 23 June 2010</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.nameContainer}>
            <Text
              style={[
                styles.memberTitle,
                {paddingLeft: 0, marginBottom: wp(2)},
              ]}>
              Personal Information
            </Text>
            <View style={styles.row}>
              <Image
                source={ic_phone_yellow}
                resizeMode="cover"
                style={styles.memberPic}
              />
              <Text style={styles.name}>9876543210</Text>
            </View>
            <View style={styles.row}>
              <Image
                source={ic_mail_yellow}
                resizeMode="cover"
                style={styles.memberPic}
              />
              <Text style={styles.name}>user@gmail.com</Text>
            </View>
            <View
              style={[styles.row, {borderBottomWidth: 0, paddingBottom: 0}]}>
              <Image
                source={ic_location_yellow}
                resizeMode="cover"
                style={styles.memberPic}
              />
              <Text style={styles.name}>
                A3 Mall Road Vidhyadhar Nager Jaipur Rajsthan india 302039
              </Text>
            </View>
          </View>
          <Text style={styles.memberTitle}>About Ajay Jangid</Text>
          <Text style={styles.description}>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown Lorem ipsum, or lipsum as it is sometimes
            known, is dummy text used in laying out print, graphic or web
            designs. The passage is attributed to an unknown
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
