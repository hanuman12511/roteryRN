import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ProcessingLoader = props => {
  const {message} = props;

  return (
    <View style={styles.modalContainer}>
      <ActivityIndicator size="large" color="#fff" />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

export default ProcessingLoader;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: '#ccc',
    fontSize: wp(4),
    textAlign: 'center',
    marginVertical: wp(4),
  },
});
