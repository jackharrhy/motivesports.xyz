import React, { Component } from 'react';
import logo from './motv-temp.jpg';
import './App.css';

import ThreeScene from './ThreeScene';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ThreeScene />
          <h1>
            Motiv
          </h1>
        </header>
      </div>
    );
  }
}

export default App;
