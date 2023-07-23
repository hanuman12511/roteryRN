import * as types from './types';

// teacher_info
export const getTeacherInfo = payload => ({
  type: types.TEACHER_INFO,
  payload,
});

// update profile photo
export const updateProfilePhoto = payload => ({
  type: types.UPDATE_PROFILE_PHOTO,
  payload,
});

// teacher class list
export const getTeacherClassList = payload => ({
  type: types.GET_TEACHER_CLASS_LIST,
  payload,
});
export const getSectionDetails = payload => ({
  type: types.GET_SECTION_DETAILS,
  payload,
});

// take student photos
export const getStudentList = payload => ({
  type: types.GET_STUDENT_LIST,
  payload,
});
// take student photos
export const studentUploadImage = payload => ({
  type: types.UPLOAD_STUDENT_IMAGE,
  payload,
});

// teacher dateSheet
export const getDateSheet = payload => ({
  type: types.GET_TEACHER_DATE_SHEET,
  payload,
});
// library
export const getIssuedBooks = payload => ({
  type: types.GET_LIBRARY_DATA,
  payload,
});
// attendance
export const getStudentAttendancePanel = payload => ({
  type: types.GET_ATTENDANCE_DATA,
  payload,
});
export const getStudentAttendanceList = payload => ({
  type: types.GET_STUDENT_ATTENDANCE_LIST,
  payload,
});
export const updateStudentAttendance = payload => ({
  type: types.UPDATE_STUDENT_ATTENDANCE,
  payload,
});
// ASSIGNMENT_DATA
export const getAssignment = payload => ({
  type: types.GET_ASSIGNMENT,
  payload,
});
export const getTeacherClassDetails = payload => ({
  type: types.GET_TEACHER_CLASS_DETAILS,
  payload,
});
export const getSubjectDetails = payload => ({
  type: types.GET_SUBJECT_DETAILS,
  payload,
});
export const addAssignment = payload => ({
  type: types.ADD_ASSIGNMENT,
  payload,
});
export const deleteAssignment = payload => ({
  type: types.DELETE_ASSIGNMENT,
  payload,
});
export const assignAssignment = payload => ({
  type: types.ASSIGN_ASSIGNMENT,
  payload,
});
