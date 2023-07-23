import React from 'react';
import {Image, StyleSheet, TouchableHighlight, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Gallery from 'react-native-image-gallery';
import {SafeAreaView} from 'react-native-safe-area-context';

// Icons
import ic_close from 'assets/icons/ic_cancel.png';

const noticeBoardSlider = props => {
  const {navigation} = props;
  const info = navigation.getParam('images', null);
  if (!info) {
    return null;
  }
  const images = info.map(item => ({
    source: {uri: item},
    dimensions: {width: 150, height: 150},
  }));
  const handleBack = () => {
    props.navigation.pop();
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Gallery
        images={images}
        // initialPage={imageIndex}
        pageMargin={20}
        style={styles.galleryViewer}
      />
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
    </SafeAreaView>
  );
};

export default noticeBoardSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  galleryViewer: {
    flex: 1,
    backgroundColor: 'black',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: wp(4),
    top: 18 + wp(4),
  },
  closeButton: {
    height: hp(4),
    aspectRatio: 1 / 1,
  },
});
