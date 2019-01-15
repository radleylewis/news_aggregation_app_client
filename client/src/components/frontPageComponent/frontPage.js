import React, { Component } from 'react';
import NoteFake from '../noteFakeComponent/noteFake.js';
import { noteFake } from '../../reducer/reducerActions.js';
import { connect } from 'react-redux';
import './frontPage.css';
import fakeNewsFlag from '../../icons/flag.svg';
import twitterLogo from '../../icons/twitterLogo.svg';
const moment = require('moment');
const baseURL = 'http://127.0.0.1:3001/';

class FrontPage extends Component {

  state = {
    userArticles: [],
  }

  fakeNews = (source) => {
    fetch(baseURL + 'faker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fakeNews: source,
      })
    })
    .then(this.props.noteFake(true));
  }

  render() {
    const allStories = this.props.stories;
    const userPreferences = this.props.userPreferences;
    for (let provider of allStories) {
      if (userPreferences.includes(provider.sourceName)) {
        this.state.userArticles.push(...provider.stories);
      }
    }
    this.state.userArticles.sort(function(a, b) {
      return new Date(b.publishedAt) - new Date(a.publishedAt)
    });

    const frontPage = this.state.userArticles && this.state.userArticles.map((story =>
      <div className="frontPage">
        <div className="newsItem" key={story.publishedAt + story.title}>
          <div className="container">
            <a href={story.url}><img className="associatedPic" src={story.urlToImage} alt="../icons/no_image"/></a>
          </div>
          <div className="details">
            <div className="headline">
              <p>{story.title.toUpperCase().split(' - ')[0]}</p>
              <p className="publishedAt">{moment(story.publishedAt).fromNow()}</p>
            </div>
            <div className="storyBody">
              <p>{story.content || story.description}</p>
            </div>
            <div className="source">
              <div className="options">
                <a href="true"><img className="shareTwitter" src={ twitterLogo } width='20' height='20'alt=""/></a>
                <a onClick={() => {this.fakeNews(story.source.name)} }><img className="fakeNewsFlag" src={ fakeNewsFlag } width='20' height='20'alt=""/></a>
                </div>
                <div>
                  <p className="sourceName">source: {story.source.name.toUpperCase()}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      )
    )
    if (this.props.fakeNews === true) {
      return (
        <div className="newsResults">
          <NoteFake />
          { frontPage }
        </div>
      )
    } else {
      return (
        <div className="newsResults">
        { frontPage }
        </div>
      )
    }
  }
}

const mapStateToProps = (state) =>({
  stories: state.stories,
  userPreferences: state.userPreferences,
  fakeNews: state.fakeNews,
});

const mapDispatchToProps = (dispatch) => ({
  noteFake: (check) => dispatch(noteFake(check)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage);
