import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  Platform,
  Alert,
} from 'react-native';

import {styles} from './styles';

import RadioForm from 'react-native-simple-radio-button';

import {connect} from 'react-redux';
import {
  notificationOperations,
  notificationSelectors,
} from 'idsStore/data/notifi';
import showToast from 'components/CustomToast';

//icon
import gallery from 'assets/icons/gallery.png';
//multi image picker
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import ProcessingLoader from 'components/ProcessingLoader';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
var radio_props = [
  {label: 'Student', value: 'Student'},
  {label: 'Teacher', value: 'Teacher'},
  {label: 'Both', value: 'Both'},
];

class SendMsgPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vData: null,
      spData: null,
      conData: null,
      skillData: null,
      astroData: null,
      categories: 'Student',
      nfMsg: null,
      vendorCode:
        'Thankyou for following hop to see you again. So come and lets solve your problems.',
      selectedImage: [],
      isImageSelected: false,
      userPic: '',
      userImage: [],
      userImageName: '',
      ImageSource: [],
      connectionState: true,
      showProcessing: false,
    };
    this.parentView = null;
  }
  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  setViewRef = ref => {
    this.parentView = ref;
  };

  handleStartShouldSetResponder = event => {
    if (this.parentView._nativeTag === event.target._nativeTag) {
      this.props.closePopup();
    }
  };

  handleBookNameChange = nfMsg => {
    this.setState({nfMsg});
  };

  handleCategoriesChange = value => {
    this.setState({categories: value});
  };

  handleClear = () => {
    this.setState({categories: 'Student', nfMsg: null});
  };
  handleApply = () => {
    this.props.closePopup();
  };

  handleCodeChange = vendorCode => {
    this.setState({vendorCode});
  };

  handleShortcut = () => {
    this.props.nav.navigate('ShortCut');
  };

  handleBlockList = () => {
    this.props.nav.navigate('BlockList');
  };

  handleSearchApply = async () => {
    // console.log(
    //   'values that are inserted',
    //   this.state.nfMsg,
    //   this.state.categories,
    // );
    this.setState({showProcessing: true});
    await this.props
      .sendNotification(
        this.state.categories,
        this.state.nfMsg,
        this.state.userImage,
      )
      .then(() => {
        const response = this.props.isSendNotification;
        if (response.success === 1) {
          showToast(response.message);
          this.props.onSendSuccess();
          this.handleApply();
          this.setState({showProcessing: false});
        } else {
          this.handleApply();
          this.setState({showProcessing: false});
          showToast('Error in sending message');
        }
        console.log(response);
      });
  };

  renderImages = ({item}) => {
    // console.log('image data', item);
    return (
      <View style={{flex: 1, margin: widthPercentageToDP(2), elevation: 8}}>
        <Image
          source={{uri: item?.uri}}
          style={{
            height: heightPercentageToDP(10),
            aspectRatio: 1 / 1,
            borderRadius: widthPercentageToDP(5),
          }}
        />
      </View>
    );
  };

  getImages = async () => {
    try {
      console.log('response: ');
      this.checkPermission();
      this.setState({isImageSelected: true});
    } catch (error) {
      console.log('error while getting image', error);
    }
  };

  checkPermission = async () => {
    try {
      const platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      });
      const result = await check(platformPermission);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          // console.log(
          //   'The permission has not been requested / is denied but requestable',
          // );
          const requestResult = await request(platformPermission);
          switch (requestResult) {
            case RESULTS.GRANTED:
              this.handleImagePick();
          }
          break;
        case RESULTS.GRANTED:
          // console.log("The permission is granted");
          this.handleImagePick();
          break;
        case RESULTS.BLOCKED:
          // console.log('The permission is denied and not requestable anymore');
          Alert.alert(
            'Permission Blocked',
            'Press OK and provide "Camera" permission in App Setting',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: this.handleOpenSettings,
              },
            ],
            {cancelable: false},
          );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleOpenSettings = async () => {
    try {
      await openSettings();
    } catch (error) {
      console.log('Unable to open App Settings:', error);
    }
  };

  //image picker
  handleImagePick = () => {
    try {
      ImagePicker.openPicker({
        width: 200,
        height: 200,
        compressImageMaxHeight: 400,
        compressImageMaxWidth: 400,
        cropping: true,
        multiple: true,
      }).then(response => {
        let tempArray = [];
        console.log('responseimage-------' + response);
        this.setState({ImageSource: response});
        console.log('responseimagearray', this.state.ImageSource);
        response.forEach(item => {
          let image = {
            uri: item.path,
            type: 'image/jpeg',
            name: 'multiimage.jpg',
            size: 100,
            // width: item.width,
            // height: item.height,
          };
          console.log('imagpath==========', image);
          tempArray.push(image);
          this.setState({userImage: tempArray});
          console.log('savedimageuri=====', this.state.userImage);

          // console.log('imagpath==========', image);
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  keyExtractor = (item, index) => item.title;

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View
        ref={this.setViewRef}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        style={styles.modalContainer2}>
        {this.state.connectionState && (
          <>
            <View style={styles.popupContainer2}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.iconStyles}>
                  <Text style={[styles.textStyle]}>Notification Send Box</Text>
                  <TouchableOpacity onPress={this.handleApply}>
                    <Text style={[styles.textStyle]}>Close</Text>
                  </TouchableOpacity>
                </View>
                <RadioForm
                  radio_props={radio_props}
                  onPress={this.handleCategoriesChange}
                  formHorizontal={true}
                  labelHorizontal={true}
                  animation={true}
                  buttonSize={12}
                  buttonOuterSize={24}
                  buttonColor={'#ccc'}
                  selectedButtonColor={'#1ba2de'}
                  labelColor={'#ccc'}
                  labelStyle={styles.radioButtonLabel}
                  style={styles.radioButton}
                />
                <View style={styles.inputFieldContainer}>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Enter Message"
                    placeholderTextColor="#666"
                    multiline={true}
                    value={this.state.nfMsg}
                    onChangeText={this.handleBookNameChange}
                  />
                </View>

                {this.state.isImageSelected ? (
                  <View style={styles.inputFieldContainer2}>
                    <FlatList
                      data={this.state.userImage}
                      renderItem={this.renderImages}
                      keyExtractor={this.keyExtractor}
                      ItemSeparatorComponent={this.itemSeparator}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      extraData={this.state}
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={this.getImages}
                    style={{margin: widthPercentageToDP(2)}}>
                    <Image
                      source={gallery}
                      style={{
                        height: heightPercentageToDP(5),
                        aspectRatio: 1 / 1,
                      }}
                    />
                  </TouchableOpacity>
                )}

                <View style={styles.buttonHandler}>
                  <TouchableOpacity
                    style={[styles.clearButton]}
                    onPress={this.handleClear}>
                    <Text style={[styles.clearText]}>Clear All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.applyButton]}
                    onPress={this.handleSearchApply}>
                    <Text style={[styles.applyText]}>Send</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </>
        )}
        {this.state.connectionState === false ? (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        ) : null}
        {this.state.showProcessing && (
          <ProcessingLoader message="Message Sending.." />
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isSendNotification: notificationSelectors.isSendNotification(state),
});
const mapDispatchToProps = {
  sendNotification: notificationOperations.sendNotification,
};
export default connect(mapStateToProps, mapDispatchToProps)(SendMsgPopup);
