import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';

const styles = {
  root: {
    width: '100%',
    height: '2em',
    padding: '0 0.5em',
    lineHeight: '2em',
    fontSize: '1.25em',
    border: '1px solid #fff',
    '&:focus': {
      backgroundColor: '#feffef',
      outline: 'none',
    }
  },
};

class Input extends Component {

  componentDidMount() {
    if (this.props.autoFocus === '1') {
      this.input.focus();
    }
  }

  setInputRef = node => {
    this.input = node;
  };

  render() {
    const { classes, ...props } = this.props;

    props.className = classNames(
      classes.root,
      props.className,
    );

    return (
      <input
        {...props}
        ref={this.setInputRef}
      />
    );
  }

}


Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

Input.defaultProps = {
  autoFocus: '0',
};

export default injectSheet(styles)(Input);
