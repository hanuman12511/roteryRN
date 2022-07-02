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
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {data1} from './Data';
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
      model: false,
      title: '',
      clubname: '',
      newsdate: '',
    };

    this.arrayholder = [];
  }

  handletitle = text => {
    this.setState({title: text});
  };
  handleClubname = text => {
    this.setState({clubname: text});
  };

  componentDidMount() {
    this.setState({
      isLoading: false,
      data: data1,
    });
    this.arrayholder = data1;
  }
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
  }
  searchData1(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.date;
      const textData = text;
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      dateto: text,
    });
  }
  renderItemshow(props) {
    console.log(props);
    return (
      <View style={styles.containermain}>
        <View style={styles.container}>
          <Image source={{uri: props.item.image}} style={styles.img} />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>{props.item.title}</Text>
          <Text style={styles.date}>({props.item.date})</Text>
          <Text style={styles.clubname}>{props.item.clubname}</Text>
        </View>
      </View>
    );
  }
  onDateSelected(event, value) {
    this.setState({
      dateto: value,
    });
  }

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
    console.warn('A date has been picked: ', date);
    const options = {
      year: 'numeric',
      day: 'numeric',
      month: 'numeric',
    };

    const date1 = date.toLocaleDateString('en-US', options);
    this.setState({dateto: date1});
    this.searchData1(date1);
    this.hideDatePicker();
  };

  SelectDate1 = () => {
    this.setState({
      isVisible: true,
    });
  };
  hideDatePicker1 = () => {
    this.setState({
      isVisible: false,
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
    this.setState({newsdate: date1});
    // this.searchData1(date1);
    this.hideDatePicker();
  };

  AddNews = () => {
    this.setState({
      model: true,
    });
  };

  SubmitNews = (title, club, newsdate) => {
    alert('Title: ' + title + ' clubname: ' + club + 'newsdate:' + newsdate);
    this.setState({
      model: false,
    });
  };
  render() {
    console.log('data', this.state.dateto);
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.search}>
          <TextInput
            style={styles.searchinput}
            onChangeText={text => this.searchData(text)}
            value={this.state.text}
            underlineColorAndroid="transparent"
            placeholder="Search Title Here"
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#9f9f7d',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 5,
            }}>
            <DateTimePicker
              isVisible={this.state.isVisible}
              mode="date"
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />
            <Text style={styles.datetotext}>Date To:</Text>

            <TouchableOpacity onPress={this.SelectDateto}>
              <Image
                source={require('../../assets/icons/calendar.png')}
                style={{width: 40, height: 40, marginLeft: 10}}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.searchData1(text)}
              value={this.state.dateto}
              underlineColorAndroid="transparent"
              placeholder={
                this.state.dateto != '' ? this.state.dateto : 'Search To Date'
              }
            />
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: '#ffffbe'}}>
          <FlatList
            style={{flex: 1}}
            data={this.state.data}
            renderItem={item => this.renderItemshow(item)}
            keyExtractor={item => item.id}
          />
          <View style={styles.header}>
            <TouchableOpacity style={styles.add} onPress={this.AddNews}>
              <Text style={styles.addtext}>Add News</Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.model && (
          <View style={styles.model}>
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
                backgroundColor: '#9f9f7d',
                marginLeft: 10,
                marginRight: 10,
              }}>
              <DateTimePicker
                isVisible={this.state.isVisible}
                mode="date"
                onConfirm={this.handleConfirm1}
                onCancel={this.hideDatePicker1}
              />

              <TouchableOpacity onPress={this.SelectDate1}>
                <Image
                  source={require('../../assets/icons/calendar.png')}
                  style={{width: 20, height: 20, marginLeft: 10}}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                value={this.state.newsdate}
                underlineColorAndroid="transparent"
                placeholder={
                  this.state.dateto != '' ? this.state.dateto : 'Search date'
                }
              />
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() =>
                this.SubmitNews(
                  this.state.title,
                  this.state.clubname,
                  this.state.newsdate,
                )
              }>
              <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  containermain: {
    flex: 1,
    backgroundColor: '#d2d295',
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,

    borderRadius: 20,
  },
  search: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  searchinput: {
    width: '97%',
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#009688',
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
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addtext: {
    backgroundColor: '#e97147',
    color: '#fff',
    padding: 15,
    borderRadius: 100,
  },

  model: {
    backgroundColor: '#975e4a',
    flex: 1,
    position: 'absolute',
    elevation: 100,
    bottom: 0,
    right: 0,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    margin: 20,
  },
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  title: {marginTop: 10, fontSize: 18},
  date: {
    marginTop: 1,
    fontSize: 10,
    marginLeft: 40,
    textAlign: 'left',
  },
  clubname: {marginTop: 1, fontSize: 16},
  img: {
    width: 100,
    height: 100,
    margin: 10,
  },
  datetotext: {color: '#ffffff', marginLeft: 10},

  textInput: {
    width: '70%',
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: '#FFFF',
  },
  input: {
    width: '80%',
    margin: 20,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
  },
});
