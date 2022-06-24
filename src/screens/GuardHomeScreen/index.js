import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';

// Components
import GuardScreenHeader from 'components/GuardScreenHeader';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// Icons
import ic_visiter_name from 'assets/icons/ic_visiter_name.png';
import ic_visiter_mobile from 'assets/icons/ic_visiter_mobile.png';
import ic_visiter_number from 'assets/icons/ic_visiter_number.png';
import ic_visiter_to_meet from 'assets/icons/ic_visiter_to_meet.png';
import ic_visiter_time from 'assets/icons/ic_visiter_time.png';
import ic_visiter_purpose from 'assets/icons/ic_visiter_purpose.png';

// API
import {BASE_URL, makeRequest} from 'api/ApiInfo';

// User Preference
import {getData, getActiveSchool} from 'api/UserPreference';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';

//gif
import offline from 'assets/icons/internetConnectionState.gif';

export default class GuardHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      visitors: null,
      currentDate: null,
      status: null,
      isListRefreshing: false,
      connectionState: true,
      addAssignmentButtonZIndex: 0,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // subscribing to didFocus listener
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      async () => {
        try {
          if (this.isScreenPushed) {
            this.isScreenPushed = false;
            return;
          }

          await this.fetchVisitors();
        } catch (error) {
          console.log(error.message);
        }
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchVisitors = async (callbackMessage = null) => {
    try {
      // starting loader
      this.setState({isLoading: true});
      if (this.state.connectionState === true) {
        // fetching active school from local storage
        const activeSchool = await getActiveSchool();
        if (!activeSchool) {
          return;
        }

        // fetching userInfo from local storage
        const userInfo = await getData();

        if (userInfo) {
          const {idsprimeID} = activeSchool;

          // preparing params
          const params = {
            userId: userInfo.empId,
            login_type: 'Guard',
            idsprimeID,
          };

          // calling api
          const response = await makeRequest(BASE_URL + 'visitors', params);

          // processing response
          if (response) {
            const {success} = response;

            if (success === 1) {
              const {output: visitors, currentDate} = response;

              this.setState(
                {
                  visitors,
                  currentDate,
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
              const {message, currentDate} = response;

              this.setState({
                status: message,
                currentDate,
                visitors: null,
                isLoading: false,
                isListRefreshing: false,
              });
            }
          } else {
            const {message, currentDate} = response;
            this.setState({
              status: message,
              currentDate,
              visitors: null,
              isLoading: false,
              isListRefreshing: false,
            });
          }
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
      await this.fetchVisitors();
    } catch (error) {
      console.log(error.message);
    }
  };

  renderItem = ({item}) => {
    const {photo, name, phone, persons, toMeet, purpose, inTime} = item;

    return (
      <View style={styles.transportScreenSection}>
        <Image
          source={{uri: photo}}
          resizeMode="cover"
          style={styles.visitorPhoto}
        />

        <View style={styles.detailPart}>
          <View style={styles.listRow}>
            <Image
              source={ic_visiter_name}
              resizeMode="cover"
              style={styles.listIcon}
            />
            <Text style={styles.listText}>{name}</Text>
          </View>

          <View style={styles.listRow}>
            <Image
              source={ic_visiter_mobile}
              resizeMode="cover"
              style={styles.listIcon}
            />
            <Text style={styles.listText}>{phone}</Text>
          </View>

          <View style={styles.listRow}>
            <Image
              source={ic_visiter_number}
              resizeMode="cover"
              style={styles.listIcon}
            />
            <Text style={styles.listText}>{persons}</Text>
          </View>

          <View style={styles.listRow}>
            <Image
              source={ic_visiter_to_meet}
              resizeMode="cover"
              style={styles.listIcon}
            />
            <Text style={styles.listText}>{toMeet}</Text>
          </View>

          <View style={styles.listRow}>
            <Image
              source={ic_visiter_purpose}
              resizeMode="cover"
              style={styles.listIcon}
            />
            <Text style={styles.listText}>{purpose}</Text>
          </View>

          <View style={styles.listRow}>
            <Image
              source={ic_visiter_time}
              resizeMode="cover"
              style={styles.listIcon}
            />
            <Text style={styles.listText}>{inTime}</Text>
          </View>
        </View>
      </View>
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleAddVisitor = () => {
    this.isScreenPushed = true;
    this.props.navigation.push('AddVisitor', {
      refreshVisitorsCallback: this.fetchVisitors,
    });
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {
      status,
      visitors,
      currentDate,
      isListRefreshing,
      addAssignmentButtonZIndex,
    } = this.state;

    const addAssignmentButtonZIndexStyle = {
      zIndex: addAssignmentButtonZIndex,
    };

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <GuardScreenHeader
              title="Daily Visitors"
              currentDate={currentDate}
              nav={this.props.navigation}
              showLogoutButton
              showSchoolLogo
            />

            {status ? (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{status}</Text>
              </View>
            ) : (
              <FlatList
                data={visitors}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.itemSeparator}
                contentContainerStyle={styles.listContentContainer}
                refreshing={isListRefreshing}
                onRefresh={this.handleListRefresh}
              />
            )}

            <TouchableHighlight
              underlayColor="#414042"
              onPress={this.handleAddVisitor}
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
