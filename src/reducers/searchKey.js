const searchKey = 'Munich'

const searchKeyReducer = (state = searchKey, action) => {
  switch (action.type) {
    case 'CHANGE_SEARCH_KEY': {
      return action.payload;
    }
    default:
      return state;
  }
}

export default searchKeyReducer;