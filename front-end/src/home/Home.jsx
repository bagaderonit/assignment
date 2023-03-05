import React, { useEffect, useRef, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import SearchIcon from '@mui/icons-material/Search';
import './home.css'
import useGetUserByUsername from '../helpers/custom-hooks/useGetUserByUsername';
import { CircularProgress } from '@mui/material';
import RepoListRow from './components/RepoListRow';
import Header from './components/Header';

let selectedUser
const Home = () => {
  const [usernameInput, setUsernameInput] = useState('')
  const ref = useRef(null)
  const [loading, error, gitUser, repos, loginUser] = useGetUserByUsername()

  const handleUsernameSubmit = (e) => {
    e.preventDefault()
    loginUser(usernameInput.trim())
    selectedUser = usernameInput
  }

  useEffect(() => {
    // autofocusing on the input field after page loads
    ref.current.focus()
  }, [])


  return (
    <div className='home'>
    <Header />
      <form className='input-group-search' onSubmit={handleUsernameSubmit}>
        <input ref={ref} placeholder='Enter git username' className='gitinput-name' value={usernameInput} onChange={e => setUsernameInput(e.target.value)} />
        <SearchIcon onClick={handleUsernameSubmit} className='search-icon' fontSize='medium' />
      </form>
      {loading ? <div className='loader-container'><CircularProgress color="success" /></div> : null}
      {error ? <div className='error-text'>{error}</div> : null}
      {repos.length > 0 ? <Card sx={{ width: 800, padding: '10px 20px', height: '650px' }}>
        <CardContent>
          <div variant="h6" component="div">
            <div className='git-profile-container'>
              <img src={gitUser.avatarUrl} alt='avatar' height={100} width={100} />
              <div className='git-username'>{gitUser.name ?? selectedUser}</div>
            </div>
          </div>
          <div>
            <div className='repo-container-items-row row-heading'>
              <div className='repo-heading-name'>Name</div>
              <div className='repo-heading-description'>Description</div>
              <div className='repo-heading-watcher-count'>Watcher's Count</div>
            </div>
            <div className='repo-list-container'>
              {repos.map(repo => <RepoListRow key={repo.id} repo={repo} />)}
            </div>
          </div>
        </CardContent>
      </Card> : null}
    </div>
  )
}

export default React.memo(Home)