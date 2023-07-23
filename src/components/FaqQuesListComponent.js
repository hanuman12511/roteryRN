import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_faq from 'assets/icons/gallery.png';

class FaqTIleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {isVisible: false};
  }

  handleQuestions = visible => {
    const answer = this.props.item.answear;
    console.log(this.props.item.questions[0].answear);
    this.setState({isVisible: visible});
    // this.props.nav.navigate('FAQ Answer', {answer});
  };

  render() {
    const {isVisible} = this.state;
    return (
      <>
        <TouchableOpacity
          style={styles.tile}
          onPress={() => this.handleQuestions(!isVisible)}>
          <View style={styles.questionTile}>
            <Image source={ic_faq} resizeMode="cover" style={styles.tileIcon} />
            <Text style={styles.title}>
              {this.props.item.questions[0].question}
            </Text>
          </View>
        </TouchableOpacity>
        {isVisible && (
          <ScrollView style={styles.answearTile}>
            <Text style={styles.answearTitle}>
              {this.props.item.questions[0].answear}
            </Text>
          </ScrollView>
        )}
      </>
    );
  }
}

export default FaqTIleComponent;
const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#fff',
    flex: 1,
    margin: wp(1.5),
    marginVertical: wp(1),
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    shadowColor: '#0006',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  tileIcon: {
    width: wp(6),
    marginRight: wp(3),
    aspectRatio: 1 / 1,
  },
  title: {
    flex: 1,
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#444',
  },
  answearTitle: {
    textAlign: 'auto',
    padding: wp(1),
    fontSize: wp(3.2),
    fontWeight: '700',
    color: '#666',
  },
  questionTile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answearTile: {
    shadowColor: '#0006',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderRadius: 5,
    marginTop: wp(3.5),
    backgroundColor: '#fff',
  },
});
