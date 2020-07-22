export const setPositions= (positions) => {
  return {
    type: 'UPDATE_SAVED_POSITIONS',
    payload: positions
  }
};
export const changeSearchKey= (searchKey) => {
  return {
    type: 'CHANGE_SEARCH_KEY',
    payload: searchKey
  }
};
export const changeFilterKey= (filterKey) => {
  return {
    type: 'CHANGE_FILTER_KEY',
    payload: filterKey
  }
};