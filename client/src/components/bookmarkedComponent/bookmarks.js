import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bookmarks.css';

class Bookmark extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mostFake: [],
		};
	}

  render () {
  	return (
      <div className="bookmarks">
        <p>SAVED ARTICLES TO BE INSERTED HERE</p>
      </div>
    );
  }
}

const mapStateToProps = (state) =>({
  newsSources: state.newsSources,
});

export default connect(
  mapStateToProps,
  null,
)(Bookmark);
