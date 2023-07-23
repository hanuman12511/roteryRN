import React from 'react';
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const PhotoGalleryComponent = props => {
  const {item, index, nav, getImageCollection} = props;
  const {image, caption} = item;

  const handlePhotoView = () => {
    nav.push('PhotoGalleryViewer', {
      info: {getImageCollection, imageIndex: index},
    });
  };

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={handlePhotoView}
      style={styles.container}>
      <ImageBackground
        source={{uri: image}}
        resizeMode="cover"
        style={styles.image}>
        {caption && (
          <Text numberOfLines={2} style={styles.caption}>
            {caption}
          </Text>
        )}
      </ImageBackground>
    </TouchableHighlight>
  );
};

export default PhotoGalleryComponent;

const styles = StyleSheet.create({
  container: {
    width: wp(48.4),
    marginRight: wp(1),
  },
  image: {
    width: '100%',
    aspectRatio: 1 / 1,
    justifyContent: 'flex-end',
  },
  caption: {
    color: '#fff',
    backgroundColor: '#00000080',
    padding: wp(1),
    textAlign: 'center',
  },
});
