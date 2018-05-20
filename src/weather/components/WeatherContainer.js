import { connect } from 'react-redux';
import Weather from './Weather';

import actions from '../actions';

const formatTemp = temp => (`${Math.round(temp)}°C`);

const mapStateToProps = ({ weather: { details, errorText } }) => ({
  errorText,
  weather: details.temp ? {
    ...details,
    temp: formatTemp(details.temp),
    tempMin: formatTemp(details.tempMin),
    tempMax: formatTemp(details.tempMax),
    pressure: `${details.pressure} hPa`,
    windSpeed: `${details.windSpeed} m/s`,
  } : null,
});

const mapDispatchToProps = {
  fetchCityWeather: actions.fetchCityWeather,
};

const WeatherContainer = connect(mapStateToProps, mapDispatchToProps)(Weather);

export default WeatherContainer;
