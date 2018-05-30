const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json())
app.use(cors());

const database = {
  wins: [
    {
      id: '1',
      player: 'ItzMarcus',
      kills: 7,
      winning_date: new Date()
    },
    {
      id: '2',
      player: 'ItzSabine',
      kills: 0,
      winning_date: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.wins);
})

app.post('/addwin', (req, res) => {
  database.wins.push({
    id: '3',
    player: req.body.player,
    kills: req.body.kills,
    winning_date: new Date()
  })
  res.send('added win')
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})


/*

/ --> res = this is working
/addwin --> POST = return the new win object

*/
