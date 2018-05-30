import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch('http://localhost:3000/').then(res => res.json()).then(data => console.log(data));
  }

  addWin = () => {
    fetch('http://localhost:3000/addwin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "player": "New Player",
        "kills": "9"
      })
    })
  }

  render() {
    return (
      <div>
        {this.addWin()}
      </div>
    );
  }
}

export default App;
