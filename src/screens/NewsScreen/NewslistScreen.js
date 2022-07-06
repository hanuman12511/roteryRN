import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {datajson} from './Data';
export default class NewslistScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: '',
      data: [],
      dateto: '',
      datefrom: '',
      isVisible: false,
      isVisiblef: false,
      isVisibler: false,
      model: false,
      title: '',
      clubname: '',
      newsdate: '',
      dateup: '',
      imageup: '',
      isListRefreshing: false,
      imagepath: '',
      imagename: '',
    };

    this.arrayholder = [];
  }

  handletitle = text => {
    this.setState({title: text});
  };
  handleClubname = text => {
    this.setState({clubname: text});
  };

  componentDidMount = async () => {
    this.getNewsData();
  };

  getNewsData = async () => {
    let data1 = [];
    await firestore()
      .collection('news')
      .orderBy('newsdate', 'desc')
      .get()
      .then(collectionSnapshot => {
        // console.log('Total news: ', collectionSnapshot.size);
        collectionSnapshot.forEach(documentSnapshot => {
          data1.push(documentSnapshot.data());
        });
      });
    this.setState({
      isLoading: false,
      data: data1,
    });
    // console.log('news===', data1);
    this.arrayholder = data1;
    this.setState({isListRefreshing: false});
  };

  searchData(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.clubname.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      text: text,
    });

    // this.arrayholder = newData;
    // console.log('new data', newData);
  }

  searchDate(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.newsdate;
      const textData = text;

      // return itemData >= text && itemData < "7/13/2022";

      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      dateto: text,
    });
    // alert('dateto', dateto);
    // this.arrayholder = newData;

    // console.log('setdateto', newData);
  }

  renderItemshow(props) {
    return (
      <View style={styles.containermain}>
        <View style={styles.containerimg}>
          <Image source={{uri: props.item.image}} style={styles.img} />
        </View>

        <View style={styles.containerdata}>
          <Text style={styles.title}>{props.item.title}</Text>
          <View style={styles.containerdata1}>
            <Text style={styles.clubname}>{props.item.clubname}</Text>

            <Text style={styles.date}>
              <Icon name="calendar" size={15} color="#e97147" />
              {'  '}
              {props.item.newsdate}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  onDateSelected(event, value) {
    this.setState({
      dateto: value,
    });
  }
  //****    search date from filter */
  SelectDateto = () => {
    this.setState({
      isVisible: true,
    });
  };
  hideDatePicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    const options = {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    };

    const date1 = date.toLocaleDateString('en-US', options);
    this.setState({dateto: date1});
    //this.searchDate(date1);
    this.hideDatePicker();
  };

  //***************   Enter date news update */
  SelectDate1 = () => {
    this.setState({
      isVisibler: true,
    });
  };
  hideDatePicker1 = () => {
    this.setState({
      isVisibler: false,
    });
  };

  handleConfirm1 = date => {
    //console.warn('A date has been picked: ', date);
    const options = {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    };

    const date1 = date.toLocaleDateString('en-US', options);
    this.setState({dateup: date1});
    //this.searchData1(date1);
    this.hideDatePicker1();
  };

  //*************   from date */

  searchDatefrom = text => {
    try {
      const Datefrom = this.state.datefrom;
      const Dateto = this.state.dateto;
      //console.log(Moment(Datefrom).format('MM DD YYYY'));
      console.log(Dateto);
      var newData = this.arrayholder.filter(function(a) {
        console.log(a.newsdate);
        return a.newsdate >= Dateto && a.newsdate <= Datefrom;
        // return new Date(a.newsdate) >= Dateto && new Date(a.newsdate) <= Datefrom;
      });

      this.setState({
        data: newData,
        datefrom: text,
      });

      console.log('data=', newData);
    } catch (error) {
      console.log('error=', error);
    }
  };

  SelectDatefrom = () => {
    this.setState({
      isVisiblef: true,
    });
  };
  hideDatePickerend = () => {
    this.setState({
      isVisiblef: false,
    });
  };

  handleConfirmend = date => {
    //console.warn('A date has been picked: ', date);

    const options = {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    };

    const date1 = date.toLocaleDateString('en-US', options);
    this.setState({datefrom: date1});
    this.searchDatefrom(date1);
    this.hideDatePickerend();
  };

  AddNews = () => {
    this.setState({
      model: true,
    });
  };

  SubmitNews = async (title, club, newsdate) => {
    try {
      await firestore()
        .collection('news')
        .add({
          title: title,
          clubname: club,
          newsdate: newsdate,
          image: this.state.imageup,
        })
        .then(() => {
          console.log('User added!');
        });
      this.setState({
        model: false,
      });
    } catch (error) {
      console.log('error while add data in to the firebase ', error);
    }
  };

  handleCamera1 = () => {
    const option = {
      storageOptions: {
        skipBackup: true,
      },

      includeBase64: true,

      mediaType: 'photo',

      quality: 0.7,

      maxWidth: 250,

      maxHeight: 250,
    };

    ImagePicker.showImagePicker(option, response => {
      console.log('image show', response);
      this.setState({
        imagepath: response.uri,
        imagename: response.fileName,
      });
      if (response.didCancel) {
        console.log('User cancel image picker');
      } else if (response.error) {
        console.log(' image picker error', response.error);
      } else {
        // Base 64

        let source = 'data:image/jpeg;base64,' + response.data;
        this.setState({
          imageup: source,
        });

        var eTime = Date();
      }
    });
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.getNewsData();
    } catch (error) {
      console.log(error.message);
    }
  };
  CloseMode = () => {
    this.setState({
      model: false,
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.search}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#e97147',
              marginTop: 5,
              flex: 1,
              borderRadius: 10,
            }}>
            <TextInput
              style={styles.searchinput}
              onChangeText={text => this.searchData(text)}
              value={this.state.text}
              underlineColorAndroid="transparent"
              placeholder="Search Club.."
            />
          </View>
          <TouchableOpacity
            onPress={this.SelectDateto}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#e97147',
              marginTop: 5,
              flex: 1.2,
              borderRadius: 10,
              marginLeft: 10,
              height: 40,
              alignItems: 'center',
            }}>
            <DateTimePicker
              isVisible={this.state.isVisible}
              mode="date"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
              maximumDate={new Date()}
              minimumDate={new Date(2021, 0, 1)}
            />

            <Text style={styles.datetotext}>
              {this.state.dateto != '' ? this.state.dateto : 'Date From:'}
            </Text>

            {/*  <Icon
                name="calendar"
                size={20}
                color="#fff"
                style={{marginRight: 10, marginLeft: 10}}
              /> */}

            {/* <TextInput
              style={styles.textInput}
              onChangeText={text => this.searchDate(text)}
              value={this.state.dateto}
              underlineColorAndroid="transparent"
              placeholder={
                this.state.dateto != '' ? this.state.dateto : 'Search From Date'
              }
            /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.SelectDatefrom}
            style={{
              flex: 1,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#e97147',

              marginTop: 5,
              marginLeft: 10,
              marginRight: 20,

              height: 40,
            }}>
            <DateTimePicker
              isVisible={this.state.isVisiblef}
              mode="date"
              onConfirm={this.handleConfirmend}
              onCancel={this.hideDatePickerend}
              maximumDate={new Date()}
              minimumDate={new Date(2021, 0, 1)}
            />

            <Text style={styles.datetotext}>
              {this.state.datefrom != '' ? this.state.datefrom : 'Date To'}
            </Text>

            {/* <Icon
                name="calendar"
                size={20}
                color="#fff"
                style={{marginRight: 10, marginLeft: 10}}
              /> */}

            {/* <TextInput
              style={styles.textInput}
              onChangeText={text => this.searchDatefrom(text)}
              value={this.state.datefrom}
              underlineColorAndroid="transparent"
              placeholder={
                this.state.datefrom != ''
                  ? this.state.datefrom
                  : 'Search To Date'
              }
            /> */}
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          {this.state.data != '' ? (
            <>
              <FlatList
                style={{flex: 1}}
                data={this.state.data}
                renderItem={item => this.renderItemshow(item)}
                keyExtractor={item => item.id}
                refreshing={this.state.isListRefreshing}
                onRefresh={this.handleListRefresh.bind(this)}
              />
              <View style={{padding: 20, height: 20}}>
                <Text style={{textAlign: 'center'}}>End</Text>
              </View>
            </>
          ) : (
            <Text style={{padding: 20, textAlign: 'center'}}>No Data</Text>
          )}
          <View style={styles.header}>
            <TouchableOpacity style={styles.add} onPress={this.AddNews}>
              <Icon name="plus" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        {this.state.model && (
          <View style={styles.model}>
            <View style={styles.model1}>
              <TouchableOpacity onPress={this.CloseMode}>
                <Icon
                  name="times"
                  size={20}
                  color="red"
                  style={{
                    marginTop: 10,
                    padding: 10,
                    borderRadius: 20,
                    marginTop: 0,
                    marginLeft: 250,
                  }}
                />
              </TouchableOpacity>
              <Icon
                name="newspaper"
                size={30}
                color="#fff"
                style={{
                  marginTop: 10,
                  backgroundColor: '#e97147',
                  padding: 10,
                  borderRadius: 20,
                }}
              />
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Enter News Title"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={this.handletitle}
              />

              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Enter club name"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={this.handleClubname}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <DateTimePicker
                  isVisible={this.state.isVisibler}
                  mode="date"
                  onConfirm={this.handleConfirm1}
                  onCancel={this.hideDatePicker1}
                  maximumDate={new Date()}
                  minimumDate={new Date(2021, 0, 1)}
                />

                <TextInput
                  style={styles.inputmd}
                  value={this.state.dateup}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#9a73ef"
                  placeholder={
                    this.state.dateup != '' ? this.state.dateup : 'Enter date'
                  }
                />
                <TouchableOpacity onPress={this.SelectDate1}>
                  <Icon
                    name="calendar"
                    size={20}
                    color="#fff"
                    style={{
                      marginTop: 10,
                      backgroundColor: '#e97147',
                      borderRadius: 5,
                      padding: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                {/*  <Text style={{fontSize: 10, padding: 10, color: '#e97147'}}>
                Image:Name
                {this.state.imagename}
              </Text> */}

                <Image
                  source={{
                    uri:
                      this.state.imagepath != ''
                        ? this.state.imagepath
                        : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png',
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: '#e97147',
                    marginTop: 10,
                  }}
                />
                <TouchableOpacity onPress={this.handleCamera1}>
                  <Icon
                    name="minus-circle"
                    size={20}
                    color="#e97147"
                    style={{marginTop: 10, marginLeft: -10}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() =>
                  this.SubmitNews(
                    this.state.title,
                    this.state.clubname,
                    this.state.dateup,
                  )
                }>
                <Text style={styles.submitButtonText}> Submit </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containermain: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,

    borderRadius: 20,
    shadowOffset: {width: 1, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 9,
    shadowColor: '#52006A',
  },
  search: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    margin: 10,
  },
  searchinput: {
    flex: 1,
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#e97147',
    borderRadius: 8,
    backgroundColor: '#FFFF',
  },
  header: {
    position: 'absolute',
    elevation: 100,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  add: {
    width: 40,
    height: 40,
    padding: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 2,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  addtext: {
    backgroundColor: '#e97147',
    color: '#fff',
    padding: 15,
    borderRadius: 100,
  },

  model: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    position: 'absolute',
    elevation: 100,
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  model1: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'absolute',
    elevation: 100,

    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },

  containerimg: {
    flex: 1,
    margin: 0,
    padding: 0,
  },

  containerdata: {
    flex: 2,
    margin: 0,
    padding: 0,
  },
  containerdata1: {
    flex: 1,
    margin: 0,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {marginTop: 10, fontSize: 14, color: '#005555'},
  date: {
    flex: 1,
    marginTop: 1,
    fontSize: 10,
    marginLeft: 40,
    textAlign: 'right',
    flex: 1,
    color: '#000',
  },
  clubname: {
    flex: 1.5,
    marginTop: 1,
    fontSize: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  img: {
    width: 100,
    height: 100,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  datetotext: {
    color: '#ffffff',
    flex: 1,
    margin: 10,
    marginLeft: 25,
  },

  textInput: {
    width: '70%',
    height: 40,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#e97147',
    borderRadius: 8,
    backgroundColor: '#FFFF',
  },
  input: {
    width: '80%',
    marginTop: 10,
    height: 40,
    borderColor: '#e97147',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  inputmd: {
    width: '73%',

    marginTop: 10,
    height: 40,
    borderColor: '#e97147',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 39,
    alignItems: 'center',
    width: 200,
  },
  submitButtonText: {
    color: 'white',
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
