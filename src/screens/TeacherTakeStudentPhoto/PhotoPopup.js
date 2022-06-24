import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';

import { styles } from 'screens/SendMsgPopup/styles';

import RadioForm from 'react-native-simple-radio-button';
import FastImage from 'react-native-fast-image';
var radio_props = [
  { label: 'Student', value: 'Student' },
  { label: 'Teacher', value: 'Teacher' },
  { label: 'Both', value: 'Both' },
];

class PhotoPopup extends Component {
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
    };
    this.parentView = null;
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
    this.setState({ nfMsg });
  };

  handleCategoriesChange = value => {
    this.setState({ categories: value });
  };

  handleClear = () => {
    this.setState({ categories: 'Student', nfMsg: null });
  };
  handleApply = () => {
    this.props.closePopup();
  };

  handleCodeChange = vendorCode => {
    this.setState({ vendorCode });
  };

  handleShortcut = () => {
    this.props.nav.navigate('ShortCut');
  };

  handleBlockList = () => {
    this.props.nav.navigate('BlockList');
  };

  handleSearchApply = () => {
    console.log(
      'values that are inserted',
      this.state.nfMsg,
      this.state.categories,
    );
  };

  keyExtractor = (item, index) => item.title;

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <View
        ref={this.setViewRef}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {/* <View style={styles.iconStyles}>
              <Text style={[styles.textStyle]}>Photo Popup</Text>
              <TouchableOpacity onPress={this.handleApply}>
                <Text style={[styles.textStyle]}>Close</Text>
              </TouchableOpacity>
            </View> */}
            <View style={styles.imgData}>
              <FastImage
                style={styles.imageStyle}
                source={{
                  uri: this.props.photo.studentimage,
                  headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            {/* <View style={styles.buttonHandler}>
              <TouchableOpacity
                style={[styles.clearButton]}
                onPress={this.handleClear}>
                <Text style={[styles.clearText]}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.applyButton]}
                onPress={this.handleSearchApply}>
                <Text style={[styles.applyText]}>Capture Again</Text>
              </TouchableOpacity>
            </View> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default PhotoPopup;
