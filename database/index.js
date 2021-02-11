const mongoose = require('mongoose');
console.log(process.env.MONGODB_URI);
var promise = mongoose.createConnection(process.env.MONGODB_URI)
.then(db => console.log('connected!'))
// mongoose.connect(process.env.MONGODB_URI, {
//   useMongoClient: true,
//   useCreateIndex: true,
//   autoIndex: true
// });

let repoSchema = mongoose.Schema({
  repo_id: {
    type: Number,
    unique: true
  },
  id_user: Number,
  by: String,
  name: String,
  url: String,
  stars: Number,
  watchers: Number,
  forks: Number,
  avgScore: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {
  for (var i = 0; i < data.length; i++) {
    var repo = new Repo()
    repo.repo_id = data[i].id
    repo.id_user = data[i].owner.id;
    repo.by = data[i].owner.login;
    repo.name = data[i].name;
    repo.url = data[i].html_url;
    repo.stars = data[i].stargazers_count;
    repo.watchers = data[i].watchers_count;
    repo.forks = data[i].forks_count;
    repo.avgScore = Math.floor((data[i].stargazers_count + data[i].watchers_count + data[i].forks) / 3)
    repo.save()
  }
}

let get = () => {
  return new Promise((resolve, reject) => {
    Repo.find(null, null, { limit: 25, sort: { avgScore: 'desc', name: 'asc' } }, (err, repos) => {
      if (err) {
        reject(err)
      } else {
        resolve(repos)
      }
    })
  })
}

module.exports.save = save;
module.exports.get = get;