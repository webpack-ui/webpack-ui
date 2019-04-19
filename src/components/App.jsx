import React from 'react';
import ReactDOM from 'react-dom';
// import '../../styles.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      greeting: 'hello world'
    }
  }

  render() {
    return (
      <div>{this.state.greeting}</div>
    );
  }
}

export default App;
