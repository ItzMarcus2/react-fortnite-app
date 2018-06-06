import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {config} from './config.js';
import {getFirebase} from './Firebase.js';
import Home from './pages/home/Home';
import StatsPage from './pages/stats/StatsPage';
import Admin from './pages/admin/Admin';

class App extends Component {

  constructor() {
    super();
    getFirebase(config);
  }


  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/"  component={Home} exact/>
            <Route path="/stats"  component={StatsPage} exact/>
            <Route path="/admin" component={Admin} exact/>
            {/* <Route component={Error}/> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
