import React, { Component } from 'react';

import './App.css';
import Home from "./components/home.js"
import About from "./components/about.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
        <br />
        <About />
      </div>
    );
  }
}

export default App;
