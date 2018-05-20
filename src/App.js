import React from 'react';
import injectSheet from 'react-jss';
import Search from './search';
import Weather from './weather';
import History from './history';

import bg from './bg.jpg';

const styles = {
  '@global': {
    '*': {
      boxSizing: 'border-box',
    },
    html: {
      height: '100%',
    },
    body: {
      height: '100%',
      margin: 0,
      padding: 0,
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      fontSize: 16,

      background: `#a8979f url(${bg}) 50% 0 no-repeat`,
      backgroundSize: 'cover',
    }
  },
  container: {
    padding: 32,
  },
  main: {
    padding: '48px 0 32px',
    display: 'flex',
    '& > div:first-child': {
      flexGrow: 1,
    }
  }
};

const App = ({ classes }) => (
  <div className={classes.container}>
    <Search/>
    <div className={classes.main}>
      <Weather/>
      <History/>
    </div>
  </div>
);

export default injectSheet(styles)(App);
