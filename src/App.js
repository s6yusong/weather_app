import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Layout from './components/Layout';
import Header from './components/Header'
import Weather from './components/Weather';
import SavedWeatherPage from './components/SavedWeatherPage';
import './App.css';

function App() {
  return (
      <React.Fragment>
        <Router>
          <Header/>
          <Layout>
            <Switch>
              <Route exact path="/" component={Weather}></Route>
              <Route path="/weather" component={SavedWeatherPage}/>
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
  );
}

export default App;
