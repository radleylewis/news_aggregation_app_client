import React, { Component } from 'react';
import { connect } from 'react-redux';
import './fakeStats.css';
import {BarChart, Bar, XAxis, YAxis, Tooltip} from 'recharts';

class FakeStats extends Component {

  state = {
    mostFake: [],
  }

  render () {
    let sources = this.props.newsSources;
    let topFakes = sources && sources.sort(function(a, b) {
      return (b.rating * -1) - (a.rating * -1);
    });
    let counter = 0;
    for (let source of topFakes) {
      let newsProvider = {};
      newsProvider['name'] = source.name;
      newsProvider['total'] = (source.rating * -1);
      this.state.mostFake.push(newsProvider);
      counter++;
      if (counter > 10) {
        break;
      }
    }
  	return (
      <div className="chartContainer">
        <div className="fakeHeader">Leading Fake News Outlets</div>
      	<BarChart width={1850} height={500} data={this.state.mostFake}
              margin={{top: 100, left: 500}}>
         <XAxis dataKey="name" stroke="#ff5700"/>
         <YAxis stroke="#ff5700"/>
         <Tooltip/>
         <Bar type="monotone" dataKey="total" fill="#FF4500" />
        </BarChart>
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
)(FakeStats);
