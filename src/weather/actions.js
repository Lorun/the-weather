import * as t from './actionTypes';
import api from '../utils/openweathermap-api';

/**
 * Prepare the weather data
 * @param data
 * @returns {{location: {country: *, city: *, coord: *}, description: string, temp: *, tempMin: *, tempMax: *, pressure: *, windSpeed: *, clouds: *}}
 */
const normalizeWeather = data => {
  const {
    sys,
    name: city,
    coord,
    main: {
      temp,
      temp_min: tempMin,
      temp_max: tempMax,
      pressure,
    },
    weather,
    clouds: { all: clouds },
    wind: { speed: windSpeed },
  } = data;

  return {
    location: {
      country: sys.country,
      city,
      coord,
    },
    description: weather.length ? weather[0].description : '',
    temp,
    tempMin,
    tempMax,
    pressure,
    windSpeed,
    clouds,
  };
};

/* ================== */
/* ACTIONS */

const fetchCityWeather = (city, fromHistory = false) => dispatch => {
  dispatch({
    type: t.FETCH_WEATHER_START,
    payload: fromHistory,
  });

  return api.search(city)
    .then(({ data }) => {
      const details = normalizeWeather(data);
      dispatch({
        type: t.FETCH_WEATHER_SUCCESS,
        payload: {
          details,
          fromHistory,
        },
      });
      return details;
    })
    .catch(error => {
      if (error.response) {
        const data = error.response.data;
        dispatch({
          type: t.FETCH_WEATHER_FAIL,
          payload: (data && data.message) ? data.message : 'Some error occurred',
        });
      }
    });
};

export default {
  fetchCityWeather,
};