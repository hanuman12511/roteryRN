import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  StatusBar,
  Text,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
// import FooterComponent from 'components/FooterComponent';
import ImageGalleryFolderComponent from './ImageGalleryFolderComponent';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
class PhotoGalleryFolderScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      connectionState: true,
      isListRefreshing: false,
      galleryList: null,
      status: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });

    // // subscribing to didFocus listener
    // this.didFocusSubscription = this.props.navigation.addListener(
    //   'didFocus',
    //   () => {
    this.fetchGalleryList();
    //   },
    // );
  }
  componentWillUnmount() {
    this.unsubscribe();
    // unsubscribing from didFocus listener
    // this.didFocusSubscription.remove();
  }
  fetchGalleryList = async () => {
    try {
      // calling api
      await this.props.getPhotoGallery();
      const response = this.props.isPhotoGallery;
      if (this.state.connectionState === true) {
        // processing response
        if (response) {
          const {success} = response;

          if (success) {
            const {gallery} = response;

            this.setState({
              galleryList: gallery,
              status: null,
              isLoading: false,
              isListRefreshing: false,
            });
          } else {
            const {message} = response;

            this.setState({
              status: message,
              galleryList: null,
              isLoading: false,
              isListRefreshing: false,
            });
          }
        } else {
          //Alert.alert('', response.message);
          this.setState({
            galleryList: null,
            status: null,
            isLoading: false,
            isListRefreshing: false,
          });
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.fetchGalleryList();
    } catch (error) {
      console.log(error.message);
    }
  };
  renderItem = ({item}) => {
    console.log('navigation data', this.props.navigation);
    return (
      <ImageGalleryFolderComponent item={item} nav={this.props.navigation} />
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }
    const {galleryList} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            {/* <ScreenHeader
              title="Gallery"
              showSchoolLogo
              nav={this.props.navigation}
            /> */}
            {galleryList ? (
              <View style={styles.galleryContainer}>
                <FlatList
                  data={galleryList}
                  renderItem={this.renderItem}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={this.keyExtractor}
                  ItemSeparatorComponent={this.itemSeparator}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContentContainer}
                  numColumns={2}
                  refreshing={this.state.isListRefreshing}
                  onRefresh={this.handleListRefresh}
                />
              </View>
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isListRefreshing}
                    onRefresh={this.handleListRefresh}
                  />
                }>
                <Text>{this.state.status}</Text>
              </ScrollView>
            )}
          </>
        )}
        {this.state.connectionState === false ? (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isPhotoGallery: adminSelectors.isPhotoGallery(state),
});
const mapDispatchToProps = {
  getPhotoGallery: adminOperations.getPhotoGallery,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotoGalleryFolderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  galleryContainer: {
    flex: 1,
  },
  listContentContainer: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(1.5),
  },
  separator: {
    height: wp(1),
  },
  networkIssue: {
    height: hp(50),
    aspectRatio: 1 / 1,
  },
  offlineStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
