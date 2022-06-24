export const isGetTeacherInfo = state => {
  return state.teacher.getTeacherInfo;
};
export const isUpdateProfilePhoto = state => {
  return state.teacher.updateProfilePhoto;
};

export const isGetTeacherClassList = state => {
  return state.teacher.getTeacherClassList;
};
export const isGetSectionDetails = state => {
  return state.teacher.getSectionDetails;
};

// TEACHER_DATESHEET
export const isGetDateSheet = state => {
  return state.teacher.getDateSheet;
};
// Library
export const isGetIssuedBooks = state => {
  return state.teacher.getIssuedBooks;
};
// attendance
export const isGetStudentAttendancePanel = state => {
  return state.teacher.getStudentAttendancePanel;
};
export const isGetStudentAttendanceList = state => {
  return state.teacher.getStudentAttendanceList;
};
export const isUpdateStudentAttendance = state => {
  return state.teacher.updateStudentAttendance;
};
// assignment
export const isGetAssignment = state => {
  return state.teacher.getAssignment;
};
export const isGetTeacherClassDetails = state => {
  return state.teacher.getTeacherClassDetails;
};
export const isGetSubjectDetails = state => {
  return state.teacher.getSubjectDetails;
};
export const isAddAssignment = state => {
  return state.teacher.addAssignment;
};
export const isDeleteAssignment = state => {
  return state.teacher.deleteAssignment;
};
export const isAssignAssignment = state => {
  return state.teacher.assignAssignment;
};
//student List
export const isGetStudentList = state => {
  return state.teacher.getStudentList;
};
export const isStudentUploadImage = state => {
  return state.teacher.studentUploadImage;
};
