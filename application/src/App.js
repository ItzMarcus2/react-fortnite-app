import React, { Component } from 'react';
import { Column, Table, Grid, SortDirection } from 'react-virtualized';
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

const hrStyle = {
  width: "504px",
  marginLeft: "0%",
  marginRight: "auto"
}

class App extends Component {

  constructor() {
    super();

    this.app = firebase.initializeApp(config);
    this.database = this.app.database().ref().child('wins');

    this.state = {
      array: [],
      wins: 0,
      kills: 0,
      sortBy: 'player',
      sortDirection: 'ASC',
      searchField: ''
    }

    this.sortThis = this.sortThis.bind(this);
  }

  sortThis({defaultSortDirection, event, sortBy, sortDirection}) {
    const list = this.state.array.sort((a, b) => {
      if (sortDirection === SortDirection.ASC) {
        if (sortBy === 'kills' || sortBy === 'id') {
          return a[sortBy] - b[sortBy];
        } else {
          return a[sortBy] > b[sortBy];
        }

      }
      if (sortBy === 'kills' || sortBy === 'id') {
        return b[sortBy] - a[sortBy];
      } else {
        return a[sortBy] < b[sortBy];
      }
    })
    this.setState({array: list, sortDirection: sortDirection, sortBy: sortBy});
  }

  convertDate(string) {

    var date = new Date(string);
    var dd = date.getDate();
    var mm = date.getMonth()+1;

    var yyyy = date.getFullYear();

    if (dd < 10) {
      dd='0'+dd;
    }

    if (mm < 10) {
      mm='0'+mm;
    }

    var newString = dd+'/'+mm+'/'+yyyy;
    return newString;
  }

  updateData() {
    this.database.once('value').then(snapshot => {
      var array = [];
      var count = 1;
      var killCount = 0;
      snapshot.forEach(childSnapshot => {
        array.push({
          id: count,
          player: childSnapshot.val().player,
          kills: childSnapshot.val().kills,
          date: this.convertDate(childSnapshot.val().date)
        })
        count = count + 1;
        killCount = killCount + parseInt(childSnapshot.val().kills);
      })
      if (this.state.wins === 0 && this.state.kills === 0) {
        this.setState({
          wins: count - 1,
          kills: killCount
        })
      }
      this.setState({array: array});
    })
  }

  componentDidMount() {
    this.updateData();
    setTimeout(() => {
      var dateString = this.state.array[0].date;
      var date = new Date(dateString);
      var dd = date.getDate();
      var mm = date.getMonth()+1;

      var yyyy = date.getFullYear();

      if (dd < 10) {
        dd='0'+dd;
      }

      if (mm < 10) {
        mm='0'+mm;
      }

      var newString = dd+'/'+mm+'/'+yyyy;
      console.log(date.getDate());
      console.log(newString);
    }, 2000);

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

  onSearchChnage = (event) => {
    this.setState({searchField: event.target.value});
  }

  render() {
    const dataToDisplay = this.state.array.filter(item => {
      return item.player.toLowerCase().includes(this.state.searchField.toLowerCase());
    })
    return (
          <div>
            <div className="header-container">
              <div>
                <h1>Fortnite Wins</h1>
                <p>Add your win to the list below, and no don't lie!</p>
                <input className="input" id="player_name" type="text" placeholder="What is your player name?"/>
                <input className="input" id="kills" type="text" placeholder="How many kills did you get?"/>
                <button onClick={() => this.addWin()}><ion-icon name="add-circle-outline"></ion-icon></button>
                <div className="search-container">
                  <input id="search" type="text" placeholder="Search for a player.." onChange={this.onSearchChnage}/>
                </div>
              </div>
              <hr style={hrStyle}/>
              <div>
                <p className="tracking">Currently tracking <span className="tracking-span">{this.state.wins}</span> wins and <span className="tracking-span">{this.state.kills}</span> kills</p>
              </div>
            </div>
            <div style={tableStyle}>
              <Table
                width={1300}
                height={1000}
                headerHeight={20}
                rowHeight={50}
                rowCount={dataToDisplay.length}
                rowGetter={({ index }) => dataToDisplay[index]}
                sort={this.sortThis}
                sortBy={this.state.sortBy}
                sortDirection={this.state.sortDirection}
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
