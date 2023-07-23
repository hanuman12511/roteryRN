import React, {Component} from 'react';
import {Text, View, StatusBar, FlatList} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import MemberListComponent from 'components/MemberListComponent';

// Icons
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
    };
  }

  renderItem = ({item}) => (
    <MemberListComponent item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#02abe3" barStyle="light-content" />
        <ScreenHeader
          title="Committee"
          studentListIcon={ic_multi_student}
          showSchoolLogo
          nav={navigation}
        />
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
      </SafeAreaView>
    );
  }
}
