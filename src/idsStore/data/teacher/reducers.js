import * as types from './types';
import {combineReducers} from 'redux';
// teacher_info
const getTeacherInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case types.TEACHER_INFO:
      return action.payload;

    default:
      return state;
  }
};
// update Profile Photo
const updateProfilePhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_PROFILE_PHOTO:
      return action.payload;

    default:
      return state;
  }
};
// teacher class list
const getTeacherClassListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_TEACHER_CLASS_LIST:
      return action.payload;
    default:
      return state;
  }
};
const getSectionDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_SECTION_DETAILS:
      return action.payload;
    default:
      return state;
  }
};

// take student photos
const getStudentListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_STUDENT_LIST:
      return action.payload;
    default:
      return state;
  }
};
const studentUploadImageReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPLOAD_STUDENT_IMAGE:
      return action.payload;
    default:
      return state;
  }
};

// teacher dateSheet
const getDateSheetReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_TEACHER_DATE_SHEET:
      return action.payload;

    default:
      return state;
  }
};
// library
const getIssuedBooksReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_LIBRARY_DATA:
      return action.payload;

    default:
      return state;
  }
};
// attendance
const getStudentAttendancePanelReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ATTENDANCE_DATA:
      return action.payload;

    default:
      return state;
  }
};
const getStudentAttendanceListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_STUDENT_ATTENDANCE_LIST:
      return action.payload;

    default:
      return state;
  }
};
const updateStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_STUDENT_ATTENDANCE:
      return action.payload;

    default:
      return state;
  }
};
// ASSIGNMENT_DATA
const getAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ASSIGNMENT:
      return action.payload;

    default:
      return state;
  }
};
const getTeacherClassDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_TEACHER_CLASS_DETAILS:
      return action.payload;

    default:
      return state;
  }
};
const getSubjectDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_SUBJECT_DETAILS:
      return action.payload;

    default:
      return state;
  }
};
const addAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_ASSIGNMENT:
      return action.payload;

    default:
      return state;
  }
};
const deleteAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.DELETE_ASSIGNMENT:
      return action.payload;

    default:
      return state;
  }
};
const assignAssignmentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ASSIGN_ASSIGNMENT:
      return action.payload;

    default:
      return state;
  }
};

const reducer = combineReducers({
  getTeacherInfo: getTeacherInfoReducer,
  updateProfilePhoto: updateProfilePhotoReducer,
  getTeacherClassList: getTeacherClassListReducer,
  getSectionDetails: getSectionDetailsReducer,
  getDateSheet: getDateSheetReducer,
  getIssuedBooks: getIssuedBooksReducer,
  getStudentAttendancePanel: getStudentAttendancePanelReducer,
  getStudentAttendanceList: getStudentAttendanceListReducer,
  updateStudentAttendance: updateStudentAttendanceReducer,
  getAssignment: getAssignmentReducer,
  getTeacherClassDetails: getTeacherClassDetailsReducer,
  getSubjectDetails: getSubjectDetailsReducer,
  addAssignment: addAssignmentReducer,
  deleteAssignment: deleteAssignmentReducer,
  assignAssignment: assignAssignmentReducer,
  getStudentList: getStudentListReducer,
  studentUploadImage: studentUploadImageReducer,
});

export default reducer;
