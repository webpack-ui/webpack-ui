import React from 'react';
import ReactDOM from 'react-dom';
import local from './local.module';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      greeting: 'hello worldd'
    }
  }

  render() {
    return (
      <div className={local.large}>{this.state.greeting}</div>
    );
  }
}

export default App;
