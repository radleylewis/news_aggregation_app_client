import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './navbar.css';
import settingsLogo from '../../icons/settings.svg';
import homeLogo from '../../icons/home.svg';
import infoLogo from '../../icons/infoLogo.svg';
import statsLogo from '../../icons/stats.svg';
import paperLogo from '../../icons/newspaper.svg';

class Navbar extends Component {
  render() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar">
          <NavLink className="active" exact to="/"><img src={ homeLogo } width='30' height='30'alt="Home"/></NavLink>
          <NavLink className="about" exact to="/about"><img src={ infoLogo } width='30' height='30'alt="About"/></NavLink>
          <NavLink className="about" exact to="/stats"><img src={ statsLogo} width='30' height='30'alt="stats"/></NavLink>
          <NavLink className="settingsSwitch" exact to="/settings"><img src={ settingsLogo } width='30' height='30'alt="Settings"/></NavLink>
          <NavLink className="about" exact to="/frontPage"><img src={ paperLogo } width='30' height='35'alt="About"/></NavLink>
        </div>
      )
    } else {
      return (
        <div className="navbar">
          <NavLink className="active" exact to="/"><img src={ homeLogo } width='30' height='30'alt="Home"/></NavLink>
          <NavLink className="about" exact to="/about"><img src={ infoLogo } width='30' height='30'alt="About"/></NavLink>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) =>({
  loggedIn: state.loggedIn,
});

export default connect(
  mapStateToProps,
  null,
)(Navbar);
