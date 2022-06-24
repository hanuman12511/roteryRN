import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// Components
import CustomLoader from 'components/CustomLoader';
import ScreenHeader from 'components/ScreenHeader';
import DetailListComponent from 'components/DetailListComponent';

// Icons
import ic_fee from 'assets/icons/ic_fee.png';

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class AdminFeeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      connectionState: true,
      pendingFees: null,
      feesCollection: null,
      status: null,
      isListRefreshing: false,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchFeesInfo();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchFeesInfo = async () => {
    try {
      // processing response
      await this.props.getFeesCollection();
      const response = this.props.isGetFeesCollection;
      if (this.state.connectionState === true) {
        if (response) {
          const {success} = response;
          console.log(response);
          if (success === 1) {
            const {output: feesCollection} = response;
            const {pendingFees} = feesCollection;
            delete feesCollection.pendingFees;

            this.setState({
              pendingFees,
              feesCollection,
              status: null,
              isLoading: false,
              isListRefreshing: false,
            });
          } else {
            const {message: status} = response;
            this.setState({
              status,
              pendingFees: null,
              feesCollection: null,
              isListRefreshing: false,
              isLoading: false,
            });
          }
        } else {
          const {message: status} = response;
          this.setState({
            status,
            pendingFees: null,
            feesCollection: null,
            isListRefreshing: false,
            isLoading: false,
          });
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  renderFeesInfo = () => {
    const {feesCollection} = this.state;

    const keys = Object.keys(feesCollection);

    const elementsToRender = keys.map((key, index) => {
      const item = feesCollection[key];
      const {total, cash, cheque, dd, card, netbanking} = item;

      const titleArr = ['Total', 'Cash', 'Cheque', 'DD', 'Card', 'Net Banking'];
      const infoArr = [total, cash, cheque, dd, card, netbanking];
      function allAreNull(arr) {
        return arr.every(element => element === null);
      }
      console.log(allAreNull(infoArr));
      return allAreNull(infoArr) !== true ? (
        <View style={styles.dateSheetContainer} key={index}>
          <Text style={styles.noticeHeading}>Fees Collected {key}:</Text>

          <DetailListComponent
            titleArr={titleArr}
            infoArr={infoArr}
            skipContainerStyle
          />
        </View>
      ) : (
        <View style={styles.dateSheetContainer} key={index}>
          <Text style={styles.noticeHeading2}>No Fees Collected {key}</Text>
        </View>
      );
    });

    return (
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isListRefreshing}
            onRefresh={this.handleListRefresh}
          />
        }>
        {elementsToRender}
      </ScrollView>
    );
  };
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchFeesInfo();
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {pendingFees, status} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Fees"
              showSchoolLogo
              nav={this.props.navigation}
            />

            {status ? (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{status}</Text>
              </View>
            ) : (
              <View style={styles.feeInnerContent}>
                <View style={styles.totalPaidFeeDisplay}>
                  <View style={styles.totalPaidFeeAmount}>
                    <Image
                      style={styles.totalPaidFeeIcon}
                      source={ic_fee}
                      resizeMode="cover"
                    />
                    <Text style={styles.totalPaidFeeValue}>
                      {pendingFees}/-
                    </Text>
                  </View>

                  <Text style={styles.paidFeeTitle}>Pending Fees</Text>
                </View>

                {this.state.feesCollection != null
                  ? this.renderFeesInfo()
                  : null}
              </View>
            )}
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
const mapStateToProps = state => ({
  isGetFeesCollection: adminSelectors.isGetFeesCollection(state),
});
const mapDispatchToProps = {
  getFeesCollection: adminOperations.getFeesCollection,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminFeeScreen);
