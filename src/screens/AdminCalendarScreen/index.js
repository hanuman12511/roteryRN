import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from './styles';
// Components
import ScreenHeader from 'components/ScreenHeader';
import EventCalendar from 'components/EventCalendar';
import CustomLoader from 'components/CustomLoader';
import ProcessingLoader from 'components/ProcessingLoader';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {studentOperations, studentSelectors} from 'idsStore/data/student';

class AdminCalendarScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      showProcessingLoader: false,
      eventData: null,
      eventTypeData: null,
      connectionState: true,
      isModalVisible: false,
      eventDateObj: null,
      eventObj: null,
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
        // starting loader
        this.setState({isLoading: true});

        this.fetchCalendarEvents();
      },
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    this.didFocusSubscription.remove();
  }

  fetchCalendarEvents = async (monthYear = '') => {
    try {
      // calling api
      // starting loader
      this.setState({showProcessingLoader: true});
      await this.props.getCalendarEvents(monthYear);
      const response = this.props.isGetCalendarEvents;
      if (this.state.connectionState === true) {
        if (response.success === 1) {
          const eventData = response.output;
          this.setState({eventData});

          if (this.state.isLoading) {
            // Calling fetchCalendarEventType
            await this.fetchCalendarEventType();
          } else {
            this.setState({isLoading: false, showProcessingLoader: false});
          }
          this.setState({isLoading: false, showProcessingLoader: false});
        } else {
          //Alert.alert('', response.message);
          this.setState({isLoading: false, showProcessingLoader: false});
        }
      } else {
        this.setState({isLoading: false, showProcessingLoader: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  fetchCalendarEventType = async () => {
    try {
      await this.props.getCalendarEventType();
      const response = this.props.isGetCalendarEventType;

      if (response.success === 1) {
        const eventTypeData = response.output;
        this.setState({eventTypeData, isLoading: false});
      } else {
        this.setState({eventTypeData: null, isLoading: false});
        //Alert.alert('', response.message);
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  renderEventTypeSection = () => {
    let itemList = [];
    let twoItemGroupList = [];
    const {eventTypeData} = this.state;

    for (let i = 0; i < eventTypeData.length; i++) {
      const eventTypeItemContainerStyle = [
        styles.eventTypeItemContainer,
        {backgroundColor: eventTypeData[i].colorcode},
      ];

      itemList.push(
        <View style={eventTypeItemContainerStyle}>
          <Text style={styles.eventType}>{eventTypeData[i].name}</Text>
        </View>,
      );

      // if ((i + 1) % 2 === 0) {
      twoItemGroupList.push(
        <View style={styles.calendarInfoSectionRow} key={i}>
          {itemList[i]}
          {/* {itemList[i]} */}
        </View>,
      );
      // }
    }
    return <View style={styles.calendarInfoSection}>{twoItemGroupList}</View>;
  };

  setViewRef = ref => {
    this.parentView = ref;
  };

  handleStartShouldSetResponder = event => {
    this.setState({isModalVisible: false});
    if (this.parentView._nativeTag === event.target) {
      this.setState({isModalVisible: false});
    }
  };

  renderEventDescriptionPopup = () => {
    const {day, month, year} = this.state.eventDateObj;
    const {title, description, color} = this.state.eventObj;

    const leftSubContainerStyles = [
      styles.leftSubContainer,
      {backgroundColor: color},
    ];

    return (
      <View
        ref={this.setViewRef}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        style={styles.popupContainer}>
        <View style={styles.popupContentContainer}>
          <View style={leftSubContainerStyles}>
            <Text style={styles.leftSubContainerText}>{month}</Text>
            <Text style={styles.leftSubContainerText}>{day}</Text>
            <Text style={styles.leftSubContainerText}>{year}</Text>
          </View>
          <View style={styles.rightSubContainer}>
            <View style={styles.rightContentContainer}>
              {/* <Text style={styles.rightSubContainerText1}>Description:</Text> */}
              <Text style={styles.rightSubContainerText2}>{description}</Text>
            </View>
            {/* <TouchableOpacity onPress={this.handleStartShouldSetResponder}>
              <Image source={remove_button} />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    );
  };

  showEventDescriptionPopup = (eventDateObj, dateString) => {
    const eventObj = this.state.eventData.find(
      item => item.start === dateString,
    );

    if (eventObj) {
      this.setState({eventDateObj, eventObj, isModalVisible: true});
    } else {
      // showToast('No event found!');
      // console.log('event data', eventDateObj, eventObj);
    }
  };

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Calendar"
              showSchoolLogo
              nav={this.props.navigation}
            />

            <View style={styles.calendarContainer}>
              <EventCalendar
                events={this.state.eventData}
                fetchCalendarEvents={this.fetchCalendarEvents}
                showEventDescriptionPopup={this.showEventDescriptionPopup}
              />
            </View>

            {this.renderEventTypeSection()}

            {this.state.isModalVisible && this.renderEventDescriptionPopup()}
          </>
        )}
        {this.state.connectionState === false ? (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        ) : null}
        {this.state.showProcessingLoader && (
          <ProcessingLoader message="Checking Events" />
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isGetCalendarEvents: studentSelectors.isGetCalendarEvents(state),
  isGetCalendarEventType: studentSelectors.isGetCalendarEventType(state),
});
const mapDispatchToProps = {
  getCalendarEvents: studentOperations.getCalendarEvents,
  getCalendarEventType: studentOperations.getCalendarEventType,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminCalendarScreen);
