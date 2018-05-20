
function createReducer(handlers, initialState) {
  return (state = initialState, action) => {
    const handler = handlers[action.type];

    return handler ? handler(state, action.payload) : state;
  }
}

export default createReducer;
