import React, {Component} from 'react';
import {
  Button,
  Typography,
  Paper,
  TextField
} from '@material-ui/core';

class AddTeam extends Component {
  render() {
    return (
      <Paper>
        <Typography variant="h6">Add new team</Typography>
        <TextField
          value={this.props.teamName}
          onChange={this.props.handleTeamNameChange}
          label="Team name"
          style={{margin: '0.25rem 0 0 0'}}
          fullWidth
        />
        <TextField
          value={this.props.squareImgURL}
          onChange={this.props.handleSquareImgURLChange}
          label="Square team image URL"
          style={{margin: '0.5rem 0 0 0'}}
          fullWidth
        />
        <Button
          style={{margin: '0.5rem 0 0 0'}}
          onClick={this.props.submit}
        >
          <Typography>Submit</Typography>
        </Button>
      </Paper>
    );
  }
}

export default AddTeam;
