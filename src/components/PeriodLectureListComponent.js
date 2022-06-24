import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PeriodLectureListComponent = props => {
  const renderLectureList = () => {
    let list = [];

    for (let i = 0; i <= 8; i++) {
      if (props.breakPosition - 1 === i) {
        list.push(
          <View style={styles.periodColumnBreak2} key={8}>
            <Text style={styles.periodSubText2}>Break</Text>
          </View>,
        );
      }

      list.push(
        <View style={styles.classSubColumn} key={i}>
          <Text style={styles.periodSubText}>{props.periods[i]}</Text>
        </View>,
      );
    }

    return list;
  };

  return <View style={styles.classes}>{renderLectureList()}</View>;
};

export default PeriodLectureListComponent;

const styles = StyleSheet.create({
  periodColumnBreak2: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(4),
    backgroundColor: '#168abe',
  },
  periodSubText2: {
    color: '#fff',
    fontSize: wp(2.5),
    textAlign: 'center',
  },
  classSubColumn: {
    flex: 1,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  periodSubText: {
    color: '#000',
    fontSize: wp(2.5),
  },
  classes: {
    width: 150,
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
