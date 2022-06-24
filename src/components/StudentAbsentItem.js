import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const StudentAttendanceItem = props => {
  const serialNo = props.index + 1;
  const {rollno: enrollNo, studentname: name} = props.item;

  return (
    <View style={styles.container}>
      <Text style={styles.item1}>{serialNo}</Text>
      <Text style={styles.item2}>{enrollNo}</Text>
      <Text style={styles.item3}>{name}</Text>
    </View>
  );
};

export default StudentAttendanceItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  item1: {
    flex: 1,
  },
  item2: {
    flex: 1,
  },
  item3: {
    flex: 2,
  },
});
