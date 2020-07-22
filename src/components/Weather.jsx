import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Weather.scss';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {setPositions, changeSearchKey} from "../actions";
import {dateBuilder} from '../utils/utils';
import {weatherApi} from '../api/weatherApi';
import TextField from "@material-ui/core/TextField/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";

function Weather() {
  const [query, setQuery] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [weather, setWeather] = useState({});
  const [positionExsist, setpositionExsist] = useState(false);
  const savedPostions = useSelector(state => state.positions);
  const searchKey = useSelector(state => state.searchKey);
  const dispatch = useDispatch();

  const fetchData = async (key) => {
    const result = await weatherApi(key);
    if (result.cod === '404' || result.cod === '400') {
      setErrorMsg(result.message);
      console.error('Error:', result.message);
    } else {
      setErrorMsg(null);
      setWeather(result);
      setQuery(result.name);
      dispatch(changeSearchKey(result.name));
      setpositionExsist(savedPostions.indexOf(query) > -1);
    }
  };
  const search = async (evt) => {
    if (evt.key === "Enter") {
      await fetchData(query);
    }
  };

  const updatePosition = () => {
    const positions = savedPostions;
    setpositionExsist(savedPostions.indexOf(searchKey) === -1);
    positions.indexOf(searchKey) > -1 ? positions.splice(positions.indexOf(searchKey), 1) : positions.push(searchKey);
    dispatch(setPositions(positions));
  };

  useEffect(() => {
    setQuery(searchKey);
    if (searchKey) {
      fetchData(searchKey);
    }
    setpositionExsist(savedPostions.indexOf(searchKey) > -1);
  }, [setWeather, savedPostions, setpositionExsist, positionExsist, searchKey]);
  return (
      <div className="weather-container">
        <TextField
            label="Search..."
            variant="outlined"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
        />
        {errorMsg && (<div className="alert alert-danger" role="alert">{errorMsg}</div>)}
        {(typeof weather.main != "undefined" && !errorMsg) && (
            <div className="app">
              <div className="location-box">
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <div className="location">{weather.name}, {weather.sys.country}</div>
                  <IconButton color={!positionExsist ? 'primary' : 'secondary'} onClick={updatePosition}>
                    {!positionExsist && (
                        <AddIcon/>
                    )}
                    {positionExsist && (
                        <RemoveIcon/>
                    )}
                  </IconButton>
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
        )}
        {(typeof weather.main === "undefined" && !errorMsg) && (<CircularProgress/>)}
      </div>
  );
}

export default Weather;
