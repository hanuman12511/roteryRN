import React, {Component} from 'react';
import {
  Alert,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
//PopupContainer
import SendMsgPopup from 'screens/SendMsgPopup';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {
  notificationOperations,
  notificationSelectors,
} from 'idsStore/data/notifi';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class AdminNoticeBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      notifications: null,
      status: null,
      isListRefreshing: false,
      showFilterPopup: false,
      images: [],
      connectionState: true,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchNotifications();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchNotifications = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});

      await this.props.getAdminNotification();
      const response = this.props.isGetAdminNotification;
      if (this.state.connectionState === true) {
        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {output: notifications} = response;
            this.setState({
              notifications,
              status: null,
              isLoading: false,
              isListRefreshing: false,
            });
            // resetting notification count
            // await this.resetNotificationCount(params);
          } else if (success === 0) {
            const {message} = response;

            this.setState({
              status: message,
              notifications: null,
              isLoading: false,
              isListRefreshing: false,
            });
          }
        } else {
          const {message} = response;

          this.setState({
            status: message,
            notifications: null,
            isLoading: false,
            isListRefreshing: false,
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

  // resetNotificationCount = async params => {
  //   try {
  //     // calling api
  //     const response = await makeRequest(
  //       BASE_URL + 'resetNotificationCount',
  //       params,
  //     );

  //     // processing response
  //     if (response) {
  //       const {success} = response;

  //       if (success === 1) {
  //         firebase.notifications().removeAllDeliveredNotifications();
  //         this.setState({isLoading: false, isListRefreshing: false});
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchNotifications();
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item}) => {
    const {sendto, message, messageDate, image} = item;
    const renderImages = ({item}) => {
      return (
        <TouchableOpacity
          style={{elevation: 10}}
          onPress={() => this.handleImageSlider(image)}>
          <FastImage
            source={{uri: item}}
            style={{
              height: hp(8),
              marginLeft: wp(2),
              aspectRatio: 1 / 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wp(4),
            }}
          />
        </TouchableOpacity>
      );
    };
    return (
      <>
        <View style={styles.transportScreenSection}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Send To : {sendto}</Text>
            <Text style={styles.noticePosted}>{messageDate}</Text>
          </View>
          <Text style={styles.noticeHeading}>{message}</Text>
          {image !== null ? (
            <View
              style={{flex: 1, justifyContent: 'center', margin: wp(3)}}
              onPress={() => this.handleImageSlider(image)}>
              <FlatList
                data={image}
                renderItem={renderImages}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.itemSeparator}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ) : null}
        </View>
      </>
    );
  };

  handleImageSlider = image => {
    this.props.navigation.navigate('noticeBoardSlider', {
      images: image,
    });
  };

  handleSend = () => {
    this.setState({showFilterPopup: true});
  };
  closePopup2 = () => {
    this.setState({showFilterPopup: false});
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {status, notifications, isListRefreshing, showFilterPopup} =
      this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Notification"
              showSchoolLogo
              nav={this.props.navigation}
            />

            {status ? (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{status}</Text>
              </View>
            ) : (
              <View style={{flex: 1}}>
                <FlatList
                  data={notifications}
                  renderItem={this.renderItem}
                  keyExtractor={this.keyExtractor}
                  ItemSeparatorComponent={this.itemSeparator}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContentContainer}
                  refreshing={isListRefreshing}
                  onRefresh={this.handleListRefresh}
                />
              </View>
            )}
            <View style={styles.sendMsg}>
              <TouchableOpacity onPress={this.handleSend}>
                <FastImage
                  source={require('assets/icons/send_msg.png')}
                  style={styles.iconMsg}
                />
              </TouchableOpacity>
            </View>

            {showFilterPopup && (
              <SendMsgPopup
                closePopup={this.closePopup2}
                nav={this.props.navigation}
                onSendSuccess={() => this.fetchNotifications()}
              />
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
  isGetAdminNotification: notificationSelectors.isGetAdminNotification(state),
});
const mapDispatchToProps = {
  getAdminNotification: notificationOperations.getAdminNotification,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminNoticeBoardScreen);
