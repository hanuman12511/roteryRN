import * as types from './types';
import {combineReducers} from 'redux';
const getUserLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return action.payload;

    default:
      return state;
  }
};
const getUserOtpVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case types.USER_OTP_VERIFY:
      return action.payload;

    default:
      return state;
  }
};
// change password
const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case types.CHANGE_PASSWORD:
      return action.payload;

    default:
      return state;
  }
};

const reducer = combineReducers({
  getUserLogin: getUserLoginReducer,
  getUserOtpVerify: getUserOtpVerifyReducer,
  changePassword: changePasswordReducer,
});

export default reducer;
