import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {NavigationActions} from 'react-navigation';

// Images
import profile_image from 'assets/images/profile_image.png';

// User Preference
import {setActiveStudent} from 'api/UserPreference';

const StudentListItem = props => {
  const onListItemClick = async () => {
    try {
      // Setting active student
      const activeStudent = {
        id: props.item.id,
      };
      await setActiveStudent(activeStudent);

      // Dispatching action
      const setParamsAction = NavigationActions.setParams({
        params: {studentInfo: props.item},
        key: 'Profile',
      });
      props.navigation.dispatch(setParamsAction);

      // Navigating
      props.navigation.navigate('StudentDrawer');
    } catch (error) {
      const errMessage = error.message;
      console.log(errMessage);
    }
  };

  const getStudentImage = () => {
    const {image} = props.item;
    return image ? {uri: image} : profile_image;
  };

  const getStudentFullName = () => {
    const {fname, middlename, lname} = props.item;

    let fullName = fname;
    middlename && (fullName += ' ' + middlename);
    lname && (fullName += ' ' + lname);
    return fullName;
  };

  return (
    <TouchableHighlight onPress={onListItemClick} underlayColor="transparent">
      <View style={styles.container}>
        <Image
          source={getStudentImage()}
          resizeMode="cover"
          style={styles.studentPhoto}
        />
        <Text style={styles.enrollNumber}>{props.item.enroll_no}</Text>
        <Text style={styles.studentName}>{getStudentFullName()}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default StudentListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: hp(7),
    paddingHorizontal: wp(2),
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  studentPhoto: {
    width: hp(5.5),
    height: hp(5.5),
    borderRadius: hp(4),
  },
  enrollNumber: {
    color: '#1B9CFC',
    fontSize: wp(3),
    fontWeight: '500',
    marginLeft: wp(3),
    marginHorizontal: wp(2),
  },
  studentName: {
    flex: 1,
    color: '#333',
    fontSize: wp(3),
    fontWeight: '500',
    marginLeft: wp(3),
  },
});
