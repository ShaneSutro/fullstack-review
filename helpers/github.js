const axios = require('axios');
// const config = require('../config.js');
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

let getReposByUsername = (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  console.log(username)
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };
  return axios.get(options.url, options)
}

module.exports.getReposByUsername = getReposByUsername;