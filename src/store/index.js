import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import weather from '../weather/reducer'
import history from '../history/reducer'


const rootReducer = combineReducers({
  weather,
  history,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

export default store;
