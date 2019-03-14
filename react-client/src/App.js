import React, { Component } from 'react';
import './App.css';

import WebSocketManager from './WebSocketManager.js'

import PVTable from './PVComponents/PVTable'
import PVBarGraph from './PVComponents/PVBarGraph'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <WebSocketManager />
          <PVTable template='$(p)$(card)BFStatus:fpgaConfigured' prefix='ak' pCount={36} cardCount={12} />
          <PVBarGraph template="$(p):paf:ctrl:adc1:pafAvTemp" macro="ak{01..36}" width={800} height={200}/>
        </header>
      </div>
    );
  }
}

export default App;
