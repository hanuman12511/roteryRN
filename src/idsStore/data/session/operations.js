import * as actions from './actions';
import {BASE_URL, USER_LOGIN, makeRequest} from 'api/ApiInfo';
import {getActiveSchool, getData} from 'api/UserPreference';
import {Alert} from 'react-native';
export const getUserLogin = params => async dispatch => {
  try {
    // calling api
    // const response = await makeRequest(USER_LOGIN, params, false);
    const response = await makeRequest(
      BASE_URL + 'passwordLogin',
      params,
      false,
      false,
    );
    //Alert.alert('', BASE_URL + 'passwordLogin');
    // processing response
    return dispatch(actions.getUserLogin(response));
  } catch (error) {
    console.log(error.message);
  }
};
export const getUserOtpVerify = params => async dispatch => {
  try {
    // calling api
    const response = await makeRequest(BASE_URL + 'verifyOtp', params, false);
    //Alert.alert('', BASE_URL + 'verifyOtp');
    // processing response
    return dispatch(actions.getUserOtpVerify(response));
  } catch (error) {
    console.log(error.message);
  }
};

// change password
export const changePassword = (oldPassword, newPassword) => async dispatch => {
  try {
    const activeSchool = await getActiveSchool();
    const {roleId, mobile} = await getData();
    if (!activeSchool) {
      return;
    }
    const {idsprimeID} = activeSchool;
    // Preparing params
    const params = {
      login_type: roleId,
      password: oldPassword,
      newPassword: newPassword,
      idsprimeID,
      mobileno: mobile,
    };
    // calling api
    const response = await makeRequest(
      BASE_URL + 'changePasswordNew',
      params,
      true,
      false,
    );
    //Alert.alert('', BASE_URL + 'changePasswordNew');
    // processing response
    return dispatch(actions.changePassword(response));
  } catch (error) {
    console.log(error.message);
  }
};
