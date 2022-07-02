import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {data1} from './Data';
export default class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: '',
      data: [],
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      data: data1,
    });
  }
  searchData(text) {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      text: text,
    });
  }

  render() {
    console.log('this.state.data', this.state.data);
    return (
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.searchData(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search title Here"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={text => this.searchData(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Date Here"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: '#FFFF',
  },
  inputView: {
    flexDirection: 'column',
  },
});
