import * as types from './types';
import {combineReducers} from 'redux';
const getDashboardSliderReducer = (state = 0, action) => {
  switch (action.type) {
    case types.DASHBOARD_SLIDER:
      return action.payload;

    default:
      return state;
  }
};

const reducer = combineReducers({
  getDashboardSlider: getDashboardSliderReducer,
});

export default reducer;
