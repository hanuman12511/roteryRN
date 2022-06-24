// var attendanceData = {
//   Janauary: {
//     present: 0,
//     absent: 0,
//   },

//   February: {
//     present: 0,
//     absent: 0,
//   },
// };

// var data = Object.keys(attendanceData);

// data.map(key => {
//   return data[key];
// });
// var data2 = Object.values(attendanceData);
// var data3 = Object.values(attendanceData).length;
// console.log(data, '\n', data2, '\n', data3);
let inputTime = '01:07';
var Hours = inputTime.split(':')[0];
var Minutes = inputTime.split(':')[1];

var nTime = Hours + `.` + Minutes;
let timeValue = '07:00:00 AM';
let nTimeInterval = '17:00:00 PM';
var sHours = timeValue.split(':')[0];
var sMinutes = nTimeInterval.split(':')[0];
console.log(sHours, sMinutes, nTime);
if (nTime >= sHours && nTime < sMinutes) {
  console.log(sHours, sMinutes, nTime);
}
// else if (parseInt(sHours) === 0) sHours = '00';
// else if (sHours < 10) sHours = '0' + sHours;

// if (sMinutes == '' || isNaN(sMinutes) || parseInt(sMinutes) > 59) {
//   console.log('Invalid Time format');
// } else if (parseInt(sMinutes) == 0) sMinutes = '00';
// else if (sMinutes < 10) sMinutes = '0' + sMinutes;
