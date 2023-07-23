import React, {Component} from 'react';
import {Text, View, StatusBar, FlatList, Image} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import ClubComponent from 'components/ClubComponent';

// Icons
import ic_multi_student from 'assets/icons/ic_multi_student.png';
import ic_event_time from 'assets/icons/ic_event_time.png';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberData: [
        {
          ClubName: 'Jai Club Jaipur',
          Members: '200',
          FDate: '23 June 2010',
        },
        {
          ClubName: 'Jaipur Club Jaipur',
          Members: '200',
          FDate: '23 June 2010',
        },
        {
          ClubName: 'Jai Club Jaipur',
          Members: '200',
          FDate: '23 June 2010',
        },
        {
          ClubName: 'Jaipur Club Jaipur',
          Members: '200',
          FDate: '23 June 2010',
        },
        {
          ClubName: 'Jai Club Jaipur',
          Members: '200',
          FDate: '23 June 2010',
        },
        {
          ClubName: 'Jaipur Club Jaipur',
          Members: '200',
          FDate: '23 June 2010',
        },
        {
          ClubName: 'Jai Club Jaipur',
          Members: '200',
          FDate: '23 June 2010',
        },
        {
          ClubName: 'Jaipur Club Jaipur',
          Members: '200',
          FDate: '23 June 2010',
        },
        {
          ClubName: 'Jai Club Jaipur',
          Members: '200',
          FDate: '23 June 2010',
        },
        {
          ClubName: 'Jaipur Club Jaipur',
          Members: '200',
          FDate: '23 June 2010',
        },
      ],
    };
  }

  renderItem = ({item}) => (
    <ClubComponent item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#02abe3" barStyle="light-content" />
        <ScreenHeader
          title="Clubs"
          studentListIcon={ic_multi_student}
          showSchoolLogo
          nav={navigation}
        />
        {/* <View style={styles.calenderPicker}>
          <Text style={styles.calenderText}>Search By Date</Text>
          <Image
            source={ic_event_time}
            resizeMode="cover"
            style={styles.calenderIcon}
          />
        </View> */}
        <FlatList
          data={this.state.memberData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.listContentContainer]}
          refreshing={this.state.isListRefreshing}
          onRefresh={this.handleListRefresh}
        />
      </SafeAreaView>
    );
  }
}
