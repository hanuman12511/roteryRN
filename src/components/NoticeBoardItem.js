import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import DetailListComponent from 'components/DetailListComponent';

const NoticeBoardItem = props => {
  const renderList = () => {
    let detailList = [];

    for (let i = 0; i < props.titleArr.length; i++) {
      detailList.push(
        <View style={styles.userInfoRow} key={i}>
          <Text style={styles.userInfoLeft}>{props.headingArr[i]}</Text>
          <DetailListComponent titleArr={props.titleArr} infoArr={props.item} />
          <Text style={styles.userInfoRight}>{props.dateArr[i]}</Text>
        </View>,
      );
    }

    return detailList;
  };

  return <View style={styles.userInfo}>{renderList()}</View>;
};

export default NoticeBoardItem;

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: '#fff',
    paddingVertical: 3,
  },
  userInfoRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  noticeHeading: {
    fontWeight: 'bold',
    paddingTop: 5,
    paddingHorizontal: 10,
    color: '#1ba2de',
  },
  noticePosted: {
    textAlign: 'right',
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
});
