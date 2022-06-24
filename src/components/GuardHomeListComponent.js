import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const DetailListComponent = props => {
  const renderList = () => {
    let detailList = [];

    for (let i = 0; i < props.titleArr.length; i++) {
      detailList.push(
        <View style={styles.userInfoRow} key={i}>
          <Text style={styles.userInfoLeft}>{props.titleArr[i]}</Text>
          <Text style={styles.userInfoCenter}>-</Text>
          <Text style={styles.userInfoRight}>{props.infoArr[i]}</Text>
        </View>,
      );
    }

    props.teacherDesignation === 'Class Teacher' && detailList.splice(0, 2);

    return detailList;
  };

  let containerStyle = styles.userInfo;
  props.skipContainerStyle && (containerStyle = undefined);

  return <View style={containerStyle}>{renderList()}</View>;
};

export default DetailListComponent;

const styles = StyleSheet.create({
  userInfo: {
    paddingVertical: hp(0.5),
    borderRadius: 2,
    backgroundColor: '#fff',
    borderLeftWidth: 3,
    borderLeftColor: '#1ba2de',
  },
  userInfoRow: {
    flexDirection: 'row',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.25),
  },
  userInfoLeft: {
    width: wp(35),
    fontSize: wp(3),
    fontWeight: 'bold',
  },
  userInfoCenter: {
    width: wp(5),
    fontSize: wp(3),
  },
  userInfoRight: {
    flex: 1,
    fontSize: wp(3),
  },
});
