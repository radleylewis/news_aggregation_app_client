import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './navbar.css';
import settingsLogo from '../../icons/settings.svg';
import homeLogo from '../../icons/home.svg';
import infoLogo from '../../icons/infoLogo.svg';
import bookmarkLogo from '../../icons/bookmarked.svg';
import paperLogo from '../../icons/newspaper.svg';

class Navbar extends Component {
	render() {
		if (this.props.loggedIn) {
			return (
				<div className="navbar">
					<NavLink className="active" exact to="/"><img src={ homeLogo } width='20' height='20'alt="Home"/></NavLink>
					<NavLink className="about" exact to="/about"><img src={ infoLogo } width='20' height='20'alt="About"/></NavLink>
					<NavLink className="about" exact to="/stats"><img src={ bookmarkLogo } width='20' height='20'alt="stats"/></NavLink>
					<NavLink className="paper" exact to="/frontPage"><img src={ paperLogo } width='25' height='25'alt="About"/></NavLink>
					<NavLink className="settingsSwitch" exact to="/settings"><img src={ settingsLogo } width='20' height='20'alt="Settings"/></NavLink>
				</div>
			);
		} else {
			return (
				<div className="navbar">
				</div>
			);
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
