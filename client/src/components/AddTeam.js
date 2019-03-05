import React from 'react';
import {
  Button,
  Typography,
  Paper,
  TextField
} from '@material-ui/core';

export default (props) => {
  return (
    <Paper>
      <Typography variant="h6">Add new team</Typography>
      <TextField
        value={props.teamName}
        onChange={props.handleTeamNameChange}
        label="Team name"
        style={{margin: '0.25rem 0 0 0'}}
        fullWidth
      />
      <TextField
        value={props.squareImgURL}
        onChange={props.handleSquareImgURLChange}
        label="Square team image URL"
        style={{margin: '0.5rem 0 0 0'}}
        fullWidth
      />
      <Button
        style={{margin: '0.5rem 0 0 0'}}
        onClick={props.submit}
      >
        <Typography>Submit</Typography>
      </Button>
    </Paper>
  );
};
