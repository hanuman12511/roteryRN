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
import DetailListComponent from './DetailListComponent';
// import showToast from './CustomToast';

// Icons
import ic_pdf_red from 'assets/icons/ic_pdf_red.png';

const ResultItem = props => {
  const handleResultPress = async () => {
    try {
      Linking.openURL(props.url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <TouchableHighlight underlayColor={'#333'} onPress={handleResultPress}>
      <View style={styles.transportScreenSection}>
        <View style={styles.detail}>
          <Text style={styles.noticeHeading}>{props.examName}</Text>

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

export default ResultItem;

const styles = StyleSheet.create({
  transportScreenSection: {
    backgroundColor: '#fff',
    borderLeftColor: '#808285',
    borderLeftWidth: 3,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: wp(2),
    paddingVertical: wp(0.5),
  },
  detail: {
    flex: 1,
  },
  noticeHeading: {
    paddingHorizontal: wp(2),
    fontWeight: 'bold',
    color: '#1ba2de',
    fontSize: wp(3),
  },
  pdfIcon: {
    width: wp(6),
    aspectRatio: 1 / 1,
  },
});
