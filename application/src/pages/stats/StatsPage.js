import React, {Component} from 'react';
import {getBestWin, getData} from '../../Firebase.js';
import './StatsPage.css';

const flexContainer = {
  marginRight: "3%",
  marginLeft: "3%",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  alignItems: "center",
  alignContent: "center"
}

const flexChild = {
  padding: "1.2rem 1.4rem 1.2rem",
  width: "fit-content",
  background: "rgba(57, 63, 84, 0.8)",
  color: "#7881A1",
  fontSize: "18px"
}

class StatsPage extends Component {

  constructor() {
    super();

    this.state = {
      data: {
        wins: 0,
        kills: 0
      },
      win: {
        player: '',
        kills: 0
      }
    }
  }

  componentDidMount() {
    this.update();
  }

  async update() {
    const data = await getData();
    this.setState({data: {
      wins: data[1],
      kills: data[2]
    }})

    const winData = await getBestWin();
    this.setState({ win: {
      player: winData[0],
      kills: winData[1]
    }})
  }

  render() {
    return (
      <div>
        <div className="stats-header">
          <h1>Stats Page</h1>
          <p>This page, display a bit more data - although it's still in beta.</p>
        </div>
        <div style={flexContainer}>
          <div className="flexChild" style={flexChild}>
            <h1>Total wins</h1>
            <p>Tracking a total of <span>{this.state.data.wins} wins</span></p>
          </div>
          <div className="flexChild" style={flexChild}>
            <h1>Total kills</h1>
            <p>We're holding a total of <span>{this.state.data.kills} kills</span> in our database.</p>
          </div>
          <div className="flexChild" style={flexChild}>
            <h1>Best win</h1>
            <p><span>{this.state.win.player}</span> is currently holding the <span>best win</span>, with stunning <span>{this.state.win.kills} kills</span></p>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsPage;
