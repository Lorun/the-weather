import { connect } from 'react-redux';
import Search from './Search';

import actions from '../../weather/actions';

const mapDispatchToProps = {
  ...actions,
};

const mapStateToProps = ({ weather: { isFetching } }) => ({
  isFetching,
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
