import * as t from './actionTypes';
import createReducer from '../utils/createReducer';

const initialState = {
  details: {},
  isFetching: false,
  errorText: '',
};


const weatherReducer = createReducer({
  [t.FETCH_WEATHER_START]: (state, fromHistory) => (fromHistory
    ? state
    : {
      ...state,
      isFetching: true,
    }
  ),
  [t.FETCH_WEATHER_SUCCESS]: (state, { details }) => ({
    ...initialState,
    details,
  }),
  [t.FETCH_WEATHER_FAIL]: (state, errorText) => ({
    ...initialState,
    errorText,
  }),
}, initialState);

export default weatherReducer;
