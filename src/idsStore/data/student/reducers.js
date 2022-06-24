import * as types from './types';
import {combineReducers} from 'redux';
// STUDENT_INFO
const getStudentInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case types.STUDENT_INFO:
      return action.payload;

    default:
      return state;
  }
};
// ATTENDANCE_DETAILS
const getAttendanceDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ATTENDANCE_DETAIL:
      return action.payload;

    default:
      return state;
  }
};
// TIMETABLE
const getTimeTableReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_TIME_TABLE:
      return action.payload;

    default:
      return state;
  }
};
// FEEDBACK
const viewFeedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case types.VIEW_FEEDBACK:
      return action.payload;

    default:
      return state;
  }
};
const viewFeedbackCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.VIEW_FEEDBACK_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
const submitFeedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SUBMIT_FEEDBACK:
      return action.payload;

    default:
      return state;
  }
};
// FEE
const studentFeeDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_STUDENT_FEES_DETAIL:
      return action.payload;

    default:
      return state;
  }
};
// ASSIGNMENT
const getStudentAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_STUDENT_ASSIGNMENT:
      return action.payload;

    default:
      return state;
  }
};
//result
const getResultReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_RESULT:
      return action.payload;

    default:
      return state;
  }
};
// LIBRARY
const getIssuedBookReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_LIBRARY:
      return action.payload;

    default:
      return state;
  }
};
const getRequestBookListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_BOOK_REQUEST_LIST:
      return action.payload;

    default:
      return state;
  }
};
const cancelRequestBookListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CANCEL_BOOK_REQUEST_LIST:
      return action.payload;

    default:
      return state;
  }
};
const getBookCategoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_BOOK_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
const getBookInLibraryReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SEARCH_BOOKS_LIBRARY:
      return action.payload;

    default:
      return state;
  }
};
const requestBookLibraryReducer = (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_BOOKS_LIBRARY:
      return action.payload;

    default:
      return state;
  }
};
//calender
const getCalendarEventsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_CALENDAR_EVENTS:
      return action.payload;

    default:
      return state;
  }
};
const getCalendarEventTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_CALENDAR_EVENTS_TYPE:
      return action.payload;

    default:
      return state;
  }
};
// date_sheet
const getDateSheetReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_DATE_SHEET:
      return action.payload;

    default:
      return state;
  }
};
// gate_Pass
const getGatePassReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_GATE_PASS:
      return action.payload;

    default:
      return state;
  }
};

const reducer = combineReducers({
  getStudentInfo: getStudentInfoReducer,
  getAttendanceDetail: getAttendanceDetailReducer,
  getTimeTable: getTimeTableReducer,
  viewFeedback: viewFeedbackReducer,
  viewFeedbackCategories: viewFeedbackCategoriesReducer,
  submitFeedback: submitFeedbackReducer,
  studentFeeDetail: studentFeeDetailReducer,
  getStudentAssignment: getStudentAssignmentReducer,
  getResult: getResultReducer,
  getIssuedBook: getIssuedBookReducer,
  getRequestBookList: getRequestBookListReducer,
  cancelRequestBookList: cancelRequestBookListReducer,
  getBookCategories: getBookCategoriesReducer,
  getBookInLibrary: getBookInLibraryReducer,
  requestBookLibrary: requestBookLibraryReducer,
  getCalendarEvents: getCalendarEventsReducer,
  getCalendarEventType: getCalendarEventTypeReducer,
  getDateSheet: getDateSheetReducer,
  getGatePass: getGatePassReducer,
});

export default reducer;
