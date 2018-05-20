import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import WeatherDataProvider from './WeatherDataProvider';

const styles = {
  root: {
    flexGrow: 1,
  },
  header: {
    marginBottom: '1.5em',
    fontSize: 14,
    '& > h1': {
      fontSize: 26,
      margin: 0,
    },
    '& a': {
      textDecoration: 'none',
      color: '#ffd4db',
      '&:hover': {
        color: '#fff',
      }
    },
  },
  country: {
    fontSize: 20,
  },
  temp: {
    fontSize: 50,
  },
  tempDetails: {
    marginBottom: '1.5em',
    fontSize: 14,
  },
  description: {
    fontWeight: 600,
  },
  addition: {
    padding: 0,
    margin: '0 0 1em 0',
    fontSize: 13,
    listStyle: 'none',
    '& > li': {
      marginBottom: 5,
    }
  },
};

const Weather = ({ weather, errorText, classes }) => {
  const {
    location,
    description,
    temp,
    tempMin,
    tempMax,
    pressure,
    windSpeed,
    clouds
  } = weather;
  const ll = `${location.coord.lat},${location.coord.lon}`;
  return(
    <div className={classes.root}>
      <div className={classes.header}>
        <div>The Weather in</div>
        <h1>
          <a href={`https://maps.google.com/?q=${ll}&ll=${ll}&z=8`} target="_blank">{location.city}</a>,
          <span className={classes.country}>{location.country}</span>
        </h1>
        <div className={classes.description}>{description}</div>
      </div>
      <div className={classes.temp}>{temp}</div>
      <div className={classes.tempDetails}>temperature from {tempMin} to {tempMax}</div>
      <ul className={classes.addition}>
        <li>Pressure: <b>{pressure}</b></li>
        <li>Wind speed: <b>{windSpeed}</b></li>
        <li>Clouds: <b>{clouds}%</b></li>
      </ul>
    </div>
  );
};

Weather.propTypes = {
  weather: PropTypes.shape({
    location: PropTypes.shape({
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      coord: PropTypes.shape({
        lon: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
      }),
    }),
    description: PropTypes.string.isRequired,
    temp: PropTypes.string.isRequired,
    tempMin: PropTypes.string.isRequired,
    tempMax: PropTypes.string.isRequired,
    windSpeed: PropTypes.string.isRequired,
    clouds: PropTypes.number.isRequired,
    pressure: PropTypes.string.isRequired,
  }),
  classes: PropTypes.object.isRequired,
};

export default WeatherDataProvider(
  injectSheet(styles)(Weather)
);
