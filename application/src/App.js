import React, { Component } from 'react';
import { Column, Table, Grid } from 'react-virtualized';
import Swal from 'sweetalert2';
import firebase from 'firebase/app';
import config from './Firebase.js'
import 'firebase/database';
import 'react-virtualized/styles.css';
import './App.css';

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  fontSize: "20px"
}

class App extends Component {

  constructor() {
    super();

    this.app = firebase.initializeApp(config);
    this.database = this.app.database().ref().child('wins');

    this.state = {
      array: []
    }
  }

  updateData() {
    this.database.once('value').then(snapshot => {
      var array = [];
      var count = 1;
      snapshot.forEach(childSnapshot => {
        array.push({
          id: count,
          player: childSnapshot.val().player,
          kills: childSnapshot.val().kills,
          date: childSnapshot.val().date
        })
        count = count + 1;
      })
      this.setState({array: array});
    })
  }

  componentDidMount() {
    console.log('test');
    this.updateData();
  }

  addWin = () => {



    const player = document.getElementById('player_name').value;
    const kills = document.getElementById('kills').value;
    const date = new Date();

    if (player !== "" && parseInt(kills) || kills === '0') {
      Swal({
          type: 'success',
          title: '<span style="color: #BFD2FF">Your win has been added!</span>',
          showConfirmButton: false,
          background: 'rgba(57, 63, 84, 1)',
          timer: 1600
      })
      document.getElementById('player_name').value = '';
      document.getElementById('kills').value = '';

      this.database.push().set({
        player: player,
        kills: kills,
        date: date.toString()
      })
      this.updateData();
    } else {
      Swal({
          type: 'error',
          title: '<span style="color: #BFD2FF">Something went wrong..</span>',
          showConfirmButton: false,
          background: 'rgba(57, 63, 84, 1)',
          timer: 1600
      })
    }

  }

  render() {
    return (
          <div>
            <div className="header-container">
              <h1>Fortnite Wins</h1>
              <p>Add your win to the list below, and no don't lie!</p>
              <input id="player_name" type="text" placeholder="What is your player name?"/>
              <input id="kills" type="text" placeholder="How many kills did you get?"/>
              <button onClick={() => this.addWin()}><ion-icon name="add-circle-outline"></ion-icon></button>
            </div>
            <div style={tableStyle}>
              <Table
                width={1300}
                height={1000}
                headerHeight={20}
                rowHeight={50}
                rowCount={this.state.array.length}
                rowGetter={({ index }) => this.state.array[index]}
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
    );
  }
}

export default App;
