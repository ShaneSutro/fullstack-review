import React from 'react';
import RepoListRow from './RepoListRow.jsx'

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.

    <h2>Top 25:</h2>
    <table style={{ 'textAlign': 'center', 'border': '1px solid black'}}>
      <tbody>
        <tr>
          <th>Author</th>
          <th>Repo</th>
          <th>Stars | Watchers | Forks</th>
          <th>Repo Score</th>
        </tr>
        {props.repos.map((repo, index) => {
          if (index > 25) {
            return
          } else {
            return <RepoListRow repo={repo} key={repo._id} />
          }
        })}
      </tbody>
    </table>

  </div>
)

export default RepoList;