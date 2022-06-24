import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import EventComponent from 'components/EventComponent';

// Icons
import ic_multi_student from 'assets/icons/ic_multi_student.png';

// Images
import adBanner from '../../assets/images/adBanner.jpg';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberData: [
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
    <EventComponent item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#02abe3" barStyle="light-content" />
        <ScreenHeader
          title="Events"
          studentListIcon={ic_multi_student}
          showSchoolLogo
          nav={navigation}
        />
        {/* <View style={styles.searchContainer}>
          <View style={styles.searchTile}>
            <TextInput
              placeholder="Search Profession"
              style={styles.searchBar}
            />
          </View>
        </View> */}

        {/* <ScrollView> */}
        {/* <View style={styles.bannerContainer}>
            <Image
              source={adBanner}
              resizeMode="cover"
              style={styles.memberImage}
            />
          </View> */}
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
        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }
}
