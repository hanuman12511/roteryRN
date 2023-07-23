import {TEACHER_CHANGE_PASSWORD, makeRequest} from '../ApiInfo';
import {getData, getActiveSchool} from '../UserPreference';

const teacherChangePassword = async (oldPassword, newPassword) => {
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
    const {empId} = userInfo;

    // Preparing params
    const params = {
      id: empId,
      password: oldPassword,
      newPassword: newPassword,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(TEACHER_CHANGE_PASSWORD, params);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export default teacherChangePassword;
