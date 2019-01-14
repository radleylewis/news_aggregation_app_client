import React, { Component } from 'react';
import { connect } from 'react-redux';
import './frontPage.css';

class FrontPage extends Component {

  state = {
    userArticles: [],
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
            <div className="storyBody">
              <p>{story.content || story.description}</p>
            </div>
            <div className="source">
              <p className="sourceTag">source: </p><p className="sourceName">{story.source.name.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
      )
    )

    return (
      <div className="newsResults">
        {frontPage}
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  stories: state.stories,
  userPreferences: state.userPreferences,
});


export default connect(
  mapStateToProps,
  null
)(FrontPage);
