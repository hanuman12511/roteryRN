import {GET_NOTICE_BOARD_NEWS, makeRequest} from '../ApiInfo';
import {getActiveSchool} from '../UserPreference';

const getNoticeBoardNews = async () => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // Preparing params
    const params = {
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(GET_NOTICE_BOARD_NEWS, params);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export default getNoticeBoardNews;
