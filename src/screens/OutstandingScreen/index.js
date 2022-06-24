import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import DetailListComponent from 'components/DetailListComponent';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// Icons
import ic_back from 'assets/icons/ic_back.png';

export default class OutstandingFee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      infoArr: null,
      connectionState: true,
    };

    this.titleArr = ['Quarter', 'Fee', 'Last Date'];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    const outstandingFees = this.props.navigation.getParam(
      'outstandingFees',
      null,
    );

    if (outstandingFees.length === 0) {
      this.props.navigation.pop();
      showToast('You have no Outstanding Fee to show!');
      return;
    }

    let infoArr = [];

    for (const detail of outstandingFees) {
      infoArr.push([detail.description, detail.fee, detail.lastdate]);
    }

    this.setState({infoArr, isLoading: false});
  }
  componentWillUnmount() {
    this.unsubscribe();
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
        {this.state.connectionState && (
          <>
            <ScreenHeader
              backIcon={ic_back}
              title="Outstanding Fee"
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
          </>
        )}
        {this.state.connectionState === false ? (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        ) : null}
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
    padding: wp(2),
  },
  separator: {
    height: wp(2),
  },
  networkIssue: {
    height: hp(50),
    aspectRatio: 1 / 1,
  },
  offlineStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
