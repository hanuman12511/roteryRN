import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PeriodListComponent = props => {
  const renderPeriodList = () => {
    let list = [];

    for (let i = 0; i <= 8; i++) {
      if (props.breakPosition - 1 === i) {
        list.push(
          <View style={styles.periodColumnBreak} key={8}>
            <Text style={styles.periodColumnText}>Break</Text>
          </View>,
        );
      }

      list.push(
        <View style={styles.periodColumn} key={i}>
          <Text style={styles.periodColumnText}>{i}</Text>
        </View>,
      );
    }

    return list;
  };

  return <View style={styles.classPeriod}>{renderPeriodList()}</View>;
};

export default PeriodListComponent;

const styles = StyleSheet.create({
  periodColumnBreak: {
    height: hp(4),
    backgroundColor: '#168abe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodColumnText: {
    color: '#fff',
    fontSize: wp(3),
  },
  periodColumn: {
    borderTopColor: '#505457',
    flex: 1,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  classPeriod: {
    flex: 1,
  },
});
