import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { setPositions} from "../actions";
import { dateBuilder, convertTimestamp } from '../utils/utils';
import styled from 'styled-components';
import { weatherApi } from '../api/weatherApi';
import sunrise from '../images/sunrise.png'
import sunset from '../images/sunset.png'

const useStyles = makeStyles({
  root: {
    width: 275,
    height: 380,
    margin: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Styles = styled.div`
  .MuiTypography-h5 {
    line-height: 1.834;
  }
  .MuiTypography-root img{
    margin-left: 10px
  }
  .card-content{
    display: flex,;
    justify-content: space-between
  }
`;


export default function WeatherCard(props) {
  const classes = useStyles();
  const {position} = props;
  const [weather, setWeather] = useState(null);
  const savedPostions = useSelector(state => state.positions);
  const dispatch = useDispatch();
  const fetchData = async (key) => {
    const result = await weatherApi(key);
    setWeather(result);
  };

  const removeCard = () => {
    const positions = savedPostions;
    positions.splice(positions.indexOf(position), 1);
    dispatch(setPositions(positions));
  };

  useEffect(() => {
    fetchData(position);
  }, [position]);

  return (
      <Styles>
        <Card className={classes.root}>
          {weather ? (<CardContent>
            <div className="card-content">
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {weather.name}, {weather.sys.country}
              </Typography>
              <IconButton color="secondary" onClick={removeCard} >
                <RemoveIcon />
              </IconButton>
            </div>
            <div style={{display: 'flex'}}>
              <Typography variant="h5" component="h2">
                {Math.round(weather.main.temp)}°c
              </Typography>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather_icon" width="50" height="50"/>
            </div>

            <Typography className={classes.pos} color="textSecondary">
              {weather.weather[0].main}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {dateBuilder(new Date())}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Humidity {weather.main.humidity}%
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Max Temperature {weather.main.temp_max} °C
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Min Temperature {weather.main.temp_min} °C
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Sunrise {convertTimestamp(weather.sys.sunrise)}
              <img src={sunrise} alt="sunset_icon" width="30" height="30"/>
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Sunset {convertTimestamp(weather.sys.sunset)}
              <img src={sunset} alt="sunset_icon" width="30" height="30"/>
            </Typography>
          </CardContent>) : (<CircularProgress/>)}
        </Card>
      </Styles>
  );
}