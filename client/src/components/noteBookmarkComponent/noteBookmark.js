import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noteFake } from '../../reducer/reducerActions.js';
import './noteBookmark.css';

class NoteBookmark extends Component {

  noteFake = () => {
    this.props.noteFake(false);
  }

  render() {
    return (
      <div className="fakeBox">
        <p>Thank you for notifying us of this fake news article</p>
        <button className="fakeButton" onClick={this.noteFake}>OK, thanks</button>
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  fakeNews: state.fakeNews,
});

const mapDispatchToProps = (dispatch) => ({
  noteFake: (check) => dispatch(noteFake(check)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteBookmark);
