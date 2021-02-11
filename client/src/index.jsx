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
    console.log('Hitting endpoint http://localhost:1128/repos')
    $.ajax('http://localhost:1128/repos', {
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
    $.ajax('http://localhost:1128/repos', {
      method: 'GET',
      success: (data) => {
        this.setState({repos: JSON.parse(data)})
      }
    })
  }
}

ReactDOM.render(<App />, document.getElementById('app'));