import { connect } from 'react-redux';
import History from './History';

import historyActions from '../actions';
import weatherActions from '../../weather/actions';

const mapDispatchToProps = {
  ...historyActions,
  ...weatherActions,
};

const mapStateToProps = ({ history: { list, isFetching } }) => ({
  list,
  isFetching,
});

const HistoryContainer = connect(mapStateToProps, mapDispatchToProps)(History);

export default HistoryContainer;
