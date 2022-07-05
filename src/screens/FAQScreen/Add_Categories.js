import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Image,
  FlatList,
  Alert,
  Platform,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DocumentPicker from 'react-native-document-picker';
// icon
import gallery from 'assets/icons/gallery.png';
// firebase
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import RNFetchBlob from 'rn-fetch-blob';
class AddTemplatePopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      selectedFile: '',
      imageName: '',
      showImage: '',
      questionData: [],
      titleName: '',
      question: '',
      answear: '',
      uploadImage: '',
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

  // title change
  handleTitleChange = d => {
    this.setState({titleName: d});
  };

  // title Image
  getImage = async () => {
    try {
      // Pick a single file
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const {name} = response;
      const extension = name.split('.').pop();
      const isFileAllowed =
        extension === 'jpeg' || extension === 'jpg' || extension === 'png';

      if (isFileAllowed) {
        const fs = RNFetchBlob.fs;
        const filePath =
          Platform.OS === 'android'
            ? response.uri
            : response.uri.replace('file://', '');
        const file = await fs.readFile(filePath, 'base64');

        this.setState({
          selectedFile: response,
          uploadImage: `data:image/${extension};base64,${file}`,
          showImage: response.uri,
          imageName: name,
        });
        console.log(this.state.selectedFile, this.state.imageName);
      } else {
        alert(`.${extension} file not allowed`);
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log(error);
      }
    }
  };

  // show question to screen
  showQuestion = ({item}) => {
    return (
      <>
        <Text style={styles.input}>{item.question}</Text>

        <Text style={styles.input}>{item.answear}</Text>
      </>
    );
  };
  addFAQ_Data = async () => {
    try {
      await firebase
        .firestore()
        .collection('faq')
        .doc('Media')
        .set({
          name: this.state.titleName,
          image: this.state.uploadImage,
        })
        .then(() => {
          console.log('User added!');
          const refresh = this.props.refresh;
          refresh('User added!');
          this.props.closePopup();
        });
    } catch (error) {
      console.log('error while adding faq', error);
    }
  };

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }
    return (
      <View
        ref={this.setViewRef}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Text style={styles.heading}>Add Categories</Text>

          <TextInput
            style={styles.input}
            placeholder="Categories Name"
            placeholderTextColor="#666"
            maxLength={100}
            multiline
            value={this.state.titleName}
            onChangeText={this.handleTitleChange}
          />

          {this.state.imageName !== '' ? (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: this.state.showImage}}
                style={{height: wp(25), aspectRatio: 1 / 1}}
              />
              <Text>{this.state.imageName}</Text>
            </View>
          ) : (
            <Pressable
              style={[styles.saveImageButton]}
              onPress={() => {
                this.getImage();
              }}>
              <Text style={{color: '#4d94ff'}}>Upload Image</Text>
              <Image source={gallery} style={styles.imgButton} />
            </Pressable>
          )}

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              this.addFAQ_Data();
            }}>
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
          {/* <TouchableOpacity
            style={styles.applyButton}
            onPress={this.handleApply}
            underlayColor="#ff638b80">
            <Text style={styles.applyButtonText}>Submit</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zindex: 9,
  },
  popupContainer: {
    width: wp(86),
    maxHeight: hp(80),
    backgroundColor: 'white',
    padding: wp(5),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: wp(4),
    fontWeight: '700',
    textAlign: 'center',
    paddingBottom: wp(2),
  },
  applyButton: {
    borderRadius: 35,
    // borderWidth: 1,
    maring: 2,
    backgroundColor: '#ff638b',
    // paddingVertical: wp(2),
    // paddingHorizontal: wp(5),
    // borderRadius: wp(1),
    // alignItems: 'center',
    // marginTop: wp(3),
  },
  applyButtonText: {
    color: '#fff',
    fontSize: wp(3.5),
  },
  input: {
    backgroundColor: '#f2f1f1',
    padding: wp(2),
    color: '#333',
    margin: wp(2),

    textAlignVertical: 'top',
  },
  centeredView: {
    flex: 1,

    marginTop: 22,
  },
  modalView: {
    margin: 20,
    marginTop: hp(35),
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addQuesStyle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  saveImageButton: {
    padding: wp(1.5),
    marginTop: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  imgButton: {
    height: wp(10),
    aspectRatio: 1 / 1,
  },
});

export default AddTemplatePopup;
