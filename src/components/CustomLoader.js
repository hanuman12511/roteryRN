import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomLoader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="green" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomLoader;
