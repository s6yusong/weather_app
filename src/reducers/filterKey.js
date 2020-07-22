const filterKey = ''

const filterKeyReducer = (state = filterKey, action) => {
  switch (action.type) {
    case 'CHANGE_FILTER_KEY': {
      return action.payload;
    }
    default:
      return state;
  }
}

export default filterKeyReducer;