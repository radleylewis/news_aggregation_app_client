import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './navbar.css';
import settingsLogo from '../icons/settings.svg';
import homeLogo from '../icons/home.svg';
import infoLogo from '../icons/infoLogo.svg';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <NavLink className="active" exact to="/"><img src={ homeLogo } width='30' height='30'alt="Home"/></NavLink>
        <NavLink className="about" exact to="/about"><img src={ infoLogo } width='30' height='30'alt="About"/></NavLink>
        <NavLink className="settingsSwitch" exact to="/settings"><img src={ settingsLogo } width='30' height='30'alt="Settings"/></NavLink>
      </div>
    )
  }
}

export default connect(
  null,
  null
)(Navbar);
