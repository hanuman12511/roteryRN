import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, Pressable, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Components
import Header from 'components/ScreenHeader';
import FaqQuestion from 'components/FaqQuesListComponent';
import ProcessingLoader from 'components/ProcessingLoader';
import {connect} from 'react-redux';
import {faqOperations, faqSelectors} from 'idsStore/data/faq';
import AddComponent from './AddComponent';

// firebase
// firebase
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

class FAQQuestionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      questions: [],
      isProcessing: true,
      isListRefreshing: false,
      modalVisible: false,
    };
    this.id = this.props.navigation.getParam('data');
  }

  componentDidMount() {
    this.handleGetQuestions();
  }

  handleGetQuestions = async () => {
    let data = [];
    await firebase
      .firestore()
      .collection('faq')
      .doc(`${this.id.name}`)
      .collection('question')
      .get()
      .then(collectionSnapshot => {
        // console.log('Total users: ', collectionSnapshot.size);
        collectionSnapshot.forEach(documentSnapshot => {
          // console.log(
          //   'User ID: ',
          //   documentSnapshot.id,
          //   documentSnapshot.data(),
          // );
          data.push(documentSnapshot.data());
        });
      });
    // console.log('question data', data);
    this.setState({
      questions: data.reverse(),
      isProcessing: false,
      isListRefreshing: false,
    });
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.handleGetQuestions();
    } catch (error) {
      console.log(error.message);
    }
  };
  listItem = ({item}) => (
    <FaqQuestion item={item} nav={this.props.navigation} />
  );

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {modalVisible} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="FAQ Questions"
          nav={this.props.navigation}
          //   showLocationPicker
          showNotificationIcon
          showCartIcon
        />
        {this.state.questions !== '' ? (
          <View style={styles.mainContainer}>
            <FlatList
              data={this.state.questions}
              renderItem={this.listItem}
              keyExtractor={this.keyExtractor}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.itemSeparator}
              contentContainerStyle={styles.listContainer}
              refreshing={this.state.isListRefreshing}
              onRefresh={this.handleListRefresh.bind(this)}
            />
            <Pressable
              style={[
                styles.button,
                styles.buttonOpen,
                styles.addFaqButtonStyle,
              ]}
              onPress={() => this.setModalVisible(true)}>
              <Text style={styles.textStyle}>Add questions</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.errMessage}>
            <Text style={styles.errText}>{this.state.message}</Text>
          </View>
        )}
        {this.state.modalVisible && (
          <AddComponent
            closePopup={() => {
              this.setModalVisible(!modalVisible);
            }}
            categories={this.id}
            refresh={this.handleGetQuestions}
          />
        )}
        {this.props.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isFaqQuestion: faqSelectors.isFaqQuestion(state),
});

const mapDispatchToProps = {
  faqQuestion: faqOperations.faqQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(FAQQuestionsScreen);

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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
