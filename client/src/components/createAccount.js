import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../reducer/reducerActions.js';
import './createAccount.css';

import logo from '../icons/newspaper.svg';

const baseURL = 'http://127.0.0.1:3001/';

class CreateAccount extends Component {

  addUser = (userInfo) => {
    fetch(baseURL + 'addUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "username": userInfo.username,
        "email": userInfo.email,
        "firstname": userInfo.firstname,
        "surname": userInfo.surname,
        "password": userInfo.password,
        "preferences": userInfo.preferences,
      })
    })
    .then(this.props.userLogin(userInfo))
    .then(this.props.history.push('/settings'));
  }

  state = {
    username: '',
    password: '',
    firstname: '',
    surname: '',
    email: '',
    preferences: ['BBC News'],
  }

  handleUsername = (e) => this.setState({...this.state, username: e.target.value});
  handlePassword = (e) => this.setState({...this.state, password: e.target.value});
  handleFirstname = (e) => this.setState({...this.state, firstname: e.target.value});
  handleSurname = (e) => this.setState({...this.state, surname: e.target.value});
  handleEmail = (e) => this.setState({...this.state, email: e.target.value});

  handleSubmit = (e) => {
    e.preventDefault();
    this.addUser(this.state);
  }

  render() {
    return (
      <div>
        <div className="createAccountSlab">
          <img src={logo} alt="this should be a logo" height="100" width="100" className="logo" />
          <form className="newUser" onSubmit={ this.handleSubmit }>
            <div>
              <input type="text" placeholder="Username... " autoComplete="" className="new_username" onChange={this.handleUsername} />
            </div>
            <div>
              <input type="password" placeholder="Password... " autoComplete="" className="new_password" onChange={this.handlePassword} />
            </div>
            <div>
              <input type="text" placeholder="Firstname... " autoComplete="" className="new_firstName" onChange={this.handleFirstname} />
            </div>
            <div>
              <input type="text" placeholder="Surname... " autoComplete="" className="new_surname" onChange={this.handleSurname} />
            </div>
            <div>
              <input type="text" placeholder="e-mail..." autoComplete="" className="new_email" onChange={this.handleEmail} />
            </div>
            <div>
              <button className="newUserSettingsButton">Next</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLogin: (userData) => dispatch(userLogin(userData)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateAccount);
