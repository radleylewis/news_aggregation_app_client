import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { userLogin, userLogout } from '../../reducer/reducerActions.js';
import { connect } from 'react-redux';

import logo from '../../icons/newspaper.svg';
import './login.css';

const baseURL = 'http://127.0.0.1:3001/';

class Login extends Component {

  state = {
    username: '',
    password: '',
  }

  login = (username, password) => {
    const authHeader = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
    fetch(baseURL + 'sign-in' , {
      method: 'GET',
      headers: new Headers({
        'Authorization': authHeader,
        'Content-Type': { 'Content-Type': 'application/json' },
      })
    })
    .then(res => res.json())
    .then(data => this.props.userLogin(data))
    .catch(error => console.error('Error :( ', error));
  }

  handleUsername = (e) => this.setState({...this.state, username: e.target.value});
  handlePassword = (e) => this.setState({...this.state, password: e.target.value});

  handleSubmit = (e) => {
    e.preventDefault();
    this.login(this.state.username, this.state.password);
    this.props.history.push('/frontPage');
  }

  handleLogout = () => {
    this.props.userLogout();
    this.props.history.push('/');
  }

  backToNews = () => {
    this.props.history.push('/frontPage');
  }

  render() {
    if(this.props.loggedIn) {
      return (
        <div>
          <div className="loginSlab">
            <img src={logo} alt="this should be a logo" height="100" width="100" className="logo" />
            <p>Hi { this.props.firstname },</p>
            <p>you're already logged in.</p>
            <button className="backToNews" onClick={ this.backToNews }>Back to news</button>
            <button className="logoutButton" onClick={ this.handleLogout }>Log out</button>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="loginSlab">
            <img src={logo} alt="this should be a logo" height="100" width="100" className="logo" />
            <form className="existingUser" onSubmit={ this.handleSubmit }>
              <div>
                <input type="text" placeholder="Username... " autoComplete="" className="username" onChange={ this.handleUsername } />
              </div>
              <div>
                <input type="password" placeholder="Password... " autoComplete="" className="password" onChange={ this.handlePassword } />
              </div>
              <div>
                <button className="loginButton">Login</button>
              </div>
            </form>
            <NavLink className="newAccount" to="/createAccount">Create Account</NavLink>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) =>({
  userPreferences: state.userPreferences,
  loggedIn: state.loggedIn,
  firstname: state.userFirstname,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (userData) => dispatch(userLogin(userData)),
  userLogout: () => dispatch(userLogout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
