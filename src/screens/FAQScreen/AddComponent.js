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
// firebase
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

// Picker model
import ic_down_black from 'assets/icons/ic_down_black.png';
import PickerModal from 'react-native-picker-modal-view';

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
      ticketType: '',
      selectedTicketType: {
        Id: 1,
        Name: 'Select Categories Type',
        Value: 'Select Categories Type',
      },
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

  // question
  handleQuestionChange = q => {
    this.setState({question: q});
  };

  // answear
  handleAsnwearChange = a => {
    this.setState({answear: a});
  };

  // add Question
  addQuestion = async () => {
    try {
      const {questionData, question, answear} = this.state;
      if (question.trim() == '') {
        Alert.alert('', 'Question filed is blank');
        return;
      }

      if (answear.trim() == '') {
        Alert.alert('', 'Answear filed is blank');
        return;
      }

      questionData.unshift({question, answear});
      this.setState({questionData, question: '', answear: ''});
    } catch (error) {
      console.log('error while adding questions', error);
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
      const {selectedTicketType} = this.state;
      if (this.state.questionData.length === 0) {
        Alert.alert('', 'Please Enter the Question and Answear');
      }

      await firebase
        .firestore()
        .collection('faq')
        .doc(`${selectedTicketType.Name}`)
        .update({
          questions: this.state.questionData,
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

  // ticketType
  handleSelectCategory = (selectedTicketType, index) => {
    this.setState({selectedTicketType});
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

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }

    let data = [];
    this.props.categories.map((d, i) => {
      data.push({
        Name: d.name,
        Value: d.name,
        Id: i + 1,
      });
    });
    console.log('data categories', data);
    return (
      <View
        ref={this.setViewRef}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Text style={styles.heading}>Add New FAQ</Text>
          <View style={[styles.pickerContainer, styles.input]}>
            <PickerModal
              items={data}
              selected={this.state.selectedTicketType}
              onSelected={this.handleSelectCategory.bind(this)}
              onClosed={this.handleSelectCategoryClose.bind(this)}
              showToTopButton={true}
              showAlphabeticalIndex={true}
              // autoGenerateAlphabeticalIndex={true}
              searchPlaceholderText="Search"
              renderSelectView={this.renderSelectCategoryPicker.bind(this)}
              style={styles.pickerInput}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Question"
            placeholderTextColor="#666"
            maxLength={100}
            multiline
            value={this.state.question}
            onChangeText={this.handleQuestionChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Answear"
            placeholderTextColor="#666"
            maxLength={100}
            multiline
            value={this.state.answear}
            onChangeText={this.handleAsnwearChange}
          />
          <FlatList
            data={this.state.questionData}
            renderItem={this.showQuestion}
            keyExtractor={item => item.id}
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              margin: 15,
            }}>
            <Pressable
              style={styles.applyButton}
              onPress={() => {
                this.addQuestion();
              }}>
              <Text style={styles.addQuesStyle}>Add Question</Text>
            </Pressable>
          </View>

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
    padding: 5,
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
  pickerInput: {
    flex: 1,
  },
  pickerSelectView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    width: wp(70),
    // width: '100%',
  },
  pickerSelectViewIcon: {
    width: wp(4),
    height: wp(4),
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
});

export default AddTemplatePopup;
