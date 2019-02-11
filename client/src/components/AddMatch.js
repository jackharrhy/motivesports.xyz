import React, {Component} from 'react';
import {
  Button,
  Typography,
  Paper,
  TextField
} from '@material-ui/core';
import {DatePicker, TimePicker} from 'material-ui-pickers';

class AddMatch extends Component {
  render() {
    return (
      <Paper>
        <Typography variant="h6">Add new match</Typography>
        <TextField
          value={this.props.team1}
          onChange={this.props.handleTeam1Change}
          label="First team"
          style={{margin: '0.25rem 0 0 0'}}
          fullWidth
        />
        <TextField
          value={this.props.team2}
          onChange={this.props.handleTeam2Change}
          label="Second team"
          style={{margin: '0.5rem 0 0 0'}}
          fullWidth
        />
        <DatePicker
          value={this.props.selectedTime}
          onChange={this.props.handleDateChange}
          placeholder="Date"
          style={{margin: '0.5rem 0 0 0'}}
          fullWidth
        />
        <TimePicker
          value={this.props.selectedTime}
          onChange={this.props.handleDateChange}
          placeholder="Time"
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

export default AddMatch;
