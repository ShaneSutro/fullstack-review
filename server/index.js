const express = require('express');
let app = express();
let bodyParser = require('body-parser')
let github = require('../helpers/github')
let db = require('../database/index')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  console.log('/repos post request received')
  github.getReposByUsername(req.body.term)
    .then(response => {
      db.save(response.data)
      res.sendStatus(201)
    })
    .catch(err => {
      console.log('Error getting data from API:', err)
      res.sendStatus(400)
    })
});

app.get('/repos', function (req, res) {
  db.get()
    .then(data => {
      res.end(JSON.stringify(data))
    })
    .catch(err => res.sendStatus(400))
});

let port = 1128;

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}`);
});

