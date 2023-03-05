import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import useLoginUser from './custom-hooks/useLoginUser'
import './login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, error, loginUser] = useLoginUser()

  const handleFormdataChange = (e) => {
    const { name, value } = e.target
    setFormData(oldData => ({ ...oldData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginUser(formData)
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="email" name="email" required onChange={handleFormdataChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required onChange={handleFormdataChange} />
        </div>
        {error ? <div className='error-message'>{error}</div> : null}
        {loading ? <div className='loader-container'><CircularProgress color="success" /></div> : <button type="submit">Sign In</button>}
        <span className='mt-3'>Don't have an account? <Link to='/signup'>Sign Up</Link></span>
      </form>
    </div>
  )
}

export default React.memo(Login)