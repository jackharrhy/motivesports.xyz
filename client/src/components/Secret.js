import React, {Component} from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
} from '@material-ui/core';

class Secret extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secretValue: '',
    };
  }

  catchReturn = (event) => {
    if (event.key === 'Enter') {
      this.props.handleSecret(this.state.secretValue);
    }
  };

  handleSecretValueChange = (event) => {
    this.setState({secretValue: event.target.value});
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <DialogContent>
          <TextField
            autoFocus
            type="password"
            onKeyPress={this.catchReturn}
            value={this.state.secretValue}
            onChange={this.handleSecretValueChange}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

export default Secret;
