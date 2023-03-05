import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useLoginUser from '../login/custom-hooks/useLoginUser';
import './sign-up.css'
function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordMatchError, setPasswordMatchError] = useState('')
  const [loading, error, loginUser] = useLoginUser()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    setPasswordMatchError('')
    e.preventDefault();
    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      return setPasswordMatchError('Password and confirm password must be same')
    }
    loginUser(formData, true)
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>
      {passwordMatchError ? <div className='error-container'>{passwordMatchError}</div> : null}
      {error ? <div className='error-container'>{error}</div> : null}
      {loading ? <div className='loader-container'><CircularProgress /></div> : <button type="submit">Sign Up</button>}
      <span className='mt-3'>Already have an account? <Link to='/login'>Sign In</Link></span>
    </form>
  );
}

export default React.memo(Signup)
