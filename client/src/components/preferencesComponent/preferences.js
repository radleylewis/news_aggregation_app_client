import React, { Component } from 'react';
import NewsSources from '../newsSourceComponent/newsSources.js';
import { connect } from 'react-redux';
import './preferences.css';

class Preferences extends Component {

  render() {
    return (
      <div className="newsSourceSettings" >
        <div className="sourcesContainer">
          <NewsSources />
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  null,
)(Preferences);
