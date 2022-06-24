import {TEACHER_FORGOT_PASSWORD, makeRequest} from '../ApiInfo';
import {getActiveSchool} from '../UserPreference';

const teacherForgotPassword = async email => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // Preparing params
    const params = {
      email,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(TEACHER_FORGOT_PASSWORD, params);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export default teacherForgotPassword;
