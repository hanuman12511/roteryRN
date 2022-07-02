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
      modalVisible: false,

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
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );

          data.push(documentSnapshot.data());
        });
      });
    this.setState({categories: data, isListRefreshing: false});
  };

  // handleFaqData = async () => {
  //   const params = null;
  //   await this.props.faqCategories(params).then(() => {
  //     const {success, message} = this.props.isFaqCategories;
  //     if (success) {
  //       const {categories} = this.props.isFaqCategories;
  //       this.setState({
  //         categories: categories,
  //         isProcessing: false,
  //         isListRefreshing: false,
  //       });
  //     } else {
  //       this.setState({
  //         categories: '',
  //         message,
  //         isProcessing: false,
  //         isListRefreshing: false,
  //       });
  //     }
  //   });
  // };

  addFaqData = async () => {
    try {
      await firebase
        .firestore()
        .collection('faq')
        .add({
          id: 1,
          name: 'Jaipur Elite',
          image:
            'data:image/png;base64,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',
        })
        .then(() => {
          console.log('User added!');
        });
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
  listItem = ({item}) => <Faq item={item} nav={this.props.navigation} />;
  // listItem = ({item}) => {
  //   console.log('dataitem', item);
  // };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {modalVisible} = this.state;
    console.log(this.state.categories);
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
              {/* <TouchableOpacity
                style={styles.addFaqButtonStyle}
                onPress={this.addFaqData}>
                <Text style={styles.buttonStyle}>+</Text>
              </TouchableOpacity> */}
              <View style={styles.centeredView}>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    this.setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.modalText}>Add FAQ</Text>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                            this.setModalVisible(!modalVisible),
                              this.addFaqData();
                          }}>
                          <Text style={styles.textStyle}>X</Text>
                        </Pressable>
                      </View>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TextInput
                          style={styles.modalText}
                          placeholder="Enter Name"
                          value={this.state.addName}
                          onChangeText={this.addName}
                        />
                        <TextInput
                          style={styles.modalText}
                          placeholder="Question"
                          value={this.state.addName}
                          onChangeText={this.addName}
                        />
                        <TextInput
                          style={styles.modalText}
                          placeholder="Answear"
                          value={this.state.addName}
                          onChangeText={this.addName}
                        />

                        <Image source={gallery} />

                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => {
                            this.setModalVisible(!modalVisible),
                              this.addFaqData();
                          }}>
                          <Text style={styles.textStyle}>Submit</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={[
                    styles.button,
                    styles.buttonOpen,
                    styles.addFaqButtonStyle,
                  ]}
                  onPress={() => this.setModalVisible(true)}>
                  <Text style={styles.textStyle}>Add FAQ</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.errMessage}>
              <Text style={styles.errText}>{this.state.message}</Text>
            </View>
          ))}
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
  },
  buttonStyle: {
    fontSize: 40,
    color: '#00bfff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    // height: hp(35),
    width: wp(90),
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: wp(5),
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
