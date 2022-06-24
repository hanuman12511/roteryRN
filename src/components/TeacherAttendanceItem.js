import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import DetailListComponent from 'components/DetailListComponent';

const TeacherAttendanceItem = props => {
  const onTakeAttendancePress = () => {
    const {setNextScreenPushed, refreshAttendancePanel, item, navigation} =
      props;

    // navigating to next screen
    navigation.push('TakeAttendance', {
      classId: item.classId,
      sectionId: item.sectionId,
      refreshAttendancePanel,
    });

    // setting screen pushed
    setNextScreenPushed();
  };

  const {canTakeAttendance, item} = props;
  const {infoArr} = item;
  const present = infoArr[infoArr.length - 2];
  const absent = infoArr[infoArr.length - 1];
  const isAttendanceNotTaken = present === 0 && absent === 0;

  const buttonName = canTakeAttendance
    ? 'Take Attendance'
    : isAttendanceNotTaken
    ? 'Attendance Not Taken'
    : 'View Absent';

  let buttonAction = onTakeAttendancePress;
  if (buttonName === 'Attendance Not Taken') {
    buttonAction = null;
  }
  
  return (
    <View style={styles.container}>
      <DetailListComponent
        titleArr={props.titleArr}
        infoArr={props.item.infoArr}
        skipContainerStyle={true}
      />

      <TouchableHighlight
        onPress={buttonAction}
        underlayColor={'#1ba2de80'}
        style={styles.totalAbsentBtn}>
        <Text style={styles.totalAbsentBtnText}>{buttonName}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default TeacherAttendanceItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    backgroundColor: '#fff',
    borderLeftWidth: 3,
    borderLeftColor: '#1ba2de',
  },
  totalAbsentBtn: {
    height: hp(6),
    margin: wp(2),
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1ba2de',
  },
  totalAbsentBtnText: {
    color: '#fff',
    fontSize: wp(4),
  },
});
