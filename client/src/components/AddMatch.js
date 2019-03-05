import React from 'react';
import Downshift from 'downshift';
import {
  Button,
  Typography,
  Paper,
  TextField
} from '@material-ui/core';
import {DatePicker, TimePicker} from 'material-ui-pickers';

export default (props) => {
  return (
    <Paper>
      <Typography variant="h6">Add new match</Typography>
      <TextField
        value={props.team1}
        onChange={props.handleTeam1Change}
        label="First team"
        style={{margin: '0.25rem 0 0 0'}}
        fullWidth
      />
      <TextField
        value={props.team2}
        onChange={props.handleTeam2Change}
        label="Second team"
        style={{margin: '0.5rem 0 0 0'}}
        fullWidth
      />
      <DatePicker
        value={props.selectedTime}
        onChange={props.handleDateChange}
        placeholder="Date"
        style={{margin: '0.5rem 0 0 0'}}
        fullWidth
      />
      <TimePicker
        value={props.selectedTime}
        onChange={props.handleDateChange}
        placeholder="Time"
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
