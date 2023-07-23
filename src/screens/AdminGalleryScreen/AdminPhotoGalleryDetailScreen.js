import React, {Component} from 'react';
import {
  View,
  Image,
  Linking,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  AppState,
} from 'react-native';

// Components
import {SafeAreaView} from 'react-native-safe-area-context';
// import CustomLoader from '../components/CustomLoader';
import ScreenHeader from 'components/ScreenHeader';
import GalleryDetailComponent from './GalleryDetailComponent';
import ic_back from 'assets/icons/ic_back.png';
// API
// import {makeRequest, BASE_URL} from '../api/ApiInfo';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default class PhotoGalleryDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      albumData: [
        {
          description: 'Vidhyadhar Nagar Office Branch',
          albumImage: 'https://www.daac.in/images/vb1.webp',
        },
        {
          description: 'Mansarover Office Branch',
          albumImage: 'https://www.daac.in/images/mb3.webp',
        },
      ],

      notificationCount: 0,
    };
  }

  renderItem = ({item}) => (
    <GalleryDetailComponent item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {images: sliderImages, blogs} = this.state;
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Gallery"
          backIcon={ic_back}
          nav={this.props.navigation}
        />
        <FlatList
          data={this.state.albumData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContentContainer: {
    marginTop: hp(1),
    padding: 8,
  },
  separator: {
    height: hp(2),
  },
});
