import React, {Component} from 'react';

import api from '../utils/api';
import {Button} from '@material-ui/core';

class EditMatch extends Component {
  deleteSelf = async () => {
    const {
      matchId
    } = this.props;

    await api.remove('matches', matchId, this.props.secretToken);

    this.props.dataRefresh();
  };

  render() {
    return (
      <div className="editMatch">
        <Button
          style={{margin: '0 0 1rem 1rem'}}
          variant="contained"
          color="primary"
          onClick={this.deleteSelf}
        >
          Remove
        </Button>
      </div>
    );
  }
}

export default EditMatch;
