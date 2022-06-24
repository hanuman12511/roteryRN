import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';
import TransportListComponent from 'components/TransportListComponent';

// Images

export default class HostelScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      hostelData: [
        ['Saraswati', 'Anita Devi', '9876543210', '10', '20'],
        ['Saraswati', 'Anita Devi', '9876543210', '10', '20'],
        ['Saraswati', 'Anita Devi', '9876543210', '10', '20'],
        ['Saraswati', 'Anita Devi', '9876543210', '10', '20'],
        ['Saraswati', 'Anita Devi', '9876543210', '10', '20'],
      ],
    };
    this.titleArr = [
      'Hostel Name',
      'Warden Name',
      'Warden Mobile No.',
      'Total Rooms',
      'Total Students',
    ];

    // Navigation object
    this.nav = this.props.navigation;
  }

  onHostelPress = () => {
    this.props.navigation.push('HostelDetail');
  };

  renderItem = ({item}) => (
    <TouchableHighlight
      style={styles.hostelList}
      onPress={this.onHostelPress}
      underlayColor={'#414042'}>
      <TransportListComponent
        item={item}
        titleArr={this.titleArr}
        navigation={this.props.navigation}
      />
    </TouchableHighlight>
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Hostel" showSchoolLogo nav={this.nav} />

        <FlatList
          style={styles.hostelRow}
          data={this.state.hostelData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true} // for iOS only
          contentContainerStyle={styles.contentContainer}
        />
      </View>
    );
  }
}
