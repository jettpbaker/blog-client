import React, { useState } from 'react'
import AuthContext from './AuthContext'
import { useNavigate } from 'react-router'
import parseJwt from '../lib/parseJwt'

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(() => {
    const token = localStorage.getItem('jwt')
    return !!token
  })

  const login = (token) => {
    localStorage.setItem('jwt', token)
    setIsAuth(true)
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    setIsAuth(false)
    navigate('/')
  }

  const checkExpiration = () => {
    const decodedToken = parseJwt()
    if (!decodedToken) return

    const currentTime = Math.floor(Date.now() / 1000)
    console.log('Token expiration:', decodedToken.exp, 'Current time:', currentTime)

    if (decodedToken.exp <= currentTime) {
      logout()
    }
  }

  const value = {
    isAuthenticated: isAuth,
    login,
    logout,
    checkExpiration,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
