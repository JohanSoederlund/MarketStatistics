import React, { Component } from 'react';
import './style/App.css';
import websocket from './websocket.js';

class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Table with stats
          </p>
          
        </header>
      </div>
    );
  }
}

export default App;
