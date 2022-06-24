import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
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
      isLoading: true,
      visitors: ['Hello', 'hello'],
      currentDate: null,
      status: null,
      isListRefreshing: false,
      results: [],
      addAssignmentButtonZIndex: 0,
    };
  }

  componentDidMount() {
    this.handleResultData();
  }
  handleResultData = async () => {
    try {
      const stId = this.props.stId;
      await this.props.getStudentRemark(stId);
      const response = this.props.isGetStudentRemark;
      if (response && response.success === 1) {
        const {results} = response;
        this.setState({results, isLoading: false});
      } else {
        //Alert.alert('', response.message);
        this.setState({results: null, isLoading: false});
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
      Linking.openURL(url);
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
