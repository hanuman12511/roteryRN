import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const EventCalendar = props => {
  const [leftArrow, setLeftArrow] = useState(false);
  const [rightArrow, setRightArrow] = useState(false);
  // Marking styles
  // const singleMarkingStyle = {
  // 	disabled: true,
  // 	startingDay: true,
  // 	endingDay: true,
  // }

  // const periodStartMarkingStyle = {
  // 	startingDay: true,
  // }

  // const periodEndMarkingStyle = {
  // 	selected: true,
  // 	endingDay: true,
  // }ss

  // Marking for event dates
  const events = props.events;
  let markedDatesObj = {};

  for (const event of events) {
    const {start, end, color} = event;

    // if (start === end) {
    markedDatesObj[start] = {
      // ...singleMarkingStyle,
      // color: color,

      customStyles: {
        container: {
          backgroundColor: color,
        },
        text: {
          color: '#fff',
        },
      },
    };
    // } else {
    // 	markedDatesObj[start] = {
    // 		...periodStartMarkingStyle,
    // 		color: color,
    // 	}

    // 	markedDatesObj[end] = {
    // 		...periodEndMarkingStyle,
    // 		color: color,
    // 	}
    // }
  }

  const handleMonthChange = date => {
    // calling API
    console.log(date);
    const {month, year} = date;
    const monthYear = `${month}-${year}`;
    var today = new Date();
    var currentYear = today.getFullYear();

    if (parseInt(month) === 4) {
      setLeftArrow(parseInt(month) === 4);
    } else {
      setLeftArrow(parseInt(month) === 4);
    }
    if (parseInt(month) >= 3 && parseInt(month) <= 3) {
      setRightArrow(true);
    } else {
      setRightArrow(false);
    }
    props.fetchCalendarEvents(monthYear);
  };

  const handleDayPress = date => {
    const {day, month, year, dateString} = date;
    const monthName = getMonthName(month);
    const eventDateObj = {
      day: day,
      month: monthName,
      year: year,
    };

    // Calling callback to show event description modal
    props.showEventDescriptionPopup(eventDateObj, dateString);
  };

  const getMonthName = month => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];

    return monthNames[month - 1];
  };

  const calendarTheme = {
    textSectionTitleColor: '#1ba2de',
    textDisabledColor: '#ccc',
    textSectionFontWeight: 'bold',
    textDayFontSize: wp(3),
    textMonthFontSize: wp(3.5),
    margin: 0,
    padding: 0,
  };
  const nwDate = new Date().getFullYear();
  var today = new Date();
  var currentDate =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  return (
    <Calendar
      // Initially visible month. Default = Date()
      current={Date()}
      // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
      minDate={`${nwDate}-01-01`}
      // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
      maxDate={currentDate}
      // Collection of dates that have to be colored in a special way. Default = {}
      markedDates={markedDatesObj}
      // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
      markingType={'custom'}
      theme={{
        ...calendarTheme,
        agendaDayTextColor: 'yellow',
        agendaDayNumColor: 'green',
        agendaTodayColor: 'red',
        agendaKnobColor: 'blue',
      }}
      // Do not show days of other months in month page. Default = false
      hideExtraDays={true}
      // Handler which gets executed when visible month changes in calendar. Default = undefined
      onMonthChange={handleMonthChange}
      // Handler which gets executed on day long press. Default = undefined
      onDayPress={handleDayPress}
      // // Handler which gets executed when press arrow icon left. It receive a callback can go back month
      // onPressArrowLeft={`2022 - 05 - 01`}
      // // Handler which gets executed when press arrow icon left. It receive a callback can go next month
      // onPressArrowRight={Date()}
      /** Disable left arrow */
      disableArrowLeft={leftArrow}
      /** Disable right arrow */
      disableArrowRight={rightArrow}
    />
  );
};

export default EventCalendar;
