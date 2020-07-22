import positionsReducer from './positions';
import searchKeyReducer from './searchKey';
import filterKeyReducer from './filterKey';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
  positions: positionsReducer,
  searchKey: searchKeyReducer,
  filterKey: filterKeyReducer,
});

export default allReducers;