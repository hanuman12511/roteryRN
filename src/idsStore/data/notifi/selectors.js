export const isGetStudentNotification = state => {
  return state.notifi.getStudentNotification;
};
export const isGetTeacherNotification = state => {
  return state.notifi.getTeacherNotification;
};
export const isSendNotification = state => {
  return state.notifi.sendNotification;
};
export const isGetAdminNotification = state => {
  return state.notifi.getAdminNotification;
};
export const isResetTeacherNotification = state => {
  return state.notifi.resetTeacherNotification;
};
export const isResetNotification = state => {
  return state.notifi.resetNotification;
};
export const isGetNotificationCount = state => {
  return state.notifi.getNotificationCount;
};
