import * as actions from './actions';
// API
import {BASE_URL, makeRequest} from 'api/ApiInfo';
import {Alert} from 'react-native';
// User Preference
import {getActiveStudent, getActiveSchool, getData} from 'api/UserPreference';

export const resetNotification = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();

    if (activeStudentId) {
      const {idsprimeID} = activeSchool;

      // preparing params
      const params = {
        userId: activeStudentId,
        login_type: 'Student',
        idsprimeID,
      };

      // calling api
      const response = await makeRequest(
        BASE_URL + 'resetNotificationCount',
        params,
      );
      //Alert.alert('', BASE_URL + 'resetNotificationCount');
      return dispatch(actions.resetNotification(response));
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const getStudentNotification = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();

    if (activeStudentId) {
      const {idsprimeID} = activeSchool;

      // preparing params
      const params = {
        userId: activeStudentId,
        login_type: 'Student',
        idsprimeID,
      };

      // calling api
      const response = await makeRequest(BASE_URL + 'notifications', params);
      //Alert.alert('', BASE_URL + 'notifications');
      return dispatch(actions.getStudentNotification(response));
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const getTeacherNotification = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();

    if (userInfo) {
      const {idsprimeID} = activeSchool;

      // preparing params
      const params = {
        userId: userInfo.empId,
        login_type: 'Teacher',
        idsprimeID,
      };

      // calling api
      const response = await makeRequest(BASE_URL + 'notifications', params);
      //Alert.alert('', BASE_URL + 'notifications');
      return dispatch(actions.getTeacherNotification(response));
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const getAdminNotification = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId: userId} = userInfo;

    // preparing params
    const params = {
      idsprimeID,
      userId,
      login_type: 'Admin',
    };

    // calling api
    const response = await makeRequest(BASE_URL + 'notifications', params);
    //Alert.alert('', BASE_URL + 'notifications');
    return dispatch(actions.getAdminNotification(response));
  } catch (error) {}
};
export const sendNotification = (roleId, message, image) => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();
    if (!userInfo) {
      return;
    }

    const {idsprimeID} = activeSchool;
    const {empId: userId} = userInfo;

    // preparing params
    const params = {
      idsprimeID,
      userId,
      roleId,
      message,
      image,
    };
    console.log('upload image', params);
    // calling api
    const response = await makeRequest(
      BASE_URL + 'firebaseNotification',
      params,
      true,
      false,
    );
    console.log(response);
    //Alert.alert('', BASE_URL + 'firebaseNotification');
    return dispatch(actions.sendNotification(response));
  } catch (error) {
    console.log('error while sending notification', error);
  }
};
export const resetTeacherNotification = () => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // fetching empId from local storage
    const userInfo = await getData();

    if (userInfo) {
      const {idsprimeID} = activeSchool;

      // preparing params
      const params = {
        userId: userInfo.empId,
        login_type: 'Teacher',
        idsprimeID,
      };

      // calling api
      const response = await makeRequest(
        BASE_URL + 'resetNotificationCount',
        params,
      );
      //Alert.alert('', BASE_URL + 'resetNotificationCount');
      return dispatch(actions.resetTeacherNotification(response));
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const getNotificationCount = params => async dispatch => {
  try {
    // calling api
    const response = await makeRequest(
      BASE_URL + 'getNotificationCount',
      params,
    );
    //Alert.alert('', BASE_URL + 'getNotificationCount');
    return dispatch(actions.getNotificationCount(response));
  } catch (error) {
    console.log(error.message);
  }
};
