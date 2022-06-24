import {STUDENT_FORGOT_PASSWORD, BASE_URL, makeRequest} from '../ApiInfo';

const studentForgotPassword = async (mobile, loginType) => {
  try {
    // fetching active school from local storage

    // Preparing params
    const params = {
      mobile,
      loginType,
    };

    // calling api
    // const response = await makeRequest(STUDENT_FORGOT_PASSWORD, params);
    const response = await makeRequest(
      BASE_URL + 'forgotPasswordAll',
      params,
      false,
      false,
    );
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export default studentForgotPassword;
