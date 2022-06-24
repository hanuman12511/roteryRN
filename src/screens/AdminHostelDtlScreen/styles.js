import {View, Text, StyleSheet, Image} from 'react-native';

// Components
import ScreenHeader from '../../components/ScreenHeader';
import ScreenFooter from '../../components/ScreenFooter';
import DetailListComponent from '../../components/DetailListComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1ba2de',
    width: '100%',
  },

  transportScreenSection: {flex: 1, backgroundColor: '#fff'},
  transportImg: {height: 170},
});
