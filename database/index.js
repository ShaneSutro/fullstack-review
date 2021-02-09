const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useCreateIndex: true,
  autoIndex: true
});

let repoSchema = mongoose.Schema({
  repo_id: {
    type: Number,
    unique: true
  },
  id_user: Number,
  name: String,
  url: String,
  stars: Number,
  watchers: Number,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  for (var i = 0; i < data.length; i++) {
    var repo = new Repo()
    repo.repo_id = data[i].id
    repo.id_user = data[i].owner.id;
    repo.name = data[i].name;
    repo.url = data[i].html_url;
    repo.stars = data[i].stargazers_count;
    repo.watchers = data[i].watchers_count;
    repo.forks = data[i].forks_count;
    repo.save()
  }
}

module.exports.save = save;