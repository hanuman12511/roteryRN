import React, {Component} from 'react';
import {View, StyleSheet, FlatList, StatusBar} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import PhotoGalleryComponent from './PhotoGalleryComponent';
import ic_back from 'assets/icons/ic_back.png';
export default class PhotoGalleryFolderScreen extends Component {
  constructor(props) {
    super(props);

    // fetching navigation params
    this.galleryImages = this.props.navigation.getParam('images', null);
  }

  getImageCollection = () => {
    return this.galleryImages;
  };

  renderItem = ({item, index}) => (
    <PhotoGalleryComponent
      item={item}
      index={index}
      nav={this.props.navigation}
      getImageCollection={this.getImageCollection}
    />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {galleryImages} = this;

    if (!galleryImages) {
      return null;
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScreenHeader
          title="Gallery"
          backIcon={ic_back}
          showSchoolLogo
          nav={this.props.navigation}
        />
        <View style={styles.galleryContainer}>
          <FlatList
            data={galleryImages}
            renderItem={this.renderItem}
            showsHorizontalScrollIndicator={false}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.itemSeparator}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
            numColumns={2}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  galleryContainer: {
    flex: 1,
  },
  listContentContainer: {
    paddingVertical: wp(1),
    paddingLeft: wp(1),
  },
  separator: {
    height: wp(1),
  },
});
