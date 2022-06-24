import * as types from './types';
import {combineReducers} from 'redux';
// admin attendance teacher / student
const getTeacherAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_ATTENDANCE_TEACHER:
      return action.payload;

    default:
      return state;
  }
};
const getStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_ATTENDANCE_STUDENT:
      return action.payload;

    default:
      return state;
  }
};
const getStudentAttendanceListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_ATTENDANCE_STUDENTS_LIST:
      return action.payload;

    default:
      return state;
  }
};
const updateAdminStudentAttendanceReducer = (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_ADMIN_STUDENTS_LIST:
      return action.payload;

    default:
      return state;
  }
};
const getAbsentStudentDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ABSENT_STUDENT_DATA:
      return action.payload;

    default:
      return state;
  }
};
// admin feesCollection
const getFeesCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_FEE_COLLECTION:
      return action.payload;

    default:
      return state;
  }
};
// admin DateSheet
const getAdminDateSheetReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_DATE_SHEET:
      return action.payload;

    default:
      return state;
  }
};

// library
const getLibraryDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_LIBRARY_DATA:
      return action.payload;

    default:
      return state;
  }
};

//time_table
const adminTeacherTimetableListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_TIME_TABLE_TEACHER_LIST:
      return action.payload;
    default:
      return state;
  }
};
const adminClassTimetableListReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_TIME_TABLE_STUDENT_LIST:
      return action.payload;
    default:
      return state;
  }
};
const adminTimeTableDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_TIME_TABLE_DETAIL_SCREEN:
      return action.payload;
    default:
      return state;
  }
};
// Homework
const adminGetHomeworkReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_HOMEWORK:
      return action.payload;
    default:
      return state;
  }
};
// feedbackQuestion
const getFeedbackDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SHOW_FEEDBACK:
      return action.payload;
    default:
      return state;
  }
};
const feedbackCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FEEDBACK_CATEGORY:
      return action.payload;
    default:
      return state;
  }
};
const handleFeedbackReducer = (state = {}, action) => {
  switch (action.type) {
    case types.HANDLE_FEEDBACK:
      return action.payload;
    default:
      return state;
  }
};
// school profile
const getSchoolProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SCHOOL_PROFILE:
      return action.payload;
    default:
      return state;
  }
};
// get School photo Gallery
const getPhotoGalleryReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_SCHOOL_PHOTOS:
      return action.payload;
    default:
      return state;
  }
};
// get teacher list data
const getTeacherListDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_TEACHER_LIST_DATA:
      return action.payload;
    default:
      return state;
  }
};
// StudentSummary
const getClassSectionDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_CLASS_SECTION_DATA:
      return action.payload;
    default:
      return state;
  }
};
const getClassWiseStudentDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_CLASSWISE_STUDENT:
      return action.payload;
    default:
      return state;
  }
};
const getSingleStudentProfileDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_SINGLE_STUDENT_DETAIL_PROFILE:
      return action.payload;
    default:
      return state;
  }
};
const getStudentFeesDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_STUDENT_FEES_DATA:
      return action.payload;
    default:
      return state;
  }
};
const getStudentPaidFeesDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ST_FEES_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
const getStudentRemarkReducer = (state = {}, action) => {
  switch (action.type) {
    case types.REPORT_STUDENT_DETAIL:
      return action.payload;
    default:
      return state;
  }
};
const getStudentAttendanceReportReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ATTENDANCE_STUDENT_DETAIL:
      return action.payload;
    default:
      return state;
  }
};
const getAdminLeadManagementReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_LEAD_MANAGEMENT:
      return action.payload;
    default:
      return state;
  }
};
const getAdminProspectusReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_PROSPECTUS_DETAIL:
      return action.payload;
    default:
      return state;
  }
};
const getAdminAdmissionDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_GET_ADMISSION_DETAIL:
      return action.payload;
    default:
      return state;
  }
};
const getFollowUpDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADMIN_GET_FOLLOWUP_DETAIL:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  getTeacherAttendance: getTeacherAttendanceReducer,
  getStudentAttendance: getStudentAttendanceReducer,
  getStudentAttendanceList: getStudentAttendanceListReducer,
  updateAdminStudentAttendance: updateAdminStudentAttendanceReducer,
  getAbsentStudentData: getAbsentStudentDataReducer,
  getFeesCollection: getFeesCollectionReducer,
  getAdminDateSheet: getAdminDateSheetReducer,
  getLibraryData: getLibraryDataReducer,
  adminTeacherTimetableList: adminTeacherTimetableListReducer,
  adminClassTimetableList: adminClassTimetableListReducer,
  adminTimeTableDetails: adminTimeTableDetailsReducer,
  adminGetHomework: adminGetHomeworkReducer,
  getFeedbackData: getFeedbackDataReducer,
  feedbackCategory: feedbackCategoryReducer,
  handleFeedback: handleFeedbackReducer,
  getSchoolProfile: getSchoolProfileReducer,
  getPhotoGallery: getPhotoGalleryReducer,
  getTeacherListData: getTeacherListDataReducer,
  getClassSectionData: getClassSectionDataReducer,
  getClassWiseStudentData: getClassWiseStudentDataReducer,
  getSingleStudentProfileData: getSingleStudentProfileDataReducer,
  getStudentFeesData: getStudentFeesDataReducer,
  getStudentPaidFeesDetail: getStudentPaidFeesDetailReducer,
  getStudentRemark: getStudentRemarkReducer,
  getStudentAttendanceReport: getStudentAttendanceReportReducer,
  getAdminLeadManagement: getAdminLeadManagementReducer,
  getAdminProspectus: getAdminProspectusReducer,
  getAdminAdmissionDetail: getAdminAdmissionDetailReducer,
  getFollowUpDetail: getFollowUpDetailReducer,
});

export default reducer;
