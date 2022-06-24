import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {styles} from '../styles';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Cell,
} from 'react-native-table-component';

// Components
import CustomLoader from 'components/CustomLoader';
import ScreenHeader from 'components/ScreenHeader';
import ic_back from 'assets/icons/ic_back.png';
import AbsentReportComponent from './AbsentReportComponent';

// API
import {connect} from 'react-redux';
import {adminOperations, adminSelectors} from 'idsStore/data/admin';

class studentAbsent extends Component {
  constructor(props) {
    super(props);
    const data = props.navigation.getParam('data');
    this.classId = data[4];
    this.sectionId = data[5];
    this.state = {
      isLoading: true,
      isListRefreshing: false,
      absentData: null,
    };
  }

  componentDidMount() {
    this.getAbsentData();
    this._script = this.props.navigation.addListener('didFocus', () => {});
  }
  componentWillUnmount() {
    this._script.remove();
  }
  getAbsentData = async () => {
    try {
      await this.props.getAbsentStudentData(this.classId, this.sectionId);
      const response = this.props.isGetAbsentStudentData;
      if (response) {
        if (response.success === 1) {
          const {attendanceDetails} = response;
          this.setState({
            absentData: attendanceDetails,
            isLoading: false,
            isListRefreshing: false,
          });
        } else {
          this.setState({
            absentData: null,
            isLoading: false,
            isListRefreshing: false,
          });
        }
      } else {
        //Alert.alert('', response.message);
        this.setState({
          absentData: null,
          isLoading: false,
          isListRefreshing: false,
        });
      }
    } catch (error) {
      Alert.alert('', error);
      console.log('error on getting data', error);
    }
  };
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      await this.getAbsentData();
    } catch (error) {
      console.log(error.message);
    }
  };
  renderItem = ({item}) => (
    <AbsentReportComponent item={{item}} nav={this.props.navigation} />
  );

  render() {
    const {isLoading, absentData} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }
    console.log(this.classId, this.sectionId);
    return (
      <SafeAreaView style={styles.container}>
        <ScreenHeader
          title="Student Absent Report"
          backIcon={ic_back}
          showSchoolLogo
          nav={this.props.navigation}
        />
        <View>
          <FlatList
            data={absentData}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            ItemSeparatorComponent={this.itemSeparator}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContentContainer}
            refreshing={this.state.isListRefreshing}
            onRefresh={this.handleListRefresh}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isGetAbsentStudentData: adminSelectors.isGetAbsentStudentData(state),
});
const mapDispatchToProps = {
  getAbsentStudentData: adminOperations.getAbsentStudentData,
};

export default connect(mapStateToProps, mapDispatchToProps)(studentAbsent);
