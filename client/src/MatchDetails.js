import React, {Component} from 'react';
import {isEmpty} from 'lodash';
import moment from 'moment';

class MatchDetails extends Component {
  render() {
    const {
      leftTeam,
      rightTeam,
      when,
    } = this.props;

    if (isEmpty(leftTeam) || isEmpty(rightTeam)) {
      // TODO default to unknown icon/name
      return null;
    }

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
          {
            isEmpty(when) ? null : (
              <div className="matchDetails-timeStamp">
                <div>
                  <h5>{moment(when).format('dddd, MMMM Do')}</h5>
                  <h4>{moment(when).format('LT')}</h4>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default MatchDetails;
