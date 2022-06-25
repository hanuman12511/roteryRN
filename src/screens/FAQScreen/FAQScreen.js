import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Components
import Header from 'components/ScreenHeader';
import ProcessingLoader from 'components/ProcessingLoader';
import Faq from 'components/FaqTIleComponent';

import {connect} from 'react-redux';
import {faqOperations, faqSelectors} from 'idsStore/data/faq';

class FAQScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: '',
      isProcessing: true,
      message: '',
      isListRefreshing: false,
    };
  }

  componentDidMount() {
    this.handleFaqData();
  }

  handleFaqData = async () => {
    const params = null;
    await this.props.faqCategories(params).then(() => {
      const {success, message} = this.props.isFaqCategories;
      if (success) {
        const {categories} = this.props.isFaqCategories;
        this.setState({
          categories: categories,
          isProcessing: false,
          isListRefreshing: false,
        });
      } else {
        this.setState({
          categories: '',
          message,
          isProcessing: false,
          isListRefreshing: false,
        });
      }
    });
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.handleFaqData();
    } catch (error) {
      console.log(error.message);
    }
  };

  listItem = ({item}) => <Faq item={item} nav={this.props.navigation} />;

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.categories !== '' ? (
          <View style={styles.mainContainer}>
            <FlatList
              data={this.state.categories}
              renderItem={this.listItem}
              keyExtractor={this.keyExtractor}
              showsVerticalScrollIndicator={false}
              // numColumns={3}
              ItemSeparatorComponent={this.itemSeparator}
              contentContainerStyle={styles.listContainer}
              refreshing={this.state.isListRefreshing}
              onRefresh={this.handleListRefresh.bind(this)}
            />
          </View>
        ) : (
          <View style={styles.errMessage}>
            <Text style={styles.errText}>{this.state.message}</Text>
          </View>
        )}

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
});
