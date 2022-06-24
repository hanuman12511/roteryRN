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

export default class TransportScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      transportData: [
        [
          'RJ-5800',
          'Amit Ji',
          '9876543210',
          'Vidhyadhar Nagar to C-Scheme',
          '20',
        ],
        [
          'RJ-2458',
          'Deepak Ji',
          '9876543210',
          'Vidhyadhar Nagar to C-Scheme',
          '20',
        ],
        [
          'RJ-4586',
          'Anup Ji',
          '9876543210',
          'Vidhyadhar Nagar to C-Scheme',
          '20',
        ],
        [
          'RJ-2500',
          'Dinesh Ji',
          '9876543210',
          'Vidhyadhar Nagar to C-Scheme',
          '20',
        ],
        [
          'RJ-2500',
          'Lokesh Ji',
          '9876543210',
          'Vidhyadhar Nagar to C-Scheme',
          '20',
        ],
      ],
    };

    this.titleArr = [
      'Vehicle No.',
      'Driver Name',
      'Mobile No.',
      'Route',
      'Total Kids',
    ];

    // Navigation object
    this.nav = this.props.navigation;
  }

  onTransportPress = () => {
    this.props.navigation.push('TransportDetail');
  };

  renderItem = ({item}) => (
    <TouchableHighlight
      style={styles.hostelList}
      onPress={this.onTransportPress}
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
        <ScreenHeader title="Transport" showSchoolLogo nav={this.nav} />

        <FlatList
          style={styles.transportRow}
          data={this.state.transportData}
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
