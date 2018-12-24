import React, { Component } from 'react';
import './App.css';
import SignIn from './pages/SignIn'
import AppCampaigns from './pages/Campaigns'
import AppNavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {ApolloProvider} from 'react-apollo';
import {Client} from './config/ApolloClient';

class App extends Component {
  render() {
    return (
        <ApolloProvider client={Client}>
          <React.Fragment>
              <Router>
                  <div>
                      <AppNavBar/>
                      <Switch>
                          <Route path="/" exact component={SignIn} />
                          <Route path="/campaigns" exact component={AppCampaigns} />
                      </Switch>
                  </div>
              </Router>
          </React.Fragment>
        </ApolloProvider>
    );
  }
}

export default App;
