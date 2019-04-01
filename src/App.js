import React, { Component } from 'react';

import './App.css';
import Speaker from './Speaker';

class App extends Component {
  state = {
    message: 'nothing to say',
  };

  render() {
    return (
      <div className="App">
        <Speaker message={this.state.message} speak={this.speak} />
      </div>
    );
  }

  speak = () => {
    this.setState({ message: 'you are not mocking me' });
  };
}

export default App;
