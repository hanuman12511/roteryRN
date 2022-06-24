import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Components
import CustomLoader from 'components/CustomLoader';
import ProcessingLoader from 'components/ProcessingLoader';
import ScreenHeader from 'components/ScreenHeader';

// Icons
import ic_back from 'assets/icons/ic_back.png';
import ic_search_black from 'assets/icons/ic_search_black.png';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';

export default class SearchProductScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isProcessing: false,
      search: '',
      connectionState: true,
    };
  }
  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  handleSearchChange = search => {
    this.setState({search});
  };

  handleSearch = async () => {};

  render() {
    // const {isLoading} = this.state;
    // if (isLoading) {
    //   return <CustomLoader />;
    // }

    const {isProcessing, search} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Search"
              backIcon={ic_back}
              nav={this.props.navigation}
            />

            <KeyboardAwareScrollView
              enableOnAndroid
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View style={styles.contentContainer}>
                <View style={styles.searchInputContainer}>
                  <TextInput
                    style={styles.searchInputField}
                    placeholder="Search"
                    placeholderTextColor="#ccc"
                    value={search}
                    onChangeText={this.handleSearchChange}
                  />

                  <TouchableHighlight
                    style={styles.searchButton}
                    underlayColor="transparent"
                    onPress={this.handleSearch}>
                    <Image
                      source={ic_search_black}
                      resizeMode="cover"
                      style={styles.searchIcon}
                    />
                  </TouchableHighlight>
                </View>

                {/*  */}
              </View>
            </KeyboardAwareScrollView>

            {isProcessing && <ProcessingLoader />}
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
