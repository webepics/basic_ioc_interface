import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, blueGrey, teal, green, orange, red } from '@material-ui/core/colors';
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';

import Header from './components/Header.js'
import WebSocketManager from './WebSocketManager.js'
import routes from './routes/index.js'

const theme = createMuiTheme({
  palette: {
    primary: {
      ...blue, 
      main:blue[500]
    },
    secondary: {
      ...teal, 
      main:teal[500]},
    info: {
      ...blueGrey, 
      main:blueGrey[500]},
    success: {
      ...green, 
      main:green[500]},
    warning: {
      ...orange, 
      main:orange[500]},
    error: {
      ...red, 
      main:red[500]},
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
        <div className="App">
            <Header/>
            <WebSocketManager />
            <div className="App-body">
                 {routes.map((prop, key) => {
                     return <Route path={prop.path} exact={prop.exact} key={key} component={prop.component} />;
                 })}
            </div>
        </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;


