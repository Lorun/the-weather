import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';

const getInitialState = () => ({
  value: '',
});

const styles = {
  root: {
    position: 'relative',
    maxWidth: 500,
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    position: 'relative',
  },
  input: {
    borderRight: 0,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    right: 94,
    marginTop: -10,
  }
};

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = getInitialState();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  handleSubmit(e) {
    const { value } = this.state;
    if (value.length > 0) {
      this.props.fetchCityWeather(value)
    }

    e.preventDefault();
  }


  render() {
    const {
      classes,
      isFetching,
    } = this.props;

    return (
      <div className={classes.root} ref={this.setWrapperRef}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="City"
            value={this.state.value}
            onChange={this.handleInputChange}
            className={classes.input}
            autoFocus="1"
          />
          <Button
            type="submit"
            color="blue"
            size="large"
          >
            Search
          </Button>
          {isFetching &&
            <Spinner
              className={classes.loading}
              width="20"
              color="#a3a3a9"
            />
          }
        </form>
      </div>
    );
  }

}

Search.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchCityWeather: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Search);
