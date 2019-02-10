import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/loginComponent/login.js'
import Bookmark from './components/bookmarkedComponent/bookmarks.js';
import About from './components/aboutComponent/about.js';
import Preferences from './components/preferencesComponent/preferences.js';
import FrontPage from './components/frontPageComponent/frontPage.js';
import CreateAccount from './components/createAccountComponent/createAccount.js';
import Navbar from './components/navbarComponent/navbar.js';

import './App.css';
import { deploySources } from './reducer/reducerActions.js';
import { connect } from 'react-redux';

const baseURL = 'http://localhost:3001/';
const reqSources = new Request(baseURL + 'deploySources');

class App extends Component {

	componentDidMount() {
		fetch(reqSources)
			.then(res => res.json())
			.then(sourceList => this.props.deploySources(sourceList))
      .catch(error => console.error('Error :( ', error)); // eslint-disable-line
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
                <Route path="/stats" component={ Bookmark } />
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
