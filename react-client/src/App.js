import React, { Component } from 'react';
import './App.css';

import WebSocketManager from './WebSocketManager.js'

import PVTable from './PVComponents/PVTable'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <WebSocketManager />
          <PVTable template='$(p)$(card)BFStatus:fpgaConfigured' prefix='ak' pCount={36} cardCount={12} />
        </header>
      </div>
    );
  }
}

export default App;
