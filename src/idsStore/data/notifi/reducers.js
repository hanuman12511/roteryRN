import * as types from './types';
import {combineReducers} from 'redux';

const getStudentNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATION:
      return action.payload;

    default:
      return state;
  }
};
const getTeacherNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_TEACHER_NOTIFICATION:
      return action.payload;

    default:
      return state;
  }
};
const sendNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SEND_NOTIFICATION:
      return action.payload;

    default:
      return state;
  }
};
const getAdminNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_ADMIN_NOTIFICATION:
      return action.payload;

    default:
      return state;
  }
};
const resetTeacherNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.RESET_TEACHER_NOTIFICATION:
      return action.payload;

    default:
      return state;
  }
};
const resetNotificationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.RESET_NOTIFICATION:
      return action.payload;

    default:
      return state;
  }
};
const getNotificationCountReducer = (state = {}, action) => {
  switch (action.type) {
    case types.NOTIFICATION_COUNT:
      return action.payload;

    default:
      return state;
  }
};

const reducer = combineReducers({
  resetNotification: resetNotificationReducer,
  getStudentNotification: getStudentNotificationReducer,
  sendNotification: sendNotificationReducer,
  getTeacherNotification: getTeacherNotificationReducer,
  getAdminNotification: getAdminNotificationReducer,
  resetTeacherNotification: resetTeacherNotificationReducer,
  getNotificationCount: getNotificationCountReducer,
});

export default reducer;
