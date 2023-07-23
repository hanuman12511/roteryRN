export const isUserLogin = state => {
  return state.session.getUserLogin;
};
export const isOtpVerify = state => {
  return state.session.getUserOtpVerify;
};

// change password

export const isChangePassword = state => {
  return state.session.changePassword;
};
