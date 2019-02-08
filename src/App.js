import React, {Component} from 'react';
import './App.css';

import BigMatch from './BigMatch';
import MatchDetails from './MatchDetails';
import ThreeScene from './ThreeScene';

import teams from './teams.json';
import matches from './matchs.json';

let matchId = -1;
matches.forEach((match) => {
  matchId++;
  match.id = matchId;
  console.log(match);
});

class App extends Component {
  render() {
    return (
      <div className="rootDiv">
        <header>
          <ThreeScene />
          <h1>MOTIV</h1>
        </header>
        {
          matches.map((match) => (
            <div
              key={match.id}
            >
              <BigMatch
                leftTeam={teams[match.team1]}
                rightTeam={teams[match.team2]}
              />
              <MatchDetails
                when={match.when}
                leftTeam={teams[match.team1]}
                rightTeam={teams[match.team2]}
              />
            </div>
          ))
        }
        <footer />
      </div>
    );
  }
}

export default App;
