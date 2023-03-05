import React from 'react'
import { useCookies } from 'react-cookie'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { MainRoutes } from '../helpers/RouterConstants'
import Home from '../home/Home'

const Navigator = () => {
  return (
    <Router>
      <Routes>
        {MainRoutes.map(route => <Route key={route.path} path={route.path} element={<ValidatedUnauthorisedUser Component={route.Component} />} />)}
        <Route key='home' path='/' element={<AuthenticatedRoute Component={Home} />} />
      </Routes>
    </Router>
  )
}

const AuthenticatedRoute = ({ Component }) => {
  const [{ token }] = useCookies(['user-application']);
  if (token) {
    return <Component />
  }
  else {
    return <Navigate to='/login' />
  }
}

const ValidatedUnauthorisedUser = ({ Component }) => {
    const [{ token }] = useCookies(['user-application']);
  if (token) {
    return <Navigate to='/' />
  }
  else {
    return <Component />
  }
}

export default React.memo(Navigator)