import { Button, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import useLoadUserDetails from '../../auth/login/custom-hooks/useLoadUserDetails'

const Header = () => {
  const [loading, , userDetails, loadeUserDetails] = useLoadUserDetails()
  const [, , removeCookie] = useCookies(['user-application'])
  const navigate = useNavigate()

  useEffect(() => {
    loadeUserDetails()
  }, [])

  const handleLogout = () => {
    removeCookie('token')
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div className='header-container'>
      {loading
        ? <CircularProgress />
        : <div className='header-profile-info'>
          <div>Name: {userDetails?.fullName}</div>
          <div>Email: {userDetails?.email}</div>
          <Button style={{ border: '1px solid whitesmoke', color: 'black' }} onClick={handleLogout}>Logout</Button>
        </div>}
    </div>
  )
}

export default Header