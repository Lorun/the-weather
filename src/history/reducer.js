import { FETCH_WEATHER_SUCCESS, FETCH_WEATHER_START, FETCH_WEATHER_FAIL } from '../weather/actionTypes';
import * as t from './actionTypes';
import createReducer from '../utils/createReducer';
import { SEARCH_HISTORY_LIMIT } from '../constants';

const cachedHistory = localStorage.getItem('history');

const initialState = {
  list: cachedHistory ? JSON.parse(cachedHistory) : [],
  isFetching: false,
};


const historyReducer = createReducer({
  [FETCH_WEATHER_START]: (state, fromHistory) => (
    fromHistory ? {
      ...state,
      isFetching: true,
    } : state
  ),
  [FETCH_WEATHER_SUCCESS]: (state, { details, fromHistory }) => {
    if (fromHistory) {
      return {
        ...state,
        isFetching: false,
      };
    }

    let list = [
      {
        query: details.location.city,
        datetime: Date.now(),
      },
      ...state.list,
    ];

    if (list.length > SEARCH_HISTORY_LIMIT) {
      list = list.slice(0, SEARCH_HISTORY_LIMIT);
    }

    localStorage.setItem('history', JSON.stringify(list));

    return {
      ...state,
      list,
    };
  },
  [FETCH_WEATHER_FAIL]: state => ({
    ...state,
    isFetching: false,
  }),
  [t.DELETE_FROM_HISTORY]: (state, datetime) => {
    const nextList = state.list.filter(item => item.datetime !== datetime);
    localStorage.setItem('history', JSON.stringify(nextList));
    return {
      ...state,
      list: nextList,
    }
  },
}, initialState);

export default historyReducer;
