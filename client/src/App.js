import React, {Component} from 'react';
import {sortBy} from 'lodash';
import {Button} from '@material-ui/core';

import './styles/App.scss';
import {
  Secret,
  BigMatch,
  MatchDetails,
  ThreeScene,
  EditPage,
} from './components';
import api from './utils/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: {},
      matches: [],
      showSecret: false,
      canEdit: false,
      secretToken: null,
    };
  }

  async getTeams() {
    const teams = await api.get('teams');
    this.setState({teams});
  }

  async getMatches() {
    const matches = await api.get('matches');
    this.setState({matches: sortBy(matches, 'when')});
  }

  componentDidMount() {
    this.dataRefresh();
  }

  dataRefresh = () => {
    this.getMatches();
    this.getTeams();
  };

  openSecret = () => {
    this.setState({showSecret: true});
  };

  handleClose = () => {
    this.setState({showSecret: false});
  };

  handleSecret = async (secretValue) => {
    const secretToken =  await api.post('secret', {secret: secretValue});
    if (secretToken.length > 0) {
      this.setState({
        showSecret: false,
        secretToken,
        canEdit: true,
      });
    }
  };

  renderBody = () => {
    let prevDay;
    return Object.entries(this.state.matches).map(([id, match]) => {
      if (prevDay !== undefined) {
        // do something
      }
      return (
        <div key={id}>
          <div className="daySplitter">
            <h2>{/*moment(match.when).format('MMMM Do, YYYY')*/}</h2>
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
    return (
      <div className="rootDiv">
        <header>
          <ThreeScene />
          <h1>MOTIV</h1>
        </header>
        {
          this.state.canEdit ? (
            <EditPage
              dataRefresh={this.dataRefresh}
              secretToken={this.state.secretToken}
            />
          ) : null
        }
        {this.renderBody()}
        <footer>
          <div className="secret">
            <Secret
              open={this.state.showSecret}
              handleClose={this.handleClose}
              handleSecret={this.handleSecret}
            />
            <Button onClick={this.openSecret}>
              gabs only
            </Button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
