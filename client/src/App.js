import React, {Component} from 'react';
import moment from 'moment';

import './App.scss';
import BigMatch from './BigMatch';
import MatchDetails from './MatchDetails';
import ThreeScene from './ThreeScene';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: {},
      matches: [],
    };
  }

  async apiGet(endpoint) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`);
      return await response.json();
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  async getTeams() {
    const teams = await this.apiGet('teams');
    this.setState({teams});
  }

  async getMatches() {
    const matches = await this.apiGet('matches');
    this.setState({matches});
  }

  componentDidMount() {
    this.getMatches();
    this.getTeams();
  }

  renderBody = () => {
    let prevDay;
    return Object.entries(this.state.matches).map(([uuid, match]) => {
      if (prevDay !== undefined) {
        // do something
      }
      return (
        <div
          key={uuid}
        >
          <div
            className="daySplitter"
          >
            <h2>{moment(match.when).format('MMMM Do')}</h2>
          </div>
          <BigMatch
            leftTeam={this.state.teams[match.team1]}
            rightTeam={this.state.teams[match.team2]}
          />
          <MatchDetails
            when={match.when}
            leftTeam={this.state.teams[match.team1]}
            rightTeam={this.state.teams[match.team2]}
          />
        </div>
      );
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="rootDiv">
        <header>
          <ThreeScene />
          <h1>MOTIV</h1>
        </header>
        {this.renderBody()}
        <footer />
      </div>
    );
  }
}

export default App;
