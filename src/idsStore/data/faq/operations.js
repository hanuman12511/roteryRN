import * as actions from './actions';
import {Alert} from 'react-native';
import {clearData} from 'api/UserPreference';
import {BASE_URL, makeRequest} from 'api/ApiInfo';
import {nsNavigate} from 'routes/NavigationService';
const handleTokenExpire = async () => {
  await clearData();
  nsNavigate('Login');
};

export const faqQuestion = params => async dispatch => {
  try {
    const response = await makeRequest(
      'https://gaouribrand.com/api/mobile/faqQuestion',
      params,
      false,
      false,
    );
    if (response) {
      dispatch(actions.faqQuestion(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
export const faqCategories = params => async dispatch => {
  try {
    const response = await makeRequest(
      'https://gaouribrand.com/api/mobile/faqCategories',
      params,
      false,
      false,
    );
    if (response) {
      dispatch(actions.faqCategories(response));
    }
  } catch (error) {
    dispatch(actions.error(error));
  }
};
