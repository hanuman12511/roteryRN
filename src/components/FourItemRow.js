import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FourItemRow = props => {
  const renderList = () => {
    let detailList = [];

    for (let i = 0; i < props.titleArr.length; i++) {
      detailList.push(
        <View style={styles.userInfoRow} key={i}>
          <Text style={styles.infoOne}>{props.firstArr[i]}</Text>
          <Text style={styles.infoTow}>{props.secondArr[i]}</Text>
          <Text style={styles.infoThree}>{props.thirdArr[i]}</Text>
          <Text style={styles.infoFour}>{props.fourthArr[i]}</Text>
        </View>,
      );
    }

    return detailList;
  };

  return <View style={styles.userInfo}>{renderList()}</View>;
};

export default FourItemRow;

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: '#f2f1f1',
    paddingVertical: 3,
    marginBottom: 5,
  },
  userInfoRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  userInfoLeft: {
    width: '45%',
    fontWeight: 'bold',
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
