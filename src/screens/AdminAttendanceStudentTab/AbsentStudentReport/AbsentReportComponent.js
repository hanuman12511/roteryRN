import React, {Component} from 'react';
import {Image, View, Text, TouchableOpacity, Linking} from 'react-native';
import {styles} from '../styles';

// Components
import CustomLoader from 'components/CustomLoader';
import telephone_call from 'assets/icons/telephone-call.png';
class studentAbsent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: true,
    };
  }

  handleApply = () => {
    const {item} = this.props.item;
    Linking.openURL(`tel:${item.fatherMobile}`);
  };
  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <CustomLoader />;
    }
    const {item} = this.props.item;

    return (
      <View style={styles.abContainer}>
        <Text style={styles.stuName}>{item.name}</Text>
        <Text style={styles.gardionName}>s/o {item.fatherName}</Text>
        <TouchableOpacity onPress={this.handleApply} style={styles.callBox}>
          <Image source={telephone_call} style={styles.callBoxImage} />
          <Text style={styles.cellStyle}>{item.fatherMobile}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default studentAbsent;
