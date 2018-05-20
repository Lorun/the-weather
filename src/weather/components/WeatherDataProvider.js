import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../ui/Spinner';

import { DEFAULT_CITY } from '../../constants';


const WeatherDataProvider = Wrapped => {
  return class WeatherWithData extends Component {

    componentDidMount() {
      this.props.fetchCityWeather(DEFAULT_CITY, true);
    }

    render() {
      const {
        errorText,
        ...otherProps,
      } = this.props;

      return (
        otherProps.weather ?
          <Wrapped {...otherProps} /> :
          <div>
            {errorText
              ? errorText
              : <Spinner color="#ffffff" width="20" />
            }
          </div>
      )
    }

    static propTypes = {
      weather: PropTypes.object,
      errorText: PropTypes.string,
    };

    static defaultProps = {
      weather: null,
    }
  }
};

export default WeatherDataProvider;
