import {View, Text, FlatList, StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  listHeader: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: '#f2f1f1',
    alignItems: 'center',
  },
  listHeaderItem1: {
    width: '25%',
    color: '#1ba2de',
    fontWeight: 'bold',
  },
  listHeaderItem2: {
    width: '25%',
    color: '#1ba2de',
    fontWeight: 'bold',
  },
  listHeaderItem3: {
    width: '50%',
    color: '#1ba2de',
    fontWeight: 'bold',
  },
  separator: {
    height: 8,
  },
  contentContainer: {
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
