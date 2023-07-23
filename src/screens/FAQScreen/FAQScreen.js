import React, {Component} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
// network alert
import NetInfo from '@react-native-community/netinfo';
import FastImage from 'react-native-fast-image';
//gif
import offline from 'assets/icons/internetConnectionState.gif';
// icon
import gallery from 'assets/icons/gallery.png';
// Components
import ScreenHeader from 'components/ScreenHeader';
import ProcessingLoader from 'components/ProcessingLoader';
import Faq from 'components/FaqTIleComponent';

// popup
import Add_Categories from './Add_Categories';

// firebase
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import {connect} from 'react-redux';
import {faqOperations, faqSelectors} from 'idsStore/data/faq';
import {getFaqData} from 'api/UserPreference';

class FAQScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: '',
      isProcessing: false,
      message: '',
      isListRefreshing: false,
      connectionState: true,
      modalCategoryVisible: false,

      categoriesData: [
        {
          id: 24,
          image: 'img',
          name: 'TestData',
          questions: [
            {
              Answer:
                '1.To search for Rotary and Rotaract clubs, select Club Finder at the',
              Question: '1.How do I find a club?',
            },
            {
              Answer:
                '2.To search for Rotary and Rotaract clubs, select Club Finder at the',
              Question: '2.How do I find a club?',
            },
          ],
        },
        {
          id: 25,
          image: 'img',
          name: 'MidData',
          questions: [
            {
              Answer:
                '1.To search for Rotary and Rotaract clubs, select Club Finder at the',
              Question: '1.How do I find a club?',
            },
            {
              Answer:
                '2.To search for Rotary and Rotaract clubs, select Club Finder at the',
              Question: '2.How do I find a club?',
            },
            {
              Answer:
                '3.To search for Rotary and Rotaract clubs, select Club Finder at the',
              Question: '3.How do I find a club?',
            },
          ],
        },
      ],
    };

    this.faqData = [];
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({connectionState: state.isConnected});
    });
    // this.handleFaqData();

    this.getingFAQ_Data();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  getingFAQ_Data = async () => {
    // let faq = await getFaqData();
    // faq.map(item => this.setState({categories: item}));
    let data = [];
    await firebase
      .firestore()
      .collection('faq')
      .get()
      .then(collectionSnapshot => {
        console.log('Total users: ', collectionSnapshot.size);
        collectionSnapshot.forEach(documentSnapshot => {
          // console.log(
          //   'User ID: ',
          //   documentSnapshot.id,
          //   documentSnapshot.data(),
          // );

          data.push(documentSnapshot.data());
        });
      });
    this.setState({categories: data, isListRefreshing: false});
  };

  addFaqData = async () => {
    try {
    } catch (error) {
      console.log('error while add data in to the firebase ', error);
    }
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.getingFAQ_Data();
    } catch (error) {
      console.log(error.message);
    }
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  setCategoriesModalVisible = visible => {
    this.setState({modalCategoryVisible: visible});
  };
  listItem = ({item}) => <Faq item={item} nav={this.props.navigation} />;
  // listItem = ({item}) => {
  //   console.log('dataitem', item);
  // };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {modalCategoryVisible} = this.state;
    // console.log(this.state.categories);
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="FAQ's"
          showSchoolLogo
          nav={this.props.navigation}
        />
        {this.state.connectionState &&
          (this.state.categories !== '' ? (
            <View style={styles.mainContainer}>
              <FlatList
                data={this.state.categories}
                renderItem={this.listItem}
                keyExtractor={this.keyExtractor}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                ItemSeparatorComponent={this.itemSeparator}
                contentContainerStyle={styles.listContainer}
                refreshing={this.state.isListRefreshing}
                onRefresh={this.handleListRefresh.bind(this)}
              />

              <Pressable
                style={[
                  styles.button,
                  styles.buttonOpen,
                  styles.addFaqButtonCategories,
                ]}
                onPress={() => this.setCategoriesModalVisible(true)}>
                <Text style={styles.textStyle}>Add Category</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.errMessage}>
              <Text style={styles.errText}>{this.state.message}</Text>
            </View>
          ))}

        {this.state.modalCategoryVisible && (
          <Add_Categories
            closePopup={() => {
              this.setCategoriesModalVisible(!modalCategoryVisible);
            }}
            refresh={this.getingFAQ_Data}
          />
        )}
        {this.state.connectionState === false ? (
          <View style={styles.offlineStyle}>
            <FastImage source={offline} style={styles.networkIssue} />
          </View>
        ) : null}
        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isFaqCategories: faqSelectors.isFaqCategories(state),
});
const mapDispatchToProps = {
  faqCategories: faqOperations.faqCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: wp(1.5),
  },
  mainContainer: {
    flex: 1,
    // backgroundColor: '#ccc',
  },
  bannerContainer: {
    flexDirection: 'row',
  },
  headerBanner: {
    width: wp(100),
    aspectRatio: 2 / 1,
  },
  referContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
    marginTop: hp(-5),
    padding: wp(3),
  },
  heading: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#192423',
  },
  referralCode: {
    fontSize: wp(3.5),
    fontWeight: '700',
    marginTop: wp(3),
    color: '#0b8457',
  },
  referAmount: {
    fontSize: wp(3.5),
    fontWeight: '700',
    marginTop: wp(3),
    color: '#0b8457',
  },
  text: {
    fontSize: wp(3.5),
    color: '#192423',
    marginTop: hp(1.5),
  },
  helpContainer: {
    // flexDirection: 'row',
  },
  helpText: {
    flex: 1,
    marginRight: wp(2),
  },
  graphic: {
    height: wp(45),
    aspectRatio: 3 / 2,
    alignSelf: 'center',
    marginBottom: hp(3),
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(1.5),
    borderRadius: wp(1),
    marginTop: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: wp(3),
    color: '#0b8457',
  },

  saveImageButton: {
    // borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(1.5),
    borderRadius: wp(1),
    marginTop: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },

  imgButton: {
    height: wp(10),
    aspectRatio: 1 / 1,
  },

  infoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: wp(3),
    padding: wp(3),
  },
  number: {
    width: wp(8),
    height: wp(8),
    backgroundColor: '#0b8457',
    color: '#fff',
    fontSize: wp(4),
    textAlign: 'center',
    lineHeight: wp(8),
    borderRadius: wp(4),
    marginRight: wp(3),
  },
  dirationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(2),
  },
  numberInfo: {
    fontSize: wp(3.5),
    flex: 1,
  },
  lastButton: {
    backgroundColor: '#0b8457',
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastButtonText: {
    color: '#fff',
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  errMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errText: {
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  addFaqButtonStyle: {
    right: 18,
    bottom: 25,
    height: wp(20),
    width: wp(20),
    position: 'absolute',
    padding: wp(2),
    // borderWidth: 1,
    // borderColor: '#00bfff',
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addFaqButtonCategories: {
    right: 18,
    bottom: 25,
    height: wp(20),
    width: wp(20),
    position: 'absolute',
    padding: wp(2),
    // borderWidth: 1,
    // borderColor: '#00bfff',
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonStyle: {
    fontSize: 40,
    color: '#00bfff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
