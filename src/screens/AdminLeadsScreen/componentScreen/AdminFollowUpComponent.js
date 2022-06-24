import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// icons
import ic_pdf_red from 'assets/icons/ic_pdf_red.png';
import CustomLoader from 'components/CustomLoader';
// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class AdminResultComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      visitors: ['Hello', 'hello'],
      currentDate: null,
      status: null,
      isListRefreshing: false,
      results: [
        {
          name: 'Yojak Shukla',
          mobile: 9829846786,
          class: 'XII',
          mode: 'Other',
          remark: 'CALL AFTER 2 DAYS',
          next_followup_date: '23-04-2021',
          last_followup_date: '21-04-2021',
          enquiry_date: '19-04-2021',
        },
        {
          name: 'Ashish',
          mobile: 7988471193,
          class: 'VI',
          mode: 'Other',
          remark: 'Not answering',
          next_followup_date: '23-04-2021',
          last_followup_date: '21-04-2021',
          enquiry_date: '10-12-2021',
        },
      ],
      addAssignmentButtonZIndex: 0,
    };
  }

  componentDidMount() {
    this.handleResultData();
  }
  handleResultData = async () => {
    try {
    } catch (error) {
      console.log('error in handle result data', error);
    }
  };

  renderItem = ({item}) => {
    const listStyle = {
      // borderLeftWidth: 3,
      // backgroundColor: item.bg,
      backgroundColor:
        '#' +
        (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
        0x15,
      // backgroundColor: '#fff',
      borderRadius: 2,
      // padding: wp(1),
      flexDirection: 'row',
      alignItems: 'flex-start',
      alignItems: 'center',
      padding: wp(3),
      borderWidth: 1,
      borderColor: '#00000015',
    };

    return (
      <View style={listStyle}>
        <View style={{flex: 1}}>
          <Text style={styles.listText}>{item.name}</Text>
          <Text style={styles.listText2}>{item.reslut_upload_date}</Text>
        </View>
        <TouchableOpacity onPress={() => this.handleDownload(item)}>
          <Image source={ic_pdf_red} resizeMode="cover" style={[styles.icon]} />
        </TouchableOpacity>
      </View>
    );
  };
  handleDownload = async value => {
    try {
      console.log(value);
      const url = value.result_link;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        Linking.openURL(url);
      } else {
        Linking.openURL(url);
        // showToast('Unable to handle this url!');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    if (this.state.isLoading) {
      return <CustomLoader />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.results}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.itemSeparator}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isGetStudentRemark: adminSelectors.isGetStudentRemark(state),
});
const mapDispatchToProps = {
  getStudentRemark: adminOperations.getStudentRemark,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminResultComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listText: {
    flex: 1,
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  listText2: {
    flex: 1,
    fontSize: wp(3),
    fontWeight: '400',
  },
  icon: {
    height: wp(6),
    aspectRatio: 1 / 1,
  },
  listContentContainer: {
    padding: wp(2),
  },
  separator: {
    height: wp(2),
  },
});
