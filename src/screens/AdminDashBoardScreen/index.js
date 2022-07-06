import React, {Component} from 'react';
import {View, Alert, FlatList, Dimensions} from 'react-native';
import {styles} from './styles';
import ImageSlider from 'react-native-image-slider';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// Components
import Tile from 'components/Tile';
import ScreenHeader from 'components/ScreenHeader';
import CustomLoader from 'components/CustomLoader';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';

import offline from 'assets/icons/internetConnectionState.gif';
//data
import {connect} from 'react-redux';
import {sliderOperations, sliderSelectors} from 'idsStore/data/slider';

import remoteConfig from '@react-native-firebase/remote-config';
import {
  bannerSlider,
  getBannerSlider,
  storeTilesData,
  getTilesData,
} from 'api/UserPreference';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

class DashBoardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      sliderImages: [],
      connectionState: true,

      // appState: AppState.currentState,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchData();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  fetchData = async () => {
    try {
      const data = await getBannerSlider();
      const tiles_Data = await getTilesData();
      console.log('tiles_data', data, tiles_Data);
      let sliderData = JSON.parse(data);
      this.bannerSlider = Object.values(sliderData?.slider_banners);
      // let tiles_data = JSON.parse(tiles_Data);
      console.log('tiles_data', data, tiles_Data);
      this.tiles = tiles_Data.dg_tiles;
      this.tileStyle = this.tiles.dg_tiles?.length / 3;
      this.setState({isLoading: false});
      // console.log('tiles', tiles_Data);
      console.log(
        'tiles',
        this.bannerSlider,
        tiles_Data.President_tiles,
        parseInt(this.tileStyle),
      );
    } catch (error) {
      console.log('banner slider issues', error);
    }
  };

  renderItem = ({item}) => {
    return (
      item?.isVisible && (
        <View style={styles.tilesContainer}>
          <View
            style={{
              height: hp(67) / parseInt(this.tileStyle),
              justifyContent: 'space-between',
            }}>
            <Tile
              title={item?.name}
              color={item?.color}
              image={item?.image}
              nav={this.props.navigation}
            />
          </View>
        </View>
      )
    );
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }
    // Processing data
    const {sliderImages} = this.state;
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Home"
              nav={navigation}
              // showSearchIcon
              showSchoolLogo
            />
            <View style={styles.imageSliderContainer}>
              <ImageSlider
                loop
                loopBothSides
                autoPlayWithInterval={2000}
                images={this.bannerSlider}
              />
            </View>

            <FlatList
              data={data}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              ItemSeparatorComponent={this.itemSeparator}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
              numColumns={3}
            />
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
  isSliderGet: sliderSelectors.isSliderGet(state),
});
const mapDispatchToProps = {
  getDashboardSlider: sliderOperations.getDashboardSlider,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoardScreen);
