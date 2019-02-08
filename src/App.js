import React, {Component} from 'react';
import './App.css';

import ThreeScene from './ThreeScene';

class App extends Component {
  render() {
    return (
      <div className="rootDiv">
        <header>
          <ThreeScene />
          <h1>MOTIV</h1>
        </header>
      </div>
    );
  }
}

export default App;
