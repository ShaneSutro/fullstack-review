import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax('/repos', {
      method: 'POST',
      data: JSON.stringify({ term }),
      contentType: 'application/json',
      success: (err, data) => {
        console.log('err, data', err, data)
        this.componentDidMount()
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }

  componentDidMount() {
    $.ajax('/repos', {
      method: 'GET',
      success: (data) => {
        var repositories = JSON.parse(data)
        var tempData = [];
        for (var repo in repositories) {
          tempData.push([repo, repositories[repo].avgScore])
        }
        tempData = tempData.sort((a, b) => b[1] - a[1])
        var newState = []
        for (var i = 0; i < tempData.length; i++) {
          newState.push(repositories[tempData[i][0]])
        }
        this.setState({repos: newState})
      }
    })
  }
}

ReactDOM.render(<App />, document.getElementById('app'));