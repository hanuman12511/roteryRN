import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import DetailListComponent from 'components/DetailListComponent';
import showToast from 'components/CustomToast';

// Icons
import ic_pdf_red from 'assets/icons/ic_pdf_red.png';

const DateSheetItem = props => {
  const handleDateSheetPress = async () => {
    try {
      Linking.openURL(props.url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TouchableHighlight underlayColor={'#333'} onPress={handleDateSheetPress}>
      <View style={styles.dateSheetContainer}>
        <View style={styles.transportScreenSection}>
          <View style={styles.dateSheetBoxHeading}>
            <Text style={styles.noticeHeading}>{props.title}</Text>
          </View>

          <DetailListComponent
            titleArr={props.titleArr}
            infoArr={props.item}
            skipContainerStyle
          />
        </View>
        <Image source={ic_pdf_red} resizeMode="cover" style={styles.pdfIcon} />
      </View>
    </TouchableHighlight>
  );
};

export default DateSheetItem;

const styles = StyleSheet.create({
  dateSheetContainer: {
    backgroundColor: '#fff',
    borderLeftColor: '#1ba2de',
    borderLeftWidth: 3,
    borderRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transportScreenSection: {
    flex: 1,
  },
  dateSheetBoxHeading: {
    flexDirection: 'row',
    paddingHorizontal: wp(2),
  },
  noticeHeading: {
    fontWeight: 'bold',
    paddingTop: wp(1),
    color: '#1ba2de',
    fontSize: wp(3),
  },
  pdfIcon: {
    width: wp(6),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
});
