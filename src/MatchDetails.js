import React, {Component} from 'react';

import moment from 'moment';

class MatchDetails extends Component {
  render() {
    const {
      leftTeam,
      rightTeam,
      when,
    } = this.props;

    return (
      <div className="matchDetails">
        <div>
          <div className="matchDetails-names">
            <div>
              <p>{rightTeam.name}</p>
            </div>
            <div>
              <p>{leftTeam.name}</p>
            </div>
          </div>
          <div className="matchDetails-timeStamp">
            <div>
              <h5>{moment(when).format('dddd, MMMM Do')}</h5>
              <h4>{moment(when).format('LT')}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchDetails;
