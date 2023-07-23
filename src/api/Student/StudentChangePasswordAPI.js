import {STUDENT_CHANGE_PASSWORD, makeRequest} from '../ApiInfo';
import {getActiveStudent, getActiveSchool, getData} from '../UserPreference';

const studentChangePassword = async (oldPassword, newPassword) => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    const {roleId, mobile} = await getData();

    console.log('info', roleId, mobile);
    if (!activeSchool) {
      return;
    }

    // Fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();
    if (!activeStudentId) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // Preparing params
    const params = {
      mobile,
      logintype: roleId,
      id: activeStudentId,
      password: oldPassword,
      newPassword: newPassword,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(STUDENT_CHANGE_PASSWORD, params);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export default studentChangePassword;
