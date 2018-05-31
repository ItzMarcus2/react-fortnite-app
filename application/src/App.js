import React, { Component } from 'react';
import { Column, Table, Grid } from 'react-virtualized';
import data from './Data/data.js';
import 'react-virtualized/styles.css';
import './App.css';

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  display: "flex",
  alignItems: "center"
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true
    }
  }

  getWins() {
    fetch('http://localhost:3000/', {
      method: 'get',
      headers: {'Content-Type': 'application/json'},
    }).then(response => response.json()).then(wins => {
      if (wins) {
        wins.forEach((item) => {
          console.log('item', item);
          data.push(item);
        })
      }
      this.setState({isLoading: false});
    })
  }

  componentDidMount() {
    this.getWins();
  }

  addWin = () => {
    const player = document.getElementById('player_name').value;
    const kills = document.getElementById('kills').value;

    fetch('http://localhost:3000/addwin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        player: player,
        kills: kills
      })
    })
    this.getWins();
    this.forceUpdate();
  }

  render() {
    const {isLoading} = this.state;
    return (
      <div>
        { isLoading ? <p>Waiting for data</p> :
          <div>
            <div className="header-container">
              <input id="player_name" type="text" placeholder="What is your player name?"/>
              <input id="kills" type="text" placeholder="How many kills did you get?"/>
              <button onClick={() => this.addWin()}>Add win</button>
            </div>
            <div style={tableStyle}>
              <Table
                stlye={{display: "flex"}}
                width={1903}
                height={1000}
                headerHeight={20}
                rowHeight={30}
                rowCount={data.length}
                rowGetter={({ index }) => data[index]}
                >
                <Column
                  label='Id'
                  dataKey='id'
                  width={600}
                />
                <Column
                  width={600}
                  label='Player'
                  dataKey='player'
                />
                <Column
                  width={600}
                  label='Kills'
                  dataKey='kills'
                />
                <Column
                  width={1000}
                  label='Date'
                  dataKey='date'
                />
              </Table>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default App;
