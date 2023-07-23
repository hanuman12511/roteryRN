import React, {Component} from 'react';
import {Text, View, StatusBar, FlatList} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import DGMessageListComponent from 'components/DGMessageListComponent';

// Icons
import ic_multi_student from 'assets/icons/ic_multi_student.png';

import {getDGMessageData} from 'api/UserPreference';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberData: [],
    };
  }

  componentDidMount() {
    this.getingDG_Message();
  }

  getingDG_Message = async () => {
    try {
      const getData = await getDGMessageData();
      console.log(getData);
      getData.map(data => {
        this.setState({memberData: data});
      });
    } catch (error) {
      console.log('error message', error);
    }
  };

  renderItem = ({item}) => (
    <DGMessageListComponent item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#02abe3" barStyle="light-content" />
        <ScreenHeader
          title="DG Message"
          studentListIcon={ic_multi_student}
          showSchoolLogo
          nav={navigation}
        />
        <FlatList
          data={this.state.memberData}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.itemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
          refreshing={this.state.isListRefreshing}
          onRefresh={this.handleListRefresh}
        />
      </SafeAreaView>
    );
  }
}
