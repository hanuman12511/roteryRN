import React, {Component} from 'react';
import {Text, View, FlatList, Alert, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';

//Api
import {connect} from 'react-redux';
import {
  notificationOperations,
  notificationSelectors,
} from 'idsStore/data/notifi';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
class TeacherNotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notifications: null,
      status: null,
      isListRefreshing: false,
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
        this.fetchNotifications();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchNotifications = async () => {
    try {
      // starting loader
      this.setState({isLoading: true});
      await this.props.getTeacherNotification();
      const response = this.props.isGetTeacherNotification;
      if (this.state.connectionState === true) {
        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {output: notifications} = response;
            this.setState({notifications, status: null});

            // resetting notification count
            await this.resetNotificationCount();
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
          //Alert.alert('', response.message);
          this.setState({
            status: response.message,
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

  resetNotificationCount = async () => {
    try {
      // calling api
      await this.props.resetTeacherNotification();
      const response = this.props.isResetTeacherNotification;

      // processing response
      if (response) {
        const {success} = response;

        if (success === 1) {
          // firebase.notifications().removeAllDeliveredNotifications();
          this.setState({isLoading: false, isListRefreshing: false});
        } else {
          //Alert.alert('', response.message);
          this.setState({isLoading: false, isListRefreshing: false});
        }
      } else {
        //Alert.alert('', response.message);
        this.setState({isLoading: false, isListRefreshing: false});
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
            {/* <Text>Send To : {sendto}</Text> */}
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
    this.props.navigation.navigate('teachersideNoticeSlider', {
      images: image,
    });
  };
  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {status, notifications, isListRefreshing} = this.state;

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
  isGetTeacherNotification:
    notificationSelectors.isGetTeacherNotification(state),
  isResetTeacherNotification:
    notificationSelectors.isResetTeacherNotification(state),
});
const mapDispatchToProps = {
  getTeacherNotification: notificationOperations.getTeacherNotification,
  resetTeacherNotification: notificationOperations.resetTeacherNotification,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeacherNotificationScreen);
