import React from 'react';
import {isEmpty} from 'lodash';

export default (props) => {
    const {leftTeam, rightTeam} = props;
    if (isEmpty(leftTeam) || isEmpty(rightTeam)) {
      // TODO default to unknown icon/name
      return null;
    }

    return (
      <div className="bigMatch">
        <div>
          <img src={leftTeam.img.square} alt={leftTeam.name} />
        </div>
        <div>
          <p>VS</p>
        </div>
        <div>
          <img src={rightTeam.img.square} alt={rightTeam.name} />
        </div>
      </div>
    );
};
