import React from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_library_book from 'assets/icons/ic_library_book.png';
import calendar from 'assets/icons/calendar.png';
import ic_assignment_delete_green from 'assets/icons/ic_assignment_delete_green.png';

const LibraryRequestedBookListComponent = props => {
  const {item, titleArr, handleCancelBookRequestCallback} = props;

  const renderList = () => {
    let libraryDetailList = [];

    for (let i = 0; i < titleArr.length; i++) {
      libraryDetailList.push(
        <View style={styles.libraryInfoRow} key={i}>
          <Text style={styles.userInfoLeft}>{titleArr[i]}</Text>
          <Text style={styles.userInfoRight}>{item[i]}</Text>
        </View>,
      );
    }

    return (
      <View style={styles.libraryInfoRowContainer}>{libraryDetailList}</View>
    );
  };

  const handleCancelBookRequest = () => {
    Alert.alert(
      'Cancel Request',
      'Do you want to cancel this book request?',
      [
        {text: 'NO', style: 'cancel'},
        {text: 'YES', onPress: handleCancelBookRequestYes},
      ],
      {
        cancelable: false,
      },
    );
  };

  const handleCancelBookRequestYes = async () => {
    try {
      const bookRequestId = item[5];
      await handleCancelBookRequestCallback(bookRequestId);
    } catch (error) {
      console.log(error.message);
    }
  };

  const requestDate = item[4];

  return (
    <View style={styles.container}>
      {renderList()}

      <View style={styles.iconsContainer}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={handleCancelBookRequest}>
          <Image
            source={ic_assignment_delete_green}
            resizeMode="cover"
            style={styles.deleteIcon}
          />
        </TouchableHighlight>

        <Image
          source={ic_library_book}
          resizeMode="cover"
          style={styles.libraryTabIcons}
        />

        <View style={styles.requestedDate}>
          <Image source={calendar} resizeMode="cover" style={styles.dateIcon} />
          <Text style={styles.requestedDateText}>{requestDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default LibraryRequestedBookListComponent;

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
    textTransform: 'capitalize',
    paddingVertical: hp(0.5),
    fontSize: wp(3),
  },
  libraryInfoRowContainer: {
    flex: 1,
  },
  iconsContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',

    height: '100%',
  },
  deleteIcon: {
    height: wp(6),
    aspectRatio: 1 / 1,
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
  requestedDate: {
    flexDirection: 'row',
  },
  libraryTabIcons: {
    height: wp(8),
    aspectRatio: 1 / 1,
  },
  dateIcon: {
    width: wp(4),
    aspectRatio: 1 / 1,
  },
  requestedDateText: {
    fontSize: wp(3),
  },
});
