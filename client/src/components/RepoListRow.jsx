import React from 'react';

const RepoListRow = (props) => (
  <tr>
    <td>{props.repo.by}</td>
    <td><a href={props.repo.url}>{props.repo.name}</a></td>
    <td>{props.repo.stars} | {props.repo.watchers} | {props.repo.forks}</td>
    <td>{props.repo.avgScore}</td>
  </tr>
)

export default RepoListRow;