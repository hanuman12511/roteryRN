import * as types from './types';
// STUDENT_INFO
export const getStudentInfo = payload => ({
  type: types.STUDENT_INFO,
  payload,
});
// ATTENDANCE_DETAILS
export const getAttendanceDetail = payload => ({
  type: types.GET_ATTENDANCE_DETAIL,
  payload,
});
// TIMETABLE
export const getTimeTable = payload => ({
  type: types.GET_TIME_TABLE,
  payload,
});
// FEEDBACK
export const viewFeedback = payload => ({
  type: types.VIEW_FEEDBACK,
  payload,
});
export const viewFeedbackCategories = payload => ({
  type: types.VIEW_FEEDBACK_CATEGORIES,
  payload,
});
export const submitFeedback = payload => ({
  type: types.SUBMIT_FEEDBACK,
  payload,
});
// FEE
export const studentFeeDetail = payload => ({
  type: types.GET_STUDENT_FEES_DETAIL,
  payload,
});
// ASSIGNMENT
export const getStudentAssignment = payload => ({
  type: types.GET_STUDENT_ASSIGNMENT,
  payload,
});
//result
export const getResult = payload => ({
  type: types.GET_RESULT,
  payload,
});
// LIBRARY
export const getIssuedBook = payload => ({
  type: types.GET_LIBRARY,
  payload,
});
export const getRequestBookList = payload => ({
  type: types.GET_BOOK_REQUEST_LIST,
  payload,
});
export const cancelRequestBookList = payload => ({
  type: types.CANCEL_BOOK_REQUEST_LIST,
  payload,
});
export const getBookCategories = payload => ({
  type: types.GET_BOOK_CATEGORIES,
  payload,
});
export const getBookInLibrary = payload => ({
  type: types.SEARCH_BOOKS_LIBRARY,
  payload,
});
export const requestBookLibrary = payload => ({
  type: types.REQUEST_BOOKS_LIBRARY,
  payload,
});
//calender
export const getCalendarEvents = payload => ({
  type: types.GET_CALENDAR_EVENTS,
  payload,
});
export const getCalendarEventType = payload => ({
  type: types.GET_CALENDAR_EVENTS_TYPE,
  payload,
});
// date Sheet
export const getDateSheet = payload => ({
  type: types.GET_DATE_SHEET,
  payload,
});
// gate_pass
export const getGatePass = payload => ({
  type: types.GET_GATE_PASS,
  payload,
});
