import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {BASE_URL, makeRequest} from 'api/ApiInfo';

// User Preference
import {getData, getActiveSchool} from 'api/UserPreference';

export default class AdminVisitorScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      visitors: [],
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
          login_type: 'Admin',
          idsprimeID,
        };

        // calling api
        const response = await makeRequest(BASE_URL + 'visitors', params);
        if (this.state.connectionState === true) {
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
                // visitors: null,
                isLoading: false,
                isListRefreshing: false,
              });
            }
          } else {
            const {message, currentDate} = response;

            this.setState({
              status: message,
              currentDate,
              // visitors: null,
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

    const listStyle = {
      // borderLeftWidth: 3,
      // backgroundColor: item.bg,
      backgroundColor:
        '#' +
        (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
        0x15,
      // backgroundColor: '#fff',
      borderRadius: 2,
      // padding: wp(1),
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: wp(3),
      borderWidth: 1,
      borderColor: '#00000015',
    };

    return (
      <View style={listStyle}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: photo}}
            // source={photo}
            resizeMode="cover"
            style={styles.visitorPhoto}
          />
        </View>

        <View style={styles.detailPart}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.inTime}>09-12-2021, {inTime}</Text>
          </View>

          <Text style={styles.visiterNumber}>{phone}</Text>

          <View style={styles.meetRow}>
            <Text style={styles.listText}>
              <Text style={{fontWeight: '700'}}>To Meet:</Text> {toMeet} {'  '}{' '}
              ({persons} Persons)
            </Text>
          </View>

          <View style={styles.listRow}>
            <Text style={styles.listText}>{purpose}</Text>
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
            <ScreenHeader
              title="Visitor"
              showSchoolLogo
              nav={this.props.navigation}
            />
            {status ? (
              <ScrollView
                contentContainerStyle={styles.messageContainer}
                refreshControl={
                  <RefreshControl
                    refreshing={isListRefreshing}
                    onRefresh={this.handleListRefresh}
                  />
                }>
                <Text style={styles.messageText}>{status}</Text>
              </ScrollView>
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

            {/* <TouchableHighlight
          underlayColor="#414042"
          onPress={this.handleAddVisitor}
          style={[styles.addAssignmentBtn, addAssignmentButtonZIndexStyle]}>
          <Text style={styles.addAssignmentBtnIcon}>+</Text>
        </TouchableHighlight> */}
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
