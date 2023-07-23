import * as actions from './actions';
import {SLIDER, makeRequest} from '../../../api/ApiInfo';
import {getActiveSchool} from '../../../api/UserPreference';
import {Alert} from 'react-native';
export const getDashboardSlider = data => async dispatch => {
  try {
    // fetching active school from local storage
    const activeSchool = await getActiveSchool();
    if (!activeSchool) {
      return;
    }

    const {idsprimeID} = activeSchool;

    // preparing params
    const params = {
      idsprimeID,
    };

    // calling api
    const response = await makeRequest(SLIDER, params);
    // Alert.alert('', SLIDER);
    // processing response
    return dispatch(actions.getDashboardSlider(response));
  } catch (error) {
    console.log(error.message);
  }
};
