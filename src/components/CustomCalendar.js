import React, {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CustomCalendar = props => {
  const [leftArrow, setLeftArrow] = useState(false);
  const [rightArrow, setRightArrow] = useState(false);
  const presentDates = props.presentDates;
  const absentDates = props.absentDates;
  const holidayDates = props.holidayDates;

  let markedDatesObj = {};

  const presentMarkingStyle = {
    customStyles: {
      container: {
        backgroundColor: '#1ba2de',
      },
      text: {
        color: '#fff',
      },
    },
  };

  const absentMarkingStyle = {
    customStyles: {
      container: {
        backgroundColor: '#d2434e',
      },
      text: {
        color: '#fff',
      },
    },
  };

  const holidayMarkingStyle = {
    customStyles: {
      container: {
        backgroundColor: '#e28e00',
      },
      text: {
        color: '#fff',
      },
    },
  };

  // Marking for present dates
  for (const date of presentDates) {
    markedDatesObj[date] = presentMarkingStyle;
  }

  // Marking for absent dates
  for (const date of absentDates) {
    markedDatesObj[date] = absentMarkingStyle;
  }

  // Marking for holiday dates
  for (const date of holidayDates) {
    markedDatesObj[date] = holidayMarkingStyle;
  }

  // Parsing received sessionStart/visible/current date strings
  const sessionStartDateStr = props.sessionStartDate;
  const sessionStartDate = new Date(sessionStartDateStr);

  const visibleDateStr = props.visibleDate;
  const visibleDate = new Date(visibleDateStr);

  const currentDateStr = props.currentDate;
  const currentDate = new Date(currentDateStr);

  const changeDateMonth = (date, changeFactor) => {
    date.setMonth(date.getMonth() + changeFactor);
    return date;
  };

  const shouldChangeMonth = date => {
    const startDate = new Date(
      sessionStartDate.getFullYear(),
      sessionStartDate.getMonth(),
    );
    console.log('start Date', startDate);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth());
    const dateToCheck = new Date(date.getFullYear(), date.getMonth());
    console.log('endDate', endDate, 'dateToCheck', dateToCheck);
    if (dateToCheck >= startDate && dateToCheck <= endDate) {
      return true;
    }

    return false;
  };

  const handlePressArrowLeft = subtractMonth => {
    const newVisibleDate = changeDateMonth(visibleDate, -1);

    if (shouldChangeMonth(newVisibleDate)) {
      console.log(shouldChangeMonth(newVisibleDate));
      // setLeftArrow(shouldChangeMonth(newVisibleDate));
      subtractMonth();
    } else {
      // setLeftArrow(shouldChangeMonth(newVisibleDate));
      console.log(shouldChangeMonth(newVisibleDate));
      props.reloadComponent();
    }
  };

  const handlePressArrowRight = addMonth => {
    const newVisibleDate = changeDateMonth(visibleDate, 1);
    console.log(addMonth);
    if (shouldChangeMonth(newVisibleDate)) {
      console.log(shouldChangeMonth(newVisibleDate));
      // setRightArrow(shouldChangeMonth(newVisibleDate));
      addMonth();
    } else {
      // setRightArrow(shouldChangeMonth(newVisibleDate));
      console.log(shouldChangeMonth(newVisibleDate));
      props.reloadComponent();
    }
  };

  const handleMonthChange = date => {
    // calling API
    const {month, year} = date;
    const yearMonth = `${year}-${month}`;
    props.fetchAttendanceDetail(yearMonth);
  };

  const calendarTheme = {
    textSectionTitleColor: '#1ba2de',
    textDisabledColor: '#ccc',
    textSectionFontWeight: 'bold',
    textDayFontSize: wp(3),
    textMonthFontSize: wp(4),
    margin: 0,
    padding: 0,
  };
  const nwDate = new Date().getFullYear();
  var today = new Date();
  var cur_Date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  return (
    <Calendar
      markedDates={markedDatesObj}
      minDate={`${nwDate}-01-01`}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={cur_Date}
      markingType={'custom'}
      theme={calendarTheme}
      hideExtraDays={true}
      // onPressArrow Left/Right not working properly
      onPressArrowLeft={handlePressArrowLeft}
      onPressArrowRight={handlePressArrowRight}
      onMonthChange={handleMonthChange}
      /** Disable left arrow */
      disableArrowLeft={leftArrow}
      /** Disable right arrow */
      disableArrowRight={rightArrow}
    />
  );
};

export default CustomCalendar;
