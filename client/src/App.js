import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import { deploySources } from './reducer/reducerActions.js';
import { connect } from 'react-redux';

import Login from './components/login.js'
import About from './components/about.js';
import Preferences from './components/preferences.js';
import FrontPage from './components/frontPage.js';
import CreateAccount from './components/createAccount.js';
import Navbar from './components/navbar.js';

const baseURL = 'http://localhost:3001/';
const reqSources = new Request(baseURL + 'deploySources');

class App extends Component {

  componentDidMount() {
    fetch(reqSources)
    .then(res => res.json())
    .then(sourceList => this.props.deploySources(sourceList))
    .catch(error => console.error('Error :( ', error));
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <div className="navigator">
              <Navbar />
            </div>
            <div className="dashBoard">
              <Switch>
                <Route exact path="/" component={ Login } />
                <Route path="/frontPage" component={ FrontPage } />
                <Route path="/createAccount" component={ CreateAccount } />
                <Route path="/about" component={ About } />
                <Route path="/settings" component={ Preferences } />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deploySources: (sourceList) => dispatch(deploySources(sourceList)),
});

export default connect(
  null,
  mapDispatchToProps
)(App);
