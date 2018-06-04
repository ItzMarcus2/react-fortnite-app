import React from 'react';
import firebase from 'firebase/app';
import convertDate from './Functions.js';
import 'firebase/database';

export function getFirebase(options) {
  if (!firebase.apps.length) {
    return firebase.initializeApp(options);
  } else {
    return firebase.apps[0];
  }
}

export function getDatabaseRef() {
  return getFirebase().database().ref().child('wins');
}

export function getData() {
  return new Promise(resolve => {
    getDatabaseRef().once('value').then(snapshot => {
      var array = [];
      var count = 1;
      var killCount = 0;
      snapshot.forEach(childSnapshot => {
        array.push({
          id: count,
          player: childSnapshot.val().player,
          kills: childSnapshot.val().kills,
          date: convertDate(childSnapshot.val().date)
        })
        count = count + 1;
        killCount = killCount + parseInt(childSnapshot.val().kills);
      })
      resolve([array, count, killCount]);
    })
  })
}

export function pushWin(player, kills, date) {
  getDatabaseRef().push().set({
    player: player,
    kills: parseInt(kills),
    date: date.toString()
  })
}

export function getBestWin() {
  return new Promise(resolve => {
    getDatabaseRef().orderByChild('kills').once('value').then(snapshot => {
      console.log(snapshot.val());
      //resolve([player, kills]);
    })
  })
}
