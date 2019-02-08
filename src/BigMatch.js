import React, {Component} from 'react';

class BigMatch extends Component {
  render() {
    const {
      leftTeam,
      rightTeam,
    } = this.props;

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
  }
}

export default BigMatch;
