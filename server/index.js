const express = require('express');
let app = express();
let bodyParser = require('body-parser')
let github = require('../helpers/github')
let db = require('../database/index')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  console.log(req.body)
  github.getReposByUsername(req.body.term)
    .then(response => {
      db.save(response.data)
    })
    .catch(err => console.log('Error getting data from API:', err))
  res.sendStatus(201)
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

