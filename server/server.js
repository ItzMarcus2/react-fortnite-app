const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'marcus',
    password : '',
    database : 'fortnite-app'
  }
});

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.get('/', (req, res) => {
  knex.select('*').from('wins').then(wins => {
    res.json(wins);
  })
})

app.post('/addwin', (req, res) => {
  knex('wins').insert({player: req.body.player, kills: req.body.kills, date: new Date()}).then(win => {
    knex.select('*').from('wins').then(wins => {
      res.json(wins);
    })
  });
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})


/*

/ --> res = this is working
/addwin --> POST = return the new win object

*/
