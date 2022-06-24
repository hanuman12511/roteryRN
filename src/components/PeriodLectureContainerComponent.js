import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components
import PeriodLectureListComponent from './PeriodLectureListComponent';

const PeriodLectureContainerComponent = props => {
  const renderPeriodLectureList = () => {
    let list = [];
    const {timeTableData, breakPosition} = props;

    // deleting key break from timeTable object
    delete timeTableData.break;

    for (const day in timeTableData) {
      list.push(
        <PeriodLectureListComponent
          periods={timeTableData[day]}
          breakPosition={breakPosition}
          key={day}
        />,
      );
    }

    return list;
  };

  return (
    <View style={styles.periodsContainer}>{renderPeriodLectureList()}</View>
  );
};

export default PeriodLectureContainerComponent;

const styles = StyleSheet.create({
  periodsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
