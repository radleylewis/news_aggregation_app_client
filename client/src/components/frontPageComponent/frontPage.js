import React, { Component } from 'react';
import { connect } from 'react-redux';

import Bookmark from '../bookmarkedComponent/bookmarks.js';
import { bookmark } from '../../reducer/reducerActions.js';

import './frontPage.css';
import yetToFavourite from '../../icons/yetToFavourite.svg';
import twitterLogo from '../../icons/twitterLogo.svg';
import rubbishBin from '../../icons/delete.svg';

const moment = require('moment');
const baseURL = 'http://127.0.0.1:3001/';

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArticles: [],
    }
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
            </div>
            <div className="source">
              <div className="options">
                <a href="true"><img className="shareTwitter" src={ twitterLogo } alt=""/></a>
                <a onClick={() => { this.fakeNews(story.source.name)} }><img className="fakeNewsFlag" src={ yetToFavourite } alt=""/></a>
                </div>
                <div className="sourceName">
                  <p>{story.source.name.toUpperCase()}</p>
                  <p className="publishedAt">{moment(story.publishedAt).fromNow()}</p>
                </div>
                <a href="true"><img className="rubbishBin" src={ rubbishBin } alt=""/></a>
            </div>
          </div>
        </div>
      </div>
      )
    )
    return (
      <div className="newsResults">
      { frontPage }
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  stories: state.stories,
  userPreferences: state.userPreferences,
  fakeNews: state.fakeNews,
});

const mapDispatchToProps = (dispatch) => ({
  bookmark: (check) => dispatch(bookmark(check)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FrontPage);
