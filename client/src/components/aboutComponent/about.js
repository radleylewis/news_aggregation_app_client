import React, { Component } from 'react';
import { connect } from 'react-redux';
import './about.css';

class About extends Component {
  render() {
    return (
      <div>
        <div className="aboutText">
          <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer" >CC 3.0 BY</a></div>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  null
)(About);
