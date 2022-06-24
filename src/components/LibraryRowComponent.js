import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_library_book from 'assets/icons/ic_library_book.png';

const LibraryRowComponent = props => {
  const renderList = () => {
    let libraryDetailList = [];

    for (let i = 0; i < props.titleArr.length; i++) {
      libraryDetailList.push(
        <View style={styles.libraryInfoRow} key={i}>
          <Text style={styles.userInfoLeft}>{props.titleArr[i]}</Text>
          <Text style={styles.userInfoRight}>{props.item[i]}</Text>
        </View>,
      );
    }

    return (
      <View style={styles.libraryInfoRowContainer}>{libraryDetailList}</View>
    );
  };

  return (
    <View style={styles.container}>
      {renderList()}

      <Image
        source={ic_library_book}
        resizeMode="cover"
        style={styles.libraryTabIcons}
      />
    </View>
  );
};

export default LibraryRowComponent;

const styles = StyleSheet.create({
  libraryInfoRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoLeft: {
    width: wp(30),
    paddingVertical: hp(0.5),
    fontWeight: 'bold',
    fontSize: wp(3),
  },
  userInfoRight: {
    flex: 1,
    paddingVertical: hp(0.5),
    fontSize: wp(3),
  },
  libraryInfoRowContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp(2),
    paddingHorizontal: wp(2),
    backgroundColor: '#fff',
    borderLeftColor: '#1ba2de',
    borderLeftWidth: 3,
    borderRadius: 2,
  },
  libraryTabIcons: {
    width: wp(10),
    aspectRatio: 1 / 1,
  },
});
