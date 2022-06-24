import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import CustomLoader from 'components/CustomLoader';
import ScreenHeader from 'components/ScreenHeader';
import StudentAbsentItem from 'components/StudentAbsentItem';

// Icons
import ic_back from 'assets/icons/ic_back.png';

export default class StudentAbsentScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      absentStudentsData: null,
    };
  }

  componentDidMount() {
    const absentStudentsData = this.props.navigation.getParam(
      'absentStudentsData',
      null,
    );

    absentStudentsData && this.setState({absentStudentsData, isLoading: false});
  }

  renderItem = ({item, index}) => (
    <StudentAbsentItem item={item} index={index} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return this.state.isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          backIcon={ic_back}
          title="Absent Students"
          nav={this.props.navigation}
        />

        <View style={styles.listHeader}>
          <Text style={styles.listHeaderItem1}>Serial No</Text>
          <Text style={styles.listHeaderItem2}>Enroll No</Text>
          <Text style={styles.listHeaderItem3}>Name</Text>
        </View>

        <FlatList
          data={this.state.absentStudentsData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true} // for iOS only
          contentContainerStyle={styles.contentContainer}
        />
      </SafeAreaView>
    );
  }
}
