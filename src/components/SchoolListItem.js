import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// User Preference
import {setActiveSchool} from 'api/UserPreference';

const SchoolListItem = props => {
  const {item, navigation} = props;
  const {idsprimeID, school_name, logo, userdetail} = item;

  const onListItemClick = async () => {
    try {
      // setting active school
      await setActiveSchool(item);

      // navigating
      navigation.push('StudentList');
    } catch (error) {
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  return (
    <TouchableHighlight onPress={onListItemClick} underlayColor="transparent">
      <View style={styles.container}>
        <View style={styles.schoolListLogoContainer}>
          <Image
            source={{uri: logo}}
            resizeMode="cover"
            style={styles.studentPhoto}
          />
        </View>
        <Text style={styles.studentName}>{school_name}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default SchoolListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(10),
    paddingHorizontal: wp(2),
    backgroundColor: '#fff',
    borderRadius: 2,
  },

  schoolListLogoContainer: {
    flexDirection: 'column',
  },

  studentPhoto: {
    width: wp(16),
    aspectRatio: 2 / 1,
  },
  studentName: {
    flex: 1,
    color: '#333',
    fontSize: wp(3),
    fontWeight: '500',
    marginLeft: wp(3),
  },
});
