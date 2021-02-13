const mongoose = require('mongoose');
console.log('Environment:', process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', (err) => { console.log(err) })
mongoose.connection.on('open', () => { console.log('Connected!') })


let repoSchema = mongoose.Schema({
  repo_id: {
    type: Number,
    unique: true,
    dropDups: true
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
  Repo.init().then(() => {
    Repo.find((err, repos) => {
      initialCount = Object.keys(repos).length
    })
    for (var i = 0; i < data.length; i++) {
      var repo = new Repo();
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
  })
    .catch(err => { })
}

let createOrUpdate = async (data) => {
  for (var i = 0; i < data.length; i++) {
    var record = {}
    // record.repo_id = data[i].id
    record.id_user = data[i].owner.id;
    record.by = data[i].owner.login;
    record.name = data[i].name;
    record.url = data[i].html_url;
    record.stars = data[i].stargazers_count;
    record.watchers = data[i].watchers_count;
    record.forks = data[i].forks_count;
    record.avgScore = Math.floor((data[i].stargazers_count + data[i].watchers_count + data[i].forks) / 3)
    await Repo.findOneAndUpdate({ repo_id: data[i].id }, record, { new: true, upsert: true })
  }
}

let get = () => {
  console.log('database file - pulling info from Atlas...')
  return new Promise((resolve, reject) => {
    Repo.find((err, repos) => {
      if (err) {
        reject(err);
      } else {
        resolve(repos);
      }
    })
  })
}

module.exports.save = save;
module.exports.get = get;
module.exports.createOrUpdate = createOrUpdate;