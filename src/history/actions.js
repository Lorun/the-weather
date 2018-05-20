import * as t from './actionTypes';

const deleteHistory = datetime => ({
  type: t.DELETE_FROM_HISTORY,
  payload: datetime,
});

export default {
  deleteHistory,
};
