import {UPDATE_EMAIL, UPDATE_TEACHER_EMAIL, makeRequest} from '../ApiInfo';
import {getActiveStudent, getActiveSchool, getData} from '../UserPreference';

const updateEmail = async email => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    // Fetching activeStudentId from local storage
    const activeStudentId = await getActiveStudent();

    if (activeStudentId != null) {
      const id = activeStudentId;
      console.log('1', id);
      const {idsprimeID} = activeSchool;

      // Preparing params
      const params = {
        id,
        email: email,
        idsprimeID,
      };

      // calling api
      const response = await makeRequest(UPDATE_EMAIL, params);
      return response;
    } else {
      console.log('2 UPDATE BY TEACHER API');

      if (!activeSchool) {
        return;
      }
      const userInfo = await getData();
      if (!userInfo) {
        return;
      }
      // Fetching activeStudentId from local storage
      const {empId} = userInfo;

      console.log('0', empId);

      const {idsprimeID} = activeSchool;

      // Preparing params
      const params = {
        id: empId,
        email: email,
        idsprimeID,
      };

      // calling api
      const response = await makeRequest(UPDATE_TEACHER_EMAIL, params);
      return response;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export default updateEmail;
