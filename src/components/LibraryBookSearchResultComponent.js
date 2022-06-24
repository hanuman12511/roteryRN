import React from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_library_book from 'assets/icons/ic_library_book.png';

const LibraryBookSearchResultComponent = props => {
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

  const handleBookRequest = () => {
    const {item, handleConfirmBookRequest} = props;
    const book = {
      id: item[4],
      name: item[1],
    };

    handleConfirmBookRequest(book);
  };

  const {item} = props;
  const isBookAvailable = item[3] === 'Available';

  return (
    <View style={styles.container}>
      {renderList()}

      <View style={styles.accessoryContainer}>
        <Image
          source={ic_library_book}
          resizeMode="cover"
          style={styles.libraryTabIcons}
        />

        {isBookAvailable && (
          <TouchableHighlight
            underlayColor="#1ba2de80"
            onPress={handleBookRequest}
            style={styles.requestButton}>
            <Text style={styles.requestButtonTitle}>Request</Text>
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

export default LibraryBookSearchResultComponent;

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
  accessoryContainer: {
    alignItems: 'center',
  },
  libraryTabIcons: {
    height: wp(10),
    aspectRatio: 1 / 1,
  },
  requestButton: {
    backgroundColor: '#1ba2de',
    borderRadius: 2,
    paddingHorizontal: wp(1.2),
    paddingVertical: wp(0.7),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  requestButtonTitle: {
    color: '#fff',
    fontSize: wp(2.5),
    textAlign: 'center',
  },
});
