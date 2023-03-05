import React from 'react'

const RepoListRow = ({ repo }) => {
  return (
    <div className='repo-container-items-row'>
      <div className='repo-heading-name'>{repo.name}</div>
      <div className='repo-heading-description'>{repo.description ?? 'NA'}</div>
      <div className='repo-heading-watcher-count count-data'>{repo.watchers}</div>
    </div>
  )
}

export default React.memo(RepoListRow)