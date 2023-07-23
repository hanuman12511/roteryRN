import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderComponent from 'components/ScreenHeader';

import NewslistScreen from './NewslistScreen';
export default class NewsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <HeaderComponent title="News" nav={this.props.navigation} />

        <NewslistScreen />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textd: {},
});
