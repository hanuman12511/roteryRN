import React, {Component} from 'react';
import {Text, View, StatusBar, FlatList} from 'react-native';
import {styles} from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import ScreenHeader from 'components/ScreenHeader';
import DGMessageListComponent from 'components/DGMessageListComponent';

// Icons
import ic_multi_student from 'assets/icons/ic_multi_student.png';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberData: [
        {
          messageTitle: 'DG Message Title',
          messageDescription:
            'What is Lorem Ipsum in English? Lorem Ipsum, sometimes referred to as, is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved.',
        },
        {
          messageTitle: 'DG Message Title',
          messageDescription:
            'What is Lorem Ipsum in English? Lorem Ipsum, sometimes referred to as, is the placeholder text used in design when creating content. It helps designers plan out where the content will sit, without needing to wait for the content to be written and approved.',
        },
      ],
    };
  }

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
