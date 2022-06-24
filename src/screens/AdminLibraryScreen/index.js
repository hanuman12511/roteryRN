import React, {Component} from 'react';
import {View, Alert, Image, TouchableHighlight} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import CustomLoader from 'components/CustomLoader';
import ScreenHeader from 'components/ScreenHeader';
import DetailListComponent from 'components/DetailListComponent';

// Images
import admin_library from 'assets/images/admin_library.jpg';

// Icons
import ic_search_white from 'assets/icons/ic_search_white.png';

// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class LibraryScree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      connectionState: true,
      titleArr: [
        'Total Books',
        'Total Issued Books',
        'Total Available Books',
        'Total Cupboards',
        'Total Shelves',
        'Total Book Categories',
        'Total Fine',
      ],
      infoArr: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    this.fetchLibraryInfo();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  fetchLibraryInfo = async () => {
    try {
      await this.props.getLibraryData();
      const response = this.props.isGetLibraryData;
      if (this.state.connectionState === true) {
        // processing response
        if (response) {
          const {success} = response;

          if (success === 1) {
            const {output: libraryInfo} = response;
            const {
              totalBooks,
              issuedBooks,
              availableBooks,
              totalCupBoards,
              totalShelf,
              totalBookCategory,
              totalFineCount,
            } = libraryInfo;

            const infoArr = [
              totalBooks,
              issuedBooks,
              availableBooks,
              totalCupBoards,
              totalShelf,
              totalBookCategory,
              totalFineCount,
            ];

            this.setState({infoArr, isLoading: false});
          }
        } else {
          this.setState({infoArr: null, isLoading: false});
          //Alert.alert('', response.message);
        }
      } else {
        this.setState({isLoading: false});
      }
    } catch (error) {
      Alert.alert('', error);
      console.log(error.message);
    }
  };

  handleBookSearch = () => {
    this.props.navigation.push('AdminLibraryBookSearch');
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }

    const {titleArr, infoArr} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        {this.state.connectionState && (
          <>
            <ScreenHeader
              title="Library"
              showSchoolLogo
              nav={this.props.navigation}
            />

            <View style={styles.transportScreenSection}>
              <Image
                style={styles.transportImg}
                source={admin_library}
                resizeMode="cover"
              />

              <View style={styles.OutstandingFeeDetailBox}>
                <DetailListComponent titleArr={titleArr} infoArr={infoArr} />
              </View>
            </View>

            <TouchableHighlight
              underlayColor="#1ba2de80"
              onPress={this.handleBookSearch}
              style={styles.floatingSearchButton}>
              <Image
                source={ic_search_white}
                resizeMode="cover"
                style={styles.floatingSearchIcon}
              />
            </TouchableHighlight>
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
  isGetLibraryData: adminSelectors.isGetLibraryData(state),
});
const mapDispatchToProps = {
  getLibraryData: adminOperations.getLibraryData,
};
export default connect(mapStateToProps, mapDispatchToProps)(LibraryScree);
