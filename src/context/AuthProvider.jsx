import React, { useState } from 'react'
import AuthContext from './AuthContext'
import { useNavigate } from 'react-router'

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

  const value = {
    isAuthenticated: isAuth,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
