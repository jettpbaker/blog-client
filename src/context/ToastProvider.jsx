import { useState, useCallback, useMemo } from 'react'
import ToastContext from './ToastContext'
import Toast from '../components/Toast/Toast'

export const ToastProvider = ({ children }) => {
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('error')

  const closeToast = useCallback(() => {
    setMessage(null)
  }, [])

  const showToast = useCallback(
    (type = 'error', message = '') => {
      const validTypes = ['success', 'warning', 'error']
      if (!validTypes.includes(type)) {
        console.error(`Invalid toast type: ${type}`)
        setType('error')
        setMessage(message)
        return
      }
      setType(type)
      setMessage(message)

      const timer = setTimeout(() => {
        closeToast()
      }, 5000)

      return () => clearTimeout(timer)
    },
    [closeToast]
  )

  const RenderToast = useCallback(() => {
    if (message) return <Toast message={message} type={type} onClose={closeToast} />
    return null
  }, [closeToast, message, type])

  const value = useMemo(
    () => ({
      showToast,
      RenderToast,
    }),
    [showToast, RenderToast]
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
