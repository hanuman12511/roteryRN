import * as types from './types';
// admin attendance teacher / student
export const getTeacherAttendance = payload => ({
  type: types.ADMIN_ATTENDANCE_TEACHER,
  payload,
});
export const getStudentAttendance = payload => ({
  type: types.ADMIN_ATTENDANCE_STUDENT,
  payload,
});
export const getStudentAttendanceList = payload => ({
  type: types.ADMIN_ATTENDANCE_STUDENTS_LIST,
  payload,
});
export const updateAdminStudentAttendance = payload => ({
  type: types.UPDATE_ADMIN_STUDENTS_LIST,
  payload,
});
export const getAbsentStudentData = payload => ({
  type: types.GET_ABSENT_STUDENT_DATA,
  payload,
});
// admin feesCollection
export const getFeesCollection = payload => ({
  type: types.ADMIN_FEE_COLLECTION,
  payload,
});
// admin Date Sheet
export const getAdminDateSheet = payload => ({
  type: types.ADMIN_DATE_SHEET,
  payload,
});
//LIBRARY
export const getLibraryData = payload => ({
  type: types.ADMIN_LIBRARY_DATA,
  payload,
});
// time_table
export const adminTeacherTimetableList = payload => ({
  type: types.ADMIN_TIME_TABLE_TEACHER_LIST,
  payload,
});
export const adminClassTimetableList = payload => ({
  type: types.ADMIN_TIME_TABLE_STUDENT_LIST,
  payload,
});
export const adminTimeTableDetails = payload => ({
  type: types.ADMIN_TIME_TABLE_DETAIL_SCREEN,
  payload,
});
// homework
export const adminGetHomework = payload => ({
  type: types.ADMIN_HOMEWORK,
  payload,
});
// feedback
export const getFeedbackData = payload => ({
  type: types.SHOW_FEEDBACK,
  payload,
});
export const feedbackCategory = payload => ({
  type: types.FEEDBACK_CATEGORY,
  payload,
});
export const handleFeedback = payload => ({
  type: types.HANDLE_FEEDBACK,
  payload,
});
// school profile
export const getSchoolProfile = payload => ({
  type: types.SCHOOL_PROFILE,
  payload,
});
// photo galleryImages
export const getPhotoGallery = payload => ({
  type: types.GET_SCHOOL_PHOTOS,
  payload,
});
// teacher list data
export const getTeacherListData = payload => ({
  type: types.GET_TEACHER_LIST_DATA,
  payload,
});
// StudentSummary
export const getClassSectionData = payload => ({
  type: types.GET_CLASS_SECTION_DATA,
  payload,
});
export const getClassWiseStudentData = payload => ({
  type: types.GET_CLASSWISE_STUDENT,
  payload,
});
export const getSingleStudentProfileData = payload => ({
  type: types.GET_SINGLE_STUDENT_DETAIL_PROFILE,
  payload,
});
export const getStudentFeesData = payload => ({
  type: types.GET_STUDENT_FEES_DATA,
  payload,
});
export const getStudentPaidFeesDetail = payload => ({
  type: types.GET_ST_FEES_DETAILS,
  payload,
});
export const getStudentRemark = payload => ({
  type: types.REPORT_STUDENT_DETAIL,
  payload,
});
export const getStudentAttendanceReport = payload => ({
  type: types.ATTENDANCE_STUDENT_DETAIL,
  payload,
});
export const getAdminLeadManagement = payload => ({
  type: types.ADMIN_LEAD_MANAGEMENT,
  payload,
});
export const getAdminProspectus = payload => ({
  type: types.ADMIN_PROSPECTUS_DETAIL,
  payload,
});
export const getAdminAdmissionDetail = payload => ({
  type: types.ADMIN_GET_ADMISSION_DETAIL,
  payload,
});
export const getFollowUpDetail = payload => ({
  type: types.ADMIN_GET_FOLLOWUP_DETAIL,
  payload,
});
