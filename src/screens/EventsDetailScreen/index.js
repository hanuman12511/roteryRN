import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker, Item} from '@react-native-picker/picker';
import PickerModal from 'react-native-picker-modal-view';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
import eventData from './event.js';
// Images
import eventImage from 'assets/images/eventImage.jpg';
// Icons
import ic_multi_student from 'assets/icons/ic_multi_student.png';
import ic_ticket_yellow from 'assets/icons/ic_ticket_yellow.png';
import ic_event_time from 'assets/icons/ic_event_time.png';
import ic_location_yellow from 'assets/icons/ic_location_yellow.png';
import ic_message_yellow from 'assets/icons/ic_message_yellow.png';
import ic_ticket_type from 'assets/icons/ic_ticket_yellow.png';
import ic_no_of_tickets from 'assets/icons/ic_no_of_tickets.png';
import ic_down_black from 'assets/icons/ic_down_black.png';
// // API
// import buyTicket from 'api/BuyTicketAPI';
// import confirmTicket from 'api/ConfirmTicketAPI';

export default class EventDetailScreen extends Component {
  static navigationOptions = {
    title: 'Event Detail',
    headerTitleContainerStyle: {
      justifyContent: 'center',
      marginLeft: -40,
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      // selectedTicketType: 'Select Ticket Type',
      selectedTicketTypeId: null,
      availableSeatsOfSelectedTicketType: 0,
      pricePerTicket: 0,
      // noOfTickets: 'Select Number of Tickets',
      modalVisible: false,
      mpesaPhoneModalVisible: false,
      mobileNumber: '',
      showError: '',
      ticketType: '',
      selectedTicketType: {
        Id: 1,
        Name: 'Select Ticket Type',
        Value: 'Select Ticket Type',
      },
      ticketCount: '',
      noOfTickets: {
        Id: -1,
        Name: 'Select Number of Tickets',
        Value: 'Select Number of Tickets',
      },
    };

    // this.event = this.props.navigation.getParam('item', null);
    // console.log('itemData', this.event);
  }

  componentDidMount() {
    // const scrollToEnd = this.props.navigation.getParam('scrollToEnd', false)
    // if (scrollToEnd && this.scrollViewRef) {
    // 	this.scrollViewRef.scrollToEnd({ animated: false })
    // }

    const ticketType = eventData.map((item, index) => ({
      Id: item.Id,
      Name: item.Name,
      Value: item.Value,
    }));
    this.setState({ticketType});

    setTimeout(() => {
      this.setState({isLoading: false});
    }, 3000);
  }

  setScrollViewRef = ref => {
    this.scrollViewRef = ref;
  };

  onAlertOkPress = () => {
    this.props.navigation.pop();
    this.props.navigation.navigate('Tickets', {refreshTickets: true});
  };

  // onConfirmTicketClick = async () => {
  //   // This method should in turn call the confirmTicket on the MobileController,
  //   //it should also pass eventID and mobile number as paramaters
  //   try {
  //     const response = await confirmTicket(this.checkOutRequestId);

  //     if (response.success) {
  //       //if the result from API is success, then direct them to the tickets activity/page
  //       Alert.alert(
  //         'Success',
  //         'Transaction completed Successfully!!!',
  //         [{text: 'OK', onPress: this.onAlertOkPress}],
  //         {cancelable: false},
  //       );
  //     } else {
  //       //If the result is false, should display the result from API and dont direct them to the ticket activity
  //       Alert.alert('Error', response.status, [{text: 'OK'}], {
  //         cancelable: false,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  // onBuyTicketClick = async () => {
  //   try {
  //     if (this.state.noOfTickets.Name != 'Select Number of Tickets') {
  //       // Preparing request params
  //       const {noOfTickets, pricePerTicket, selectedTicketTypeId} = this.state;
  //       console.log(noOfTickets, pricePerTicket, selectedTicketTypeId);
  //       const event = this.event;
  //       const eventId = event.eventId;
  //       const amount = pricePerTicket * noOfTickets.Id;

  //       this.setState({modalVisible: true});

  //       const mpesaPhone = this.state.mobileNumber;
  //       const result = await buyTicket(
  //         eventId,
  //         noOfTickets.Id,
  //         amount,
  //         mpesaPhone,
  //         selectedTicketTypeId,
  //       );

  //       if (result.success) {
  //         // If Success, display stkpush popup message
  //         this.checkOutRequestId = result.CheckoutRequestID;

  //         setTimeout(() => {
  //           this.setState({modalVisible: false});

  //           Alert.alert(
  //             'Success',
  //             result.status,
  //             [
  //               {
  //                 text: 'OK',
  //                 onPress: this.onConfirmTicketClick,
  //               },
  //             ], //when OK is pressed, call the confirm payment
  //             {cancelable: false},
  //           );
  //         }, 15000); // created 15 seconds delay for STK Push to appear
  //       } else {
  //         this.setState({modalVisible: false});

  //         Alert.alert(
  //           'Transaction Failed',
  //           result.status,
  //           [{text: 'OK', onPress: this.handleMPesaPhoneModal}],
  //           {cancelable: false},
  //         );
  //       }
  //     } else {
  //       Alert.alert('', 'Please select Number of Tickets!', [{text: 'OK'}], {
  //         cancelable: false,
  //       });
  //     }
  //   } catch (error) {
  //     const errMessage = error.message;
  //     console.log(errMessage);
  //   }
  // };

  handleMPesaPhoneModal = () => {
    this.setState({mpesaPhoneModalVisible: true});
  };

  handleSelectTicketType = (itemValue, itemIndex) => {
    const newState = {
      selectedTicketType: itemValue,
      selectedTicketTypeId: null,
      availableSeatsOfSelectedTicketType: 0,
      pricePerTicket: 0,
    };
    console.log(itemValue, itemIndex);
    if (itemIndex > 0) {
      const event = {
        eventsDetail: 'hello',
      };

      if (event) {
        const {eventsDetail} = event;

        const {noOfTickets, pricePerTicket} = eventsDetail[0];

        newState.selectedTicketTypeId = itemIndex;
        newState.availableSeatsOfSelectedTicketType = noOfTickets;
        newState.pricePerTicket = pricePerTicket;
      }
    }

    this.setState(newState);
  };

  handleSelectNumberOfTickets = (itemValue, itemIndex) => {
    this.setState({noOfTickets: itemValue});
  };

  renderSelectTicketTypeList() {
    const event = {
      eventsDetail: 'hello',
    };
    if (event) {
      // const {tickets} = event;
      const {eventsDetail} = event;
      console.log(eventsDetail);

      const ticketTypes = Object.keys(eventsDetail);
      console.log(ticketTypes);
      let listOfItems = eventsDetail.map((ticketType, index) => {
        console.log(ticketType, index);
        return (
          <Item
            label={ticketType.ticketType}
            value={ticketType.ticketType}
            key={index}
          />
        );
      });

      return listOfItems;
    }
  }

  renderSelectTicketsList(selectedTicketType) {
    let listOfItems = [];

    for (let i = 1; i <= selectedTicketType.Id; i++)
      listOfItems.push({Id: i, Name: `${i}`, Value: `${i}`});
    this.setState({
      ticketCount: listOfItems,
      pricePerTicket: parseInt(selectedTicketType.Value),
    });
  }

  onMobileNumberChange = changedText => {
    this.setState({mobileNumber: changedText, showError: ''});
  };

  handleMPesaPhoneModalOK = () => {
    if (this.state.mobileNumber) {
      if (this.isMobileNumber(this.state.mobileNumber)) {
        // close modal
        this.setState({mpesaPhoneModalVisible: false});

        // initiate buy ticket
        // this.onBuyTicketClick();
      } else {
        this.setState({showError: 'Invalid mobile number!'});
      }
    } else {
      this.setState({showError: 'Enter mpesa mobile number!'});
    }
  };

  isMobileNumber(number) {
    const pattern = /^\d{10}$/;
    return pattern.test(number);
  }

  handleMPesaPhoneModalClose = () => {
    this.setState({
      mpesaPhoneModalVisible: false,
      mobileNumber: '',
      showError: '',
    });
  };

  // ticketType
  handleSelectCategory = (selectedTicketType, index) => {
    this.setState({selectedTicketType});
    this.renderSelectTicketsList(selectedTicketType);
    return selectedTicketType;
  };

  handleSelectCategoryClose = () => {
    const {selectedTicketType} = this.state;
    this.setState({selectedTicketType});
  };

  renderSelectCategoryPicker = (disabled, selected, showModal) => {
    const {selectedTicketType} = this.state;
    const {Name} = selectedTicketType;

    const labelStyle = {
      flex: 1,
      fontSize: wp(3),
      color: '#333',
    };

    if (Name === 'Select Ticket Type') {
      labelStyle.color = '#999';
    }

    const handlePress = disabled ? null : showModal;

    return (
      <TouchableOpacity underlayColor="transparent" onPress={handlePress}>
        <View style={styles.pickerSelectView}>
          <Text style={labelStyle}>{Name}</Text>
          <Image
            source={ic_down_black}
            resizeMode="cover"
            style={styles.pickerSelectViewIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };

  // No of tickets
  handleSelectNoOfTicket = (noOfTickets, index) => {
    this.setState({noOfTickets});
    return noOfTickets;
  };

  handleSelectNoOfTicketClose = () => {
    const {noOfTickets} = this.state;
    this.setState({noOfTickets});
  };

  renderSelectTicketNoPicker = (disabled, selected, showModal) => {
    const {noOfTickets} = this.state;
    const {Name} = noOfTickets;

    const labelStyle = {
      flex: 1,
      fontSize: wp(3),
      color: '#333',
    };

    if (Name === 'Select Ticket Type') {
      labelStyle.color = '#999';
    }

    const handlePress = disabled ? null : showModal;

    return (
      <TouchableOpacity underlayColor="transparent" onPress={handlePress}>
        <View style={styles.pickerSelectView}>
          <Text style={labelStyle}>{Name}</Text>
          <Image
            source={ic_down_black}
            resizeMode="cover"
            style={styles.pickerSelectViewIcon}
          />
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    // const event = this.event;
    // if (!event) {
    //   return null;
    // }

    const {
      noOfTickets,
      selectedTicketType,
      availableSeatsOfSelectedTicketType,
      pricePerTicket,
      isLoading,
    } = this.state;

    const startDateTime = ['10.00', '5.00'];
    const endDateTime = ['10.00', '5.00'];
    const amount =
      noOfTickets.Name === 'Select Number of Tickets'
        ? 0
        : pricePerTicket * noOfTickets.Id;
    // console.log(
    //   amount,
    //   noOfTickets.Id,
    //   pricePerTicket,
    //   noOfTickets.Name,
    //   noOfTickets.Name === 'Select Number of Tickets',
    // );
    const isSelectedTicketType =
      selectedTicketType.Name !== 'Select Ticket Type';

    const isTicketAvailable = selectedTicketType.Id > 0;
    const buttonTitle = isTicketAvailable ? 'Buy Ticket' : 'Sold Out';
    const buttonAction = isTicketAvailable ? this.onBuyTicketClick : null;

    return isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#02abe3" barStyle="light-content" />
        <ScreenHeader
          title="Event Detail"
          studentListIcon={ic_multi_student}
          showSchoolLogo
          nav={this.props.navigation}
        />
        <ScrollView
          ref={this.setScrollViewRef}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.mainContainer1}>
              <View style={styles.infoItem}>
                <View style={styles.pickerImageTitle}>
                  <Image
                    source={ic_ticket_yellow}
                    resizeMode="cover"
                    style={styles.titleIcon}
                  />
                </View>

                <View style={styles.pickerContainer}>
                  <PickerModal
                    items={eventData}
                    selected={this.state.selectedTicketType}
                    onSelected={this.handleSelectCategory.bind(this)}
                    onClosed={this.handleSelectCategoryClose.bind(this)}
                    showToTopButton={true}
                    showAlphabeticalIndex={true}
                    // autoGenerateAlphabeticalIndex={true}
                    searchPlaceholderText="Search"
                    renderSelectView={this.renderSelectCategoryPicker.bind(
                      this,
                    )}
                    style={styles.pickerInput}
                  />
                </View>
              </View>

              {/* <View style={styles.separator} /> */}

              {isSelectedTicketType && isTicketAvailable && (
                <View style={styles.infoItem}>
                  <View style={styles.pickerImageTitle}>
                    <Image
                      source={ic_no_of_tickets}
                      resizeMode="cover"
                      style={styles.titleIcon}
                    />
                  </View>

                  <View style={styles.pickerContainer}>
                    <PickerModal
                      items={this.state.ticketCount}
                      selected={this.state.noOfTickets}
                      onSelected={this.handleSelectNoOfTicket}
                      onClosed={this.handleSelectNoOfTicketClose}
                      // backButtonDisabled
                      showToTopButton={true}
                      showAlphabeticalIndex={true}
                      autoGenerateAlphabeticalIndex={true}
                      searchPlaceholderText="Search"
                      renderSelectView={this.renderSelectTicketNoPicker}
                      // style={styles.pickerInput}
                    />
                    {/* <Picker
                    selectedValue={this.state.noOfTickets}
                    onValueChange={this.handleSelectNumberOfTickets}>
                    <Item
                      label="Select Number of Tickets"
                      value="Select Number of Tickets"
                    />
                    {this.renderSelectTicketsList()}
                  </Picker> */}
                  </View>
                </View>
              )}

              {isSelectedTicketType && isTicketAvailable && <View />}

              {isSelectedTicketType && isTicketAvailable && (
                <View style={styles.amountContainer}>
                  <Text style={styles.amountLabelText}>Total</Text>
                  <Text style={styles.amountLabelText}>RS {amount}</Text>
                </View>
              )}

              {isSelectedTicketType && (
                <TouchableOpacity
                  style={styles.buyTicketButton}
                  onPress={buttonAction}>
                  <Text style={styles.buyTicketButtonText}>{buttonTitle}</Text>
                </TouchableOpacity>
              )}

              {isSelectedTicketType && <View style={styles.separator} />}
            </View>

            <ImageBackground
              source={eventImage}
              resizeMode="cover"
              style={styles.eventImageContainer}>
              <View style={styles.priceLabelContainer}>
                <Text style={styles.priceLabelText}>
                  RS {pricePerTicket} / Ticket
                </Text>
              </View>
            </ImageBackground>

            <View style={styles.mainContainer2}>
              <View style={styles.infoItem2}>
                <Image
                  source={ic_ticket_yellow}
                  resizeMode="cover"
                  style={styles.titleIcon}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.titleText}>E-Ticket</Text>
                  <Text style={styles.descriptionText}>
                    There are e-tickets and you will able to share with your
                    friends
                  </Text>
                </View>
              </View>

              {/* {event.eventVideoURL && (
              <View style={styles.videoContainer}>
                <VideoComponent videoURL={event.eventVideoURL} />
              </View>
            )} */}

              <View style={styles.infoItem2}>
                <Image
                  source={ic_event_time}
                  resizeMode="cover"
                  style={styles.titleIcon}
                />
                <View style={styles.textContainer}>
                  <View style={styles.rowContainer}>
                    {/* <Text style={styles.titleText}>{startDateTime[0]}</Text> */}
                    <Text style={styles.titleText}>June 26 2022</Text>
                    <Text style={styles.separator}>|</Text>
                    <Text style={styles.titleText}>05:00 PM</Text>
                    {/* <Text style={styles.titleText}>{startDateTime[1]}</Text> */}
                  </View>

                  {/* <View style={styles.dateTimeSeparator} /> */}

                  <View style={styles.rowContainer}>
                    {/* <Text style={styles.titleText}>{endDateTime[0]}</Text>
                  <Image
                    source={ic_clock_pink}
                    resizeMode="cover"
                    style={styles.clockIcon}
                  />
                  <Text style={styles.titleText}>{endDateTime[1]}</Text> */}
                    <Text style={styles.titleText}>June 26 2022</Text>
                    <Text style={styles.separator}>|</Text>
                    <Text style={styles.titleText}>06:00 PM</Text>
                  </View>
                </View>
              </View>

              {/* <View style={styles.separator} /> */}

              <View style={styles.infoItem2}>
                <Image
                  source={ic_location_yellow}
                  resizeMode="cover"
                  style={styles.titleIcon}
                />
                <View style={[styles.textContainer, styles.wrapContainer]}>
                  <Text style={styles.titleText}>JAIPUR</Text>
                </View>
              </View>

              {/* <View style={styles.separator} /> */}

              <View style={styles.infoItem2}>
                <Image
                  source={ic_message_yellow}
                  resizeMode="cover"
                  style={styles.titleIcon}
                />
                <View style={[styles.textContainer, styles.wrapContainer]}>
                  <Text style={styles.descriptionText}>MESSAGE</Text>
                </View>
              </View>

              {/* <View style={styles.infoItem2}>
						<View style={styles.pickerImageTitle}>
							<Image
								source={ic_no_of_tickets}
								resizeMode='cover'
								style={styles.titleIcon}
							/>
						</View>

						<View style={styles.pickerContainer}>
							<Picker
								selectedValue={this.state.noOfTickets}
								onValueChange={this.handleSelectNumberOfTickets}
							>
								<Item
									label='Select Number of Tickets'
									value='Select Number of Tickets'
								/>
								{this.renderSelectTicketsList()}
							</Picker>
						</View>
					</View>

					<View style={styles.separator} />

					<View style={styles.amountContainer}>
						<Text style={styles.amountLabelText}>Total</Text>
						<Text style={styles.amountLabelText}>KES {amount}</Text>
					</View>

					<TouchableOpacity
						style={styles.buyTicketButton}
						onPress={this.onBuyTicketClick}
					>
						<Text style={styles.buyTicketButtonText}>Buy Ticket</Text>
					</TouchableOpacity> */}
            </View>

            {this.state.modalVisible && (
              <View style={styles.modalContainer}>
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}

            {this.state.mpesaPhoneModalVisible && (
              <View style={styles.modalContainer}>
                <View style={styles.mpesaPhoneInputContainer}>
                  <TouchableOpacity
                    onPress={this.handleMPesaPhoneModalClose}
                    style={styles.modalCloseButton}>
                    <Text style={styles.modalCloseButtonTitle}>X</Text>
                  </TouchableOpacity>

                  <Text style={styles.mpesaPhoneInputTitle}>
                    Enter MPesa Line & Buy Again
                  </Text>

                  <TextInput
                    style={styles.mpesaPhoneInput}
                    placeholder="Enter Mpesa Mobile Number"
                    keyboardType="numeric"
                    maxLength={10}
                    value={this.state.mobileNumber}
                    onChangeText={this.onMobileNumberChange}
                  />

                  <Text style={styles.errorText}>{this.state.showError}</Text>

                  <TouchableOpacity
                    style={styles.mpesaPhoneModalButton}
                    onPress={this.handleMPesaPhoneModalOK}>
                    <Text style={styles.mpesaPhoneModalButtonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const LINE_SPACING = 12;
const VIDEO_FRAME_HEIGHT = 220;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventImageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  priceLabelContainer: {
    height: 40,
    backgroundColor: '#f6ad0a',
    borderRadius: 8,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: -20,
  },
  priceLabelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  mainContainer1: {
    padding: 10,
    backgroundColor: '#1ba2de',
  },
  mainContainer2: {
    marginTop: 40, // 20 + 20
    marginHorizontal: 10,
  },
  infoItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: wp(3),
    alignItems: 'center',
    marginTop: wp(2),
  },
  infoItem2: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: wp(3),
    alignItems: 'center',
    marginTop: wp(2),
  },
  titleIcon: {
    width: 20,
    height: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
  titleText: {
    color: '#000',
    fontSize: wp(3.5),
    fontWeight: '400',
  },
  wrapContainer: {
    width: 0,
    flexGrow: 1,
    flex: 1,
  },
  descriptionText: {
    color: '#000',
    fontSize: 12,
  },
  videoContainer: {
    height: VIDEO_FRAME_HEIGHT,
    marginBottom: LINE_SPACING,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  clockIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 10,
  },
  dateTimeSeparator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 4,
  },
  separator: {
    color: '#333',
    marginHorizontal: wp(2),
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 22,
    marginVertical: 8,
  },
  amountLabelText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '700',
  },
  buyTicketButton: {
    height: hp(5.5),
    borderRadius: wp(1),
    justifyContent: 'center',
    backgroundColor: '#f6ad0a',
  },
  buyTicketButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  pickerImageTitle: {
    flexDirection: 'row',
    // marginTop: 15,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(5),
    paddingHorizontal: wp(2),
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mpesaPhoneInputContainer: {
    width: '80%',
    padding: 10,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  modalCloseButton: {
    width: 30,
    aspectRatio: 1 / 1,
    position: 'absolute',
    top: -9,
    right: -9,
    backgroundColor: '#000',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButtonTitle: {
    color: '#fff',
    fontSize: 12,
  },
  mpesaPhoneInputTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
  },
  mpesaPhoneInput: {
    height: 40,
    borderColor: '#000',
    borderBottomWidth: 1,
    paddingBottom: 0,
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 13,
    color: 'red',
    marginBottom: 10,
  },
  mpesaPhoneModalButton: {
    height: 36,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  mpesaPhoneModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  pickerInput: {
    flex: 1,
  },
  pickerSelectView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: wp(82),
    // width: '100%',
  },
  pickerSelectViewIcon: {
    width: wp(4),
    height: wp(4),
  },
});
