import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Gallery from 'react-native-image-gallery';
import {SafeAreaView} from 'react-native-safe-area-context';
// Icons
import ic_close from 'assets/icons/ic_cancel.png';
import left_arrow from 'assets/icons/left-arrow.png';
import right_arrow from 'assets/icons/right-arrow.png';
const PhotoGalleryViewerScreen = props => {
  const {navigation} = props;
  const [count, setCount] = useState(0);
  const [showCount, setShowCount] = useState(1);
  // const info = navigation.getParam('info', null);
  const info = navigation.getParam('images', null);

  if (!info) {
    return null;
  }

  const indexData = info.map((value, index) => index);
  const images = info.map(item => ({source: {uri: item.image}}));
  const afInx = indexData.map(item => item + 1);
  const handleBack = () => {
    props.navigation.pop();
  };
  const handleLeft = () => {
    if (!(count === 1)) {
      setCount(count - 1);
      setShowCount(showCount - 1);
    } else {
      setCount(0);
      setShowCount(1);
    }
  };
  const handleRight = () => {
    if (count < info.length) {
      setCount(count + 1);
      setShowCount(showCount + 1);
    } else {
      setCount(0);
      setShowCount(1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Gallery
        images={images}
        initialPage={count}
        pageMargin={20}
        style={styles.galleryViewer}
      />

      {/* <View style={styles.closeButtonContainer2}>
        <Text style={{color: 'white'}}>
          {showCount}/{info.length}
        </Text>
      </View> */}
      <TouchableHighlight
        style={styles.closeButtonContainer}
        underlayColor="transplant"
        onPress={handleBack}>
        <Image
          source={ic_close}
          resizeMode="cover"
          style={styles.closeButton}
        />
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.arrowIndexleft}
        underlayColor="transplant"
        onPress={() => handleLeft()}>
        <Image
          source={left_arrow}
          resizeMode="cover"
          style={styles.closeButton}
        />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.arrowIndexRight}
        underlayColor="transplant"
        onPress={() => handleRight()}>
        <Image
          source={right_arrow}
          resizeMode="cover"
          style={styles.closeButton}
        />
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default PhotoGalleryViewerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  galleryViewer: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: wp(4),
    top: hp(8),
  },
  closeButtonContainer2: {
    position: 'absolute',
    left: wp(10),
    top: 18 + wp(4),
  },
  arrowIndexleft: {
    position: 'absolute',
    left: wp(2),
    top: hp(50),
  },
  arrowIndexRight: {
    position: 'absolute',
    right: wp(2),
    top: hp(50),
  },
  closeButton: {
    height: hp(4),
    aspectRatio: 1 / 1,
  },
  imageSliderContainer: {
    height: hp(50),
    width: wp(100),
  },
  customImage: {
    height: wp(50),
    width: wp(100),
  },
});
