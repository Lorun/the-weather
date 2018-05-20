import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import Button from '../../ui/Button';
import Spinner from '../../ui/Spinner';

const formatDate = time => {
  const date = new Date(time);
  return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

const styles = {
  root: {
    flexBasis: 260,
    marginLeft: 32,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 4,
    padding: 16,
    color: '#444',
  },
  head: {
    fontSize: '1.125em',
    fontWeight: 'bold',
    margin: '0 0 1em',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.2em 0',
    marginBottom: 4,
    '&:hover': {
      '& $deleteButton': {
        opacity: 1,
      }
    },
  },
  itemTitle: {
    color: '#5f5fda',
    fontSize: '0.875em',
    cursor: 'pointer',
    paddingRight: 8,
    '&:hover': {
      color: '#444',
    },
  },
  itemControls: {
    flexShrink: 0,
  },
  time: {
    color: '#aaaeb3',
    fontSize: 12,
  },
  deleteButton: {
    display: 'block',
    opacity: 0,
  },
  empty: {
    fontSize: '0.875em',
    color: '#777',
  },
  spinner: {
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: '2px 0 0 8px',
  }
};

class History extends Component {

  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleDeleteClick(id) {
    return () => {
      this.props.deleteHistory(id);
    }
  }

  handleItemClick(query) {
    return () => {
      this.props.fetchCityWeather(query, true);
    }
  }

  render() {
    const { list, isFetching, classes } = this.props;
    return (
      <div className={classes.root}>
        <h2 className={classes.head}>
          Search history
          {isFetching &&
            <Spinner
              className={classes.spinner}
              width="16"
              color="#a3a3a9"
            />
          }
        </h2>
        {list.length > 0 ?
          (
            list.map((item) => (
              <div key={item.datetime} className={classes.item}>
                <div onClick={this.handleItemClick(item.query)} className={classes.itemTitle}>
                  {item.query},
                  <span className={classes.time}> {formatDate(item.datetime)}</span>
                </div>
                <div className={classes.itemControls}>
                  <Button
                    onClick={this.handleDeleteClick(item.datetime)}
                    className={classes.deleteButton}
                    color="red"
                    size="small"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) :
          <div className={classes.empty}>History is empty</div>
        }
      </div>
    );
  }
};

History.propTypes = {
  list: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  deleteHistory: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(History);
