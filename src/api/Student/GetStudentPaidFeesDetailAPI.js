import {GET_STUDENT_PAID_FEES_DETAIL, makeRequest} from '../ApiInfo';
import {getActiveStudent, getActiveSchool} from '../UserPreference';

const getStudentPaidFeesDetail = async () => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
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
      id: activeStudentId,
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_STUDENT_PAID_FEES_DETAIL, params);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export default getStudentPaidFeesDetail;
