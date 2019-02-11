import React, {Component} from 'react';

import AddMatch from './AddMatch';
import AddTeam from './AddTeam';
import api from '../utils/api';

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team1: '',
      team2: '',
      selectedTime: null,
      teamName: '',
      squareImgURL: '',
    };
  }

  handleTeam1Change = (event) => {
    this.setState({team1: event.target.value});
  }
  handleTeam2Change = (event) => {
    this.setState({team2: event.target.value});
  }
  handleDateChange = (selectedTime) => {
    this.setState({selectedTime});
  };

  handleTeamNameChange = (event) => {
    this.setState({teamName: event.target.value});
  }
  handleSquareImgURLChange = (event) => {
    this.setState({squareImgURL: event.target.value});
  }

  submitMatch = async () => {
    const {
      team1,
      team2,
      selectedTime: when,
    } = this.state;

    const matchId = await api.post('matches', {
      team1,
      team2,
      when: when ? when.utc() : when,
    }, this.props.secretToken);

    console.log('POST matches respose:', matchId);
    this.props.dataRefresh();
  };

  submitTeam = async () => {
    const {
      teamName,
      squareImgURL,
    } = this.state;

    const name = await api.post('teams', {
      name: teamName,
      img: {
        square: squareImgURL,
      },
    }, this.props.secretToken);

    console.log('POST teams respose:', name);
    this.props.dataRefresh();
  };

  render() {
    return (
      <div className="editor">
        <div>
          <AddMatch
            team1={this.state.team1}
            team2={this.state.team2}
            selectedTime={this.state.selectedTime}
            handleTeam1Change={this.handleTeam1Change}
            handleTeam2Change={this.handleTeam2Change}
            handleDateChange={this.handleDateChange}
            submit={this.submitMatch}
          />
          <AddTeam
            teamName={this.state.teamName}
            squareImgURL={this.state.squareImgURL}
            handleSquareImgURLChange={this.handleSquareImgURLChange}
            handleTeamNameChange={this.handleTeamNameChange}
            submit={this.submitTeam}
          />
        </div>
      </div>
    );
  }
}

export default EditPage;
