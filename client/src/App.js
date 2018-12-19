import React, { Component } from 'react';
import './App.css';

import PVRawValue from './PVComponents/PVRawValue'
import PVLED from './PVComponents/PVLed'
import PVHistogram from './PVComponents/PVHistogram'
import WebSocketManager from './WebSocketManager'

class App extends Component {
  pvIds = [
    'random_walk:x',
    'simple:A',
    'simple:B',
  ]
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <WebSocketManager />
          <p>simple:A</p>
          <PVLED pvId='simple:A'/>
          <PVHistogram pvId='random_walk:x' />
          { this.pvIds.map(pvId => (
            <div key={pvId}>
              <p>{pvId}</p>
              <PVRawValue pvId={pvId} />
            </div>
          ))}
          
        </header>
      </div>
    );
  }
}


export default App;
