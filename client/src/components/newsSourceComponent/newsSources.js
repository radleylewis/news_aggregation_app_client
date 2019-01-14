import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectedSources } from '../../reducer/reducerActions.js';
import './settings.css';

const baseURL = 'http://127.0.0.1:3001/';

class NewsSources extends Component {

  state = {
    search: '',
    favourites: [...this.props.userPreferences],
  }

  filterSources = (e) => this.setState({...this.state, search: e.target.value.toLowerCase()});;
  moveToFavourites = (provider) => this.setState({...this.state, favourites: [...this.state.favourites, provider] })
  deleteFromFavourites = (provider) => {
    let index = this.state.favourites.indexOf(provider);
    if (index > -1) {
      this.state.favourites.splice(index, 1);
    }
    this.setState({...this.state, favourites: this.state.favourites})
  }

  updateSources = (favourites) => {
    fetch(baseURL + 'user-source', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.props.username,
        sources: favourites,
      })
    })
    .then(this.props.selectedSources(favourites))
    .then(this.props.history.push('/frontPage'));
  }

  render() {
    let filteredSources = this.props.newsSources.filter((provider) => provider.name.toLowerCase().indexOf(this.state.search) !== -1);
    let favourites = this.state.favourites;

    const sourceList = filteredSources.map(source => {
      if (source && !favourites.includes(source.name)) {
        return (
          <button className='sourceButtonA' onClick={() => { this.moveToFavourites(source.name) }} key={source.id}>{ source.name }</button>
        )
      }
      return null;
    })

    const selectedSourceList = favourites && favourites.map(source => {
      return (
        <button className='sourceButtonB' onClick={() => { this.deleteFromFavourites(source) }} key={ source + '&' }>{ source }</button>
      )
    })

    return (
      <div>
        <div className="filterAndNext">
          <input type="text" placeholder="filter... " autoComplete="" className="filterSources" onChange={this.filterSources} />
          <button className="next" onClick={() => { this.updateSources(this.state.favourites) } }>to news >></button>
        </div>
        <div className="sourceList">
          { sourceList }
        </div>
        <div className="sourceList">
          { selectedSourceList }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  newsSources: state.newsSources,
  userPreferences: state.userPreferences,
  username: state.username,
});

const mapDispatchToProps = (dispatch) => ({
  selectedSources: (sources) => dispatch(selectedSources(sources)),
});

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsSources);

export default withRouter(connectedComponent)
