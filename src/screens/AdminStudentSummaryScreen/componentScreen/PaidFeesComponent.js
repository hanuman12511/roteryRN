import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import DetailListComponent from 'components/DetailListComponent';
import CustomLoader from 'components/CustomLoader';
import showToast from 'components/CustomToast';

// Icons
import ic_back from 'assets/icons/ic_back.png';

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class PaidFee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      infoArr: null,
    };

    this.titleArr = [
      'Receipt No.',
      'Pay Date',
      'Description',
      'Fee',
      'Mode',
      'Challan No.',
      'Bank',
    ];
  }

  componentDidMount() {
    this.fetchStudentPaidFeesDetail();
  }

  fetchStudentPaidFeesDetail = async () => {
    try {
      const id = this.props.navigation.getParam('id');
      await this.props.getStudentPaidFeesDetail(id);
      const response = this.props.isGetStudentPaidFeesDetail;

      if (response.success === 1) {
        const feeDetail = response.output;
        let infoArr = [];

        for (const detail of feeDetail) {
          infoArr.push([
            detail.receipt_no,
            detail.paydate,
            detail.description,
            detail.fee,
            detail.mode,
            detail.cheque_no,
            detail.bank,
          ]);
        }

        this.setState({infoArr, isLoading: false});
      } else if (response.success === 0) {
        this.props.navigation.pop();
        showToast(response.message);
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  renderItem = ({item}) => (
    <DetailListComponent titleArr={this.titleArr} infoArr={item} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return this.state.isLoading ? (
      <CustomLoader />
    ) : (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          backIcon={ic_back}
          title="Paid Fee"
          nav={this.props.navigation}
        />

        <FlatList
          data={this.state.infoArr}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetStudentPaidFeesDetail: adminSelectors.isGetStudentPaidFeesDetail(state),
});
const mapDispatchToProps = {
  getStudentPaidFeesDetail: adminOperations.getStudentPaidFeesDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaidFee);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  listContentContainer: {
    padding: wp(2),
  },
  separator: {
    height: wp(2),
  },
});
