export const isUserInfoGet = state => {
  return state.student.getStudentInfo;
};
export const isGetAttendanceDetail = state => {
  return state.student.getAttendanceDetail;
};
export const isGetTimeTable = state => {
  return state.student.getTimeTable;
};
export const isViewFeedback = state => {
  return state.student.viewFeedback;
};
export const isViewFeedbackCategories = state => {
  return state.student.viewFeedbackCategories;
};
export const isSubmitFeedback = state => {
  return state.student.submitFeedback;
};
export const isStudentFeeDetail = state => {
  return state.student.studentFeeDetail;
};
export const isGetStudentAssignment = state => {
  return state.student.getStudentAssignment;
};
export const isGetResult = state => {
  return state.student.getResult;
};
export const isGetIssuedBook = state => {
  return state.student.getIssuedBook;
};
export const isGetRequestBookList = state => {
  return state.student.getRequestBookList;
};
export const isCancelRequestBookList = state => {
  return state.student.cancelRequestBookList;
};
export const isGetBookCategories = state => {
  return state.student.getBookCategories;
};
export const isGetBookInLibrary = state => {
  return state.student.getBookInLibrary;
};
export const isRequestBookLibrary = state => {
  return state.student.requestBookLibrary;
};
export const isGetCalendarEvents = state => {
  return state.student.getCalendarEvents;
};
export const isGetCalendarEventType = state => {
  return state.student.getCalendarEventType;
};
export const isGetDateSheet = state => {
  return state.student.getDateSheet;
};
export const isGetGatePass = state => {
  return state.student.getGatePass;
};
