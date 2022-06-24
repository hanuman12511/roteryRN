import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, Alert, Linking} from 'react-native';
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
      isLoading: true,
      visitors: ['Hello', 'hello'],
      currentDate: null,
      status: null,
      isListRefreshing: false,
      results: [],
      addAssignmentButtonZIndex: 0,
      dates: [],
      totalPayment: '',
      selStyle: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: wp(2),
        margin: wp(1),
        borderRadius: 50,
        backgroundColor: '#018bc8',
        color: '#fff',
      },
      nwStyle: 4,
    };
  }

  componentDidMount() {
    this.handleResultData();
  }
  handleResultData = async (data, index) => {
    try {
      this.setState({isLoading: true});

      let admissionDate = '';
      if (data !== undefined) {
        admissionDate = data;
      } else {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        admissionDate = dd;
      }

      await this.props.getAdminProspectus(admissionDate);
      const response = this.props.isGetAdminProspectus;
      if (response && response.success === 1) {
        const {prospectus_details, dates, totalPayment} = response;

        this.setState({
          results: prospectus_details,
          dates,
          totalPayment,
          isLoading: false,
        });
      } else {
        const {message, dates, totalPayment} = response;
        this.setState({
          results: [],
          message,
          dates,
          totalPayment,
          isLoading: false,
        });
      }
    } catch (error) {
      Alert.alert('', error);
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
      borderRadius: 10,
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
          {/* <Text style={styles.listText}>
             <Text style={styles.listText2}>({item.acedamic_year})</Text>
          </Text> */}
          <View style={styles.listData}>
            <Text style={styles.listText2}>Form No. </Text>
            <Text style={styles.listText3}>-</Text>
            <Text style={styles.listText4}>{item.form_no}</Text>
          </View>
          <View style={styles.listData}>
            <Text style={styles.listText2}>Name </Text>
            <Text style={styles.listText3}>-</Text>
            <Text style={styles.listText4}>{item.pupils_name}</Text>
          </View>
          <View style={styles.listData}>
            <Text style={styles.listText2}>Class </Text>
            <Text style={styles.listText3}>-</Text>
            <Text style={styles.listText4}>
              {item.class}{' '}
              <Text style={styles.listText2}>({item.acedmicyear})</Text>
            </Text>
          </View>
          <View style={styles.listData}>
            <Text style={styles.listText2}>Mobile </Text>
            <Text style={styles.listText3}>-</Text>
            <Text style={styles.listText4}>{item.mobile}</Text>
          </View>
          <View style={styles.listData}>
            <Text style={styles.listText2}>Mode </Text>
            <Text style={styles.listText3}>-</Text>
            <Text style={styles.listText4}>{item.type}</Text>
          </View>
          <View style={styles.listData}>
            <Text style={styles.listText2}>Selling Date</Text>
            <Text style={styles.listText3}>-</Text>
            <Text style={styles.listText4}>{item.selling_date}</Text>
          </View>

          {/* <Text style={styles.listText5}>{item.remark}</Text> */}
        </View>
      </View>
    );
  };
  renderItemss = ({item, index}) => {
    const pressInfo = (val, ind) => {
      this.setState({nwStyle: ind});
      this.handleResultData(val, ind);
    };

    let SelStyle =
      index === this.state.nwStyle
        ? styles.datePickingStyle2
        : styles.datePickingStyle;
    return (
      <Text onPress={() => pressInfo(item, index)} style={SelStyle}>
        {item}
      </Text>
    );
  };
  renderHeader = () => {
    const dates = this.state.dates;
    let tVal = [];
    dates.map((value, index) => {
      let nVal = value.split('-');
      tVal.push(nVal[0]);
    });
    tVal.sort(function (a, b) {
      return a - b;
    });

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: wp(2),
        }}>
        <View>
          <FlatList
            data={tVal}
            renderItem={this.renderItemss}
            keyExtractor={this.keyExtractor}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            extraData={tVal}
          />
        </View>
        <View style={styles.totalPaymentViewStyle}>
          <Text style={styles.totalPaymentStyle}>
            Total Payment : {this.state.totalPayment}
          </Text>
        </View>
      </View>
    );
  };

  handleDownload = async value => {
    try {
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
        {<this.renderHeader />}
        {this.state.results.length !== 0 ? (
          <FlatList
            data={this.state.results}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.itemSeparator}
            contentContainerStyle={styles.listContentContainer}
          />
        ) : (
          <View style={styles.errMsg}>
            <Text>{this.state.message}</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isGetAdminProspectus: adminSelectors.isGetAdminProspectus(state),
});
const mapDispatchToProps = {
  getAdminProspectus: adminOperations.getAdminProspectus,
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
    fontSize: wp(4),
    fontWeight: '700',
  },
  listText2: {
    flex: 1,
    fontSize: wp(3),
    fontWeight: '400',
  },
  listText3: {
    paddingRight: wp(2),
    fontSize: wp(3),
    fontWeight: '400',
  },
  listText4: {
    flex: 2,
    fontSize: wp(3),
    fontWeight: '400',
  },
  listText5: {
    marginTop: wp(2),
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
  listData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickingStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(2),
    margin: wp(1),
    borderRadius: 50,
    backgroundColor: '#cccc',
  },
  datePickingStyle2: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(2),
    margin: wp(1),
    borderRadius: 50,
    backgroundColor: '#018bc8',
    color: '#fff',
  },
  totalPaymentViewStyle: {
    margin: wp(2),
  },
  totalPaymentStyle: {
    fontSize: wp(4),
    fontWeight: '700',
  },
  errMsg: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
