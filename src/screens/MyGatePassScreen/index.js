import React, {Component} from 'react';
import {Text, View, FlatList, Alert, TouchableHighlight} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';
import DetailListComponent from 'components/DetailListComponent';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

class MyGatePassScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      myGatePasses: null,
      status: null,
      isListRefreshing: false,
      outtime: '',
      intime: '',
      addAssignmentButtonZIndex: 0,
      connectionState: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (this.isScreenPushed) {
          this.isScreenPushed = false;
          return;
        }

        this.fetchMyGatePasses();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchMyGatePasses = async (callbackMessage = null) => {
    try {
      // starting loader
      this.setState({isLoading: true});

      await this.props.getGatePass();
      const response = this.props.isGetGatePass;
      if (this.state.connectionState === true) {
        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {output: myGatePasses, outtime, intime} = response;

            this.setState(
              {
                myGatePasses,
                outtime,
                intime,
                status: null,
                isLoading: false,
                isListRefreshing: false,
              },
              () => {
                if (callbackMessage) {
                  showToast(callbackMessage);
                }
              },
            );
          } else if (success === 0) {
            const {message} = response;
            const {outtime, intime} = response;
            this.setState({
              status: message,
              myGatePasses: null,
              outtime,
              intime,
              isLoading: false,
              isListRefreshing: false,
            });
          }
        } else {
          Alert.alert(response.error);
          this.setState({isLoading: false, isListRefreshing: false});
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchMyGatePasses();
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item}) => {
    const titleArr = ['Pick Time', 'Reason', 'Picked By', 'Picker Mobile'];
    const {pickTime, pickedBy, reason, pickerMobile, createdDate} = item;
    const infoArr = [pickTime, reason, pickedBy, pickerMobile];

    return (
      <View style={styles.transportScreenSection}>
        <DetailListComponent
          titleArr={titleArr}
          infoArr={infoArr}
          skipContainerStyle
        />
        <Text style={styles.noticePosted}>Requested on: {createdDate}</Text>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleRequestGatePass = () => {
    const {outtime, intime} = this.state;
    this.isScreenPushed = true;
    this.props.navigation.push('RequestGatePass', {
      refreshMyGatePassCallback: this.fetchMyGatePasses,
      outtime,
      intime,
    });
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {status, myGatePasses, isListRefreshing, addAssignmentButtonZIndex} =
      this.state;

    const addAssignmentButtonZIndexStyle = {
      zIndex: addAssignmentButtonZIndex,
    };

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Gate Pass"
              showSchoolLogo
              nav={this.props.navigation}
            />
            {status ? (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{status}</Text>
              </View>
            ) : (
              <FlatList
                data={myGatePasses}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.itemSeparator}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContentContainer}
                refreshing={isListRefreshing}
                onRefresh={this.handleListRefresh}
              />
            )}
            <TouchableHighlight
              underlayColor="#414042"
              onPress={this.handleRequestGatePass}
              style={[styles.addAssignmentBtn, addAssignmentButtonZIndexStyle]}>
              <Text style={styles.addAssignmentBtnIcon}>+</Text>
            </TouchableHighlight>
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
  isGetGatePass: studentSelectors.isGetGatePass(state),
});
const mapDispatchToProps = {
  getGatePass: studentOperations.getGatePass,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGatePassScreen);
