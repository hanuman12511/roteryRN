import React, {PureComponent} from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProcessingLoader from 'components/ProcessingLoader';
import CustomToast from 'components/CustomToast';
//redux
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';
class EditTemplatePopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      enableButton: true,
      isChatEnable: true,
      Balance: 0,
      userInfo: '',
      currency: '',
      acceptCall: false,
      response1: '',
      declineChat: false,
      callInfo: false,
      result: [],
    };
  }
  componentDidMount() {
    this.handleFollowUpdate();
  }

  handleFollowUpdate = async () => {
    try {
      const itemData = await this.props.item;
      console.log(itemData);
      await this.props.getFollowUpDetail(itemData.id);
      const response = this.props.isGetfollowupDetails;
      if (response && response.success === 1) {
        const {followup_details} = response;
        if (followup_details !== null) {
          this.setState({result: followup_details, isLoading: false});
        } else {
          CustomToast('No FollowUp Available');
          this.props.closePopup();
        }
      } else {
        CustomToast('No FollowUp Available');
        this.props.closePopup();
        this.setState({result: [], isLoading: false});
      }
    } catch (error) {
      console.log(error);
    }
  };

  setViewRef = ref => {
    this.parentView = ref;
  };

  handleStartShouldSetResponder = event => {
    if (this.parentView._nativeTag === event.target._nativeTag) {
      this.props.closePopup();
    }
  };

  handleApply = () => {
    this.props.closePopup();
  };

  handleCodeChange = vendorCode => {
    this.setState({vendorCode});
  };

  openNewPop = async () => {
    this.setState({showAllSetPopup: true});
  };

  handleAllSet = () => {
    // this.props.nav.navigate('AllSetPopup');
  };

  closeOldPop = () => {
    this.props.closePopup();
  };

  quitPopup = () => {
    this.setState({showAllSetPopup: false});
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

    return item.remark !== null ? (
      <View style={listStyle}>
        <View style={{flex: 1}}>
          <Text style={styles.listText2}>{item.followup_date}</Text>
          <Text style={styles.listText4}>{item.remark}</Text>
        </View>
      </View>
    ) : null;
  };
  itemSeparator = () => <View style={styles.separator} />;

  render() {
    if (this.state.isLoading) {
      return <ProcessingLoader />;
    }

    const listStyle = {
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      padding: wp(3),
      borderWidth: 1,
      borderColor: '#00000015',
      minHeight: hp(25),
      maxHeight: hp(60),
      width: wp(90),
      alignSelf: 'center',
      borderRadius: 10,
    };

    return (
      <SafeAreaView
        ref={this.setViewRef}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        style={{
          flex: 1,
          backgroundColor: '#00000080',
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}>
        <View style={listStyle}>
          <FlatList
            data={this.state.result}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.itemSeparator}
            contentContainerStyle={styles.listContentContainer}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isGetfollowupDetails: adminSelectors.isGetfollowupDetails(state),
});
const mapDispatchToProps = {
  getFollowUpDetail: adminOperations.getFollowUpDetail,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditTemplatePopup);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listText: {
    fontSize: wp(4),
    fontWeight: '700',
    marginBottom: wp(1),
  },
  listText2: {
    flex: 1,
    fontSize: wp(3),
    fontWeight: '500',
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
});
// import React, {Component} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Linking,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// // icons
// import ic_pdf_red from 'assets/icons/ic_pdf_red.png';
// import CustomLoader from 'components/CustomLoader';
// // API
// import {connect} from 'react-redux';
// import {adminOperations, adminSelectors} from 'idsStore/data/admin';

// class AdminResultComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLoading: false,
//       visitors: ['Hello', 'hello'],
//       currentDate: null,
//       status: null,
//       isListRefreshing: false,
//       results: [
//         {
//           name: 'Jd user',
//           mobile: 9829846786,
//           class: 'XII',
//           mode: 'Other',
//           remark: 'CBSE post card writing competition.',
//           followup_date: '20-12-2021',
//           enquiry_date: '14-12-2021',
//         },
//         {
//           name: 'Ashish',
//           mobile: 7988471193,
//           class: 'VI',
//           mode: 'Other',
//           remark: 'Not answering',
//           followup_date: '20-12-2021',
//           enquiry_date: '10-12-2021',
//         },
//       ],
//       addAssignmentButtonZIndex: 0,
//     };
//   }

//   componentDidMount() {
//     this.handleResultData();
//   }
//   handleResultData = async () => {
//     try {
//     } catch (error) {
//       console.log('error in handle result data', error);
//     }
//   };

//   renderItem = ({item}) => {
//     const listStyle = {
//       // borderLeftWidth: 3,
//       // backgroundColor: bg,
//       backgroundColor:
//         '#' +
//         (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) +
//         0x15,
//       // backgroundColor: '#fff',
//       borderRadius: 2,
//       // padding: wp(1),
//       flexDirection: 'row',
//       alignItems: 'flex-start',
//       alignItems: 'center',
//       padding: wp(3),
//       borderWidth: 1,
//       borderColor: '#00000015',
//     };

//     return (
//       <View style={listStyle}>
//         <View style={{flex: 1}}>
//           <Text style={styles.listText}>
//             {item.name} <Text style={styles.listText2}>({item.class})</Text>
//           </Text>
//           <View style={styles.listData}>
//             <Text style={styles.listText2}>Mobile </Text>
//             <Text style={styles.listText3}>-</Text>
//             <Text style={styles.listText4}>{item.mobile}</Text>
//           </View>
//           <View style={styles.listData}>
//             <Text style={styles.listText2}>Mode </Text>
//             <Text style={styles.listText3}>-</Text>
//             <Text style={styles.listText4}>{item.mode}</Text>
//           </View>
//           <View style={styles.listData}>
//             <Text style={styles.listText2}>FollowUp</Text>
//             <Text style={styles.listText3}>-</Text>
//             <Text style={styles.listText4}>{item.followup_date}</Text>
//           </View>
//           <View style={styles.listData}>
//             <Text style={styles.listText2}>Enquiry</Text>
//             <Text style={styles.listText3}>-</Text>
//             <Text style={styles.listText4}>{item.enquiry_date}</Text>
//           </View>

//           <Text style={styles.listText5}>{item.remark}</Text>
//         </View>
//       </View>
//     );
//   };
//   handleDownload = async value => {
//     try {
//       console.log(value);
//       const url = value.result_link;
//       const supported = await Linking.canOpenURL(url);
//       if (supported) {
//         Linking.openURL(url);
//       } else {
//         Linking.openURL(url);
//         // showToast('Unable to handle this url!');
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   keyExtractor = (item, index) => index.toString();

//   itemSeparator = () => <View style={styles.separator} />;

//   render() {
//     if (this.state.isLoading) {
//       return <CustomLoader />;
//     }
//     return (
//       <View style={styles.container}>
//         <FlatList
//           data={this.state.results}
//           renderItem={this.renderItem}
//           keyExtractor={this.keyExtractor}
//           showsVerticalScrollIndicator={false}
//           ItemSeparatorComponent={this.itemSeparator}
//           contentContainerStyle={styles.listContentContainer}
//         />
//       </View>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   isGetStudentRemark: adminSelectors.isGetStudentRemark(state),
// });
// const mapDispatchToProps = {
//   getStudentRemark: adminOperations.getStudentRemark,
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(AdminResultComponent);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   listText: {
//     flex: 1,
//     fontSize: wp(4),
//     fontWeight: '700',
//   },
//   listText2: {
//     flex: 1,
//     fontSize: wp(3),
//     fontWeight: '400',
//   },
//   listText3: {
//     paddingRight: wp(2),
//     fontSize: wp(3),
//     fontWeight: '400',
//   },
//   listText4: {
//     flex: 2,
//     fontSize: wp(3),
//     fontWeight: '400',
//   },
//   listText5: {
//     marginTop: wp(2),
//     fontSize: wp(3),
//     fontWeight: '400',
//   },
//   icon: {
//     height: wp(6),
//     aspectRatio: 1 / 1,
//   },
//   listContentContainer: {
//     padding: wp(2),
//   },
//   separator: {
//     height: wp(2),
//   },
//   listData: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });
