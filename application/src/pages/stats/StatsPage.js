import React, {Component} from 'react';
import {getBestWin} from '../../Firebase.js';

class StatsPage extends Component {

  async test() {
    const data = await getBestWin();
    console.log(data[0]);
    console.log(data[1]);
  }

  render() {
    this.test();
    return (
      <div>

      </div>
    );
  }
}

export default StatsPage;
