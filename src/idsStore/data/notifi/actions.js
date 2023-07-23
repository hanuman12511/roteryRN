import * as types from './types';

export const getStudentNotification = payload => ({
  type: types.GET_NOTIFICATION,
  payload,
});
export const sendNotification = payload => ({
  type: types.SEND_NOTIFICATION,
  payload,
});
export const getTeacherNotification = payload => ({
  type: types.GET_TEACHER_NOTIFICATION,
  payload,
});
export const getAdminNotification = payload => ({
  type: types.GET_ADMIN_NOTIFICATION,
  payload,
});

export const resetTeacherNotification = payload => ({
  type: types.RESET_TEACHER_NOTIFICATION,
  payload,
});
export const resetNotification = payload => ({
  type: types.RESET_NOTIFICATION,
  payload,
});
export const getNotificationCount = payload => ({
  type: types.NOTIFICATION_COUNT,
  payload,
});
