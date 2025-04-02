import { useNavigate } from 'react-router'
import LoginForm from './LoginForm'
import { useAuth } from '../../context/AuthContext'
import Toast from '../../components/Toast/Toast'
import { useState } from 'react'

function Login() {
  const [toastMessage, setToastMessage] = useState(null)
  const [toastType, setToastType] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const showToast = (message) => {
    setToastMessage(message)
  }

  const hideToast = () => {
    setToastMessage(null)
  }

  const handleSubmit = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()

        if (response.status === 401) {
          setToastType('warning')
          showToast(errorData.message || 'Invalid email or password')
        } else {
          setToastType('error')
          showToast(errorData.message || `Request failed with status ${response.status}`)
        }
        return
      }

      const data = await response.json()
      login(data.token)
      navigate('/')
    } catch (err) {
      setToastType('error')
      showToast('Unable to connect to the server. Please try again later.')
      console.error('Login error:', err.message)
    }
  }

  return (
    <main>
      <LoginForm handleSubmit={handleSubmit} />
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={hideToast} />}
    </main>
  )
}

export default Login
