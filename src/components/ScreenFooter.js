import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const screenFooter = () => (
  <View>
    <View style={styles.screenFooter}>
      <Image style={styles.footLogo} source={null} resizeMode="cover" />
    </View>
  </View>
);

export default screenFooter;

const styles = StyleSheet.create({
  screenFooter: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1ba2de',
  },
  footLogo: {width: 77, height: 44},
});
