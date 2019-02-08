import React, {Component} from 'react';

class MatchDetails extends Component {
  render() {
    const {
      leftTeam,
      rightTeam,
    } = this.props;

    return (
      <div className="matchDetails">
        <div>
          <div>
            <p>{rightTeam.name}</p>
          </div>
          <div>
            <p>{leftTeam.name}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchDetails;
