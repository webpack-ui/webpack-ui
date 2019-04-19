import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      greeting: 'hello world'
    }
  }

  render() {
    return (
      <div className="hey">{this.state.greeting}</div>
    );
  }
}

export default App;
