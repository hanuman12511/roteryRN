import * as types from './types';

export const getUserLogin = payload => ({
  type: types.USER_LOGIN,
  payload,
});
export const getUserOtpVerify = payload => ({
  type: types.USER_OTP_VERIFY,
  payload,
});

// change password
export const changePassword = payload => ({
  type: types.CHANGE_PASSWORD,
  payload,
});
