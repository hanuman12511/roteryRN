import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TransportListComponent = props => {
  const renderList = () => {
    let detailList = [];

    for (let i = 0; i < props.titleArr.length; i++) {
      detailList.push(
        <View style={styles.userInfoRow} key={i}>
          <Text style={styles.userInfoLeft}>{props.titleArr[i]}</Text>
          <Text style={styles.userInfoCenter}>-</Text>
          <Text style={styles.userInfoRight}>{props.item[i]}</Text>
        </View>,
      );
    }

    return detailList;
  };

  return <View style={styles.userInfo}>{renderList()}</View>;
};

export default TransportListComponent;

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: '#fff',
    marginBottom: 8,
    borderLeftColor: '#808285',
    borderLeftWidth: 3,
    borderRadius: 2,
  },
  userInfoRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  userInfoLeft: {
    width: '45%',
    fontWeight: '600',
    fontSize: 14,
  },
  userInfoCenter: {
    width: '5%',
    fontSize: 14,
  },
  userInfoRight: {
    width: '50%',
    fontSize: 14,
  },
});
