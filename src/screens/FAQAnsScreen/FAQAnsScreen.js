import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
import {WebView} from 'react-native-webview';

// Components
import Header from 'components/ScreenHeader';
import FaqAns from 'components/FaqAnsListComponent';

export default class ReferScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  listItem = ({item}) => <FaqAns item={item} nav={this.props.navigation} />;

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const answer = this.props.navigation.getParam('answer');

    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Faq Answear"
          nav={this.props.navigation}
          //   showLocationPicker
          showNotificationIcon
          showCartIcon
        />
        <View style={{flex: 1}}>
          <WebView source={{html: `${answer}`}} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp(3),
  },

  heading: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#192423',
    marginBottom: wp(2),
  },

  text: {
    fontSize: wp(3.2),
    fontWeight: '400',
    color: '#666',
    textAlign: 'justify',
  },
});
