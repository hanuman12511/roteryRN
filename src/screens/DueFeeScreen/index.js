import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import DetailListComponent from 'components/DetailListComponent';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// Icons
import ic_back from 'assets/icons/ic_back.png';

export default class DueFee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      infoArr: null,
    };

    this.titleArr = ['Fee Head', 'Fee', 'Last Date'];
  }

  componentDidMount() {
    const dueFees = this.props.navigation.getParam('dueFees', null);

    if (dueFees.length === 0) {
      this.props.navigation.pop();
      showToast('You have no Due Fee to show!');
      return;
    }

    let infoArr = [];

    for (const detail of dueFees) {
      infoArr.push([detail.description, detail.fee, detail.lastdate]);
    }

    this.setState({infoArr, isLoading: false});
  }

  renderItem = ({item}) => (
    <DetailListComponent titleArr={this.titleArr} infoArr={item} />
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
          title="Due Fee"
          nav={this.props.navigation}
        />

        <FlatList
          data={this.state.infoArr}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  listContentContainer: {
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  separator: {
    height: 8,
  },
});
