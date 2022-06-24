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
import ic_phone_yellow from 'assets/icons/ic_phone_yellow.png';
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
          title="Club Detail"
          studentListIcon={ic_multi_student}
          showSchoolLogo
          nav={navigation}
        />

        <View style={styles.tileContainer}>
          <Image
            source={RotaryClub}
            resizeMode="cover"
            style={styles.memberImage}
          />
          <View style={styles.memberDetail}>
            <Text style={styles.name}>
              Jai Club Jaipur
              <Text style={styles.designation}>(200 Members)</Text>
            </Text>
            <View style={styles.iconData}>
              <Image
                source={ic_phone_yellow}
                resizeMode="cover"
                style={styles.icons}
              />
              <Text style={styles.number}>Date of Formation: 23 June 2010</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.nameContainer}>
            <View style={styles.row}>
              <Image
                source={memberImage}
                resizeMode="cover"
                style={styles.memberPic}
              />
              <Text style={styles.name}>
                Vikas Solanki{' '}
                <Text style={styles.designation}>(President)</Text>
              </Text>
            </View>
            <View style={styles.row}>
              <Image
                source={memberImage}
                resizeMode="cover"
                style={styles.memberPic}
              />
              <Text style={styles.name}>
                Dheerendra Solanki{' '}
                <Text style={styles.designation}>(Treasurer)</Text>
              </Text>
            </View>
            <View
              style={[styles.row, {borderBottomWidth: 0, paddingBottom: 0}]}>
              <Image
                source={memberImage}
                resizeMode="cover"
                style={styles.memberPic}
              />
              <Text style={styles.name}>
                Dinesh Bijarniya{' '}
                <Text style={styles.designation}>(Secretary)</Text>
              </Text>
            </View>
          </View>
          <Text style={styles.memberTitle}>Members</Text>

          <FlatList
            data={this.state.memberData}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.itemSeparator}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
            refreshing={this.state.isListRefreshing}
            onRefresh={this.handleListRefresh}
          />

          <Text style={[styles.memberTitle, {marginTop: hp(2)}]}>
            Last Activities
          </Text>

          <FlatList
            data={this.state.activityData}
            renderItem={this.activityItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.itemSeparator}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
            refreshing={this.state.isListRefreshing}
            onRefresh={this.handleListRefresh}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
