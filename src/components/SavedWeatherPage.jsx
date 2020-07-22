import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import WeatherCard from './WeatherCard';
import { filterPositions } from '../utils/utils';
import {changeFilterKey} from "../actions";

const Styles = styled.div`
  .MuiFormControl-root {
    width: 100%;
    margin-top: 20px
  }
  .cards-container{
    display: flex;
    flex-wrap: wrap
  }
`;

const SavedWeatherPage = () => {
  const savedPostions = useSelector(state => state.positions);
  const postionsNumber = useSelector(state => state.positions.length);
  const filterKeyState = useSelector(state => state.filterKey);
  const [filterKey, setFilterKey] = useState('');
  const dispatch = useDispatch();
  const warningMsg ='Please change filter or add positions.';


  const search = (evt) => {
    if (evt.key === "Enter") {
      setFilterKey(evt.target.value);
      dispatch(changeFilterKey(evt.target.value));
    }
  };

  const currentPosition = () => filterPositions(savedPostions, filterKeyState);

  useEffect(() => {
    setFilterKey(filterKeyState)
  }, [setFilterKey, filterKeyState]);

  return (
      <Styles>
        <TextField
            onKeyPress={search} label="Filter by name"
            variant="outlined"
            onChange={e => setFilterKey(e.target.value)}
            value={filterKey}
        />
        {currentPosition().length === 0 && (<div className="alert alert-danger" role="alert">{warningMsg}</div>)}
        <div className="cards-container">
          {currentPosition().map((position, index) => {
            return <WeatherCard key={index} position={position}/>
          })}
        </div>
      </Styles>
  );
}

export default SavedWeatherPage;