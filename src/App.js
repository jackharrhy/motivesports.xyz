import React, { Component } from 'react';
import logo from './motv-temp.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>
            Motiv
          </h1>
        </header>
      </div>
    );
  }
}

export default App;
