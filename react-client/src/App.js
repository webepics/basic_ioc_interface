import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';

import WebSocketManager from './WebSocketManager.js'
import PVTable from './PVComponents/PVTable'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <WebSocketManager />
          <PVTable template='$(p)$(card)BFStatus:fpgaConfigured' prefix='ak' pCount={36} cardCount={12} />
        </header>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
