import React, { useState } from 'react'
import ToastContext from './ToastContext'
import Toast from '../components/Toast/Toast'

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('error')

  const handleMessage = (message) => {
    setMessage(message)
  }

  const handleType = (type) => {
    if (type !== 'success' || type !== 'warning' || type !== 'error') {
      setType('error')
      throw new Error('type must be "sucess", "warning", or "error"')
    }
    setType(type)
  }

  const closeToast = () => {
    setMessage(null)
  }

  const RenderToast = () => {
    if (message) return <Toast message={message} type={type} onClose={closeToast} />
    return null
  }

  const value = {
    handleMessage,
    handleType,
    RenderToast,
  }

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
