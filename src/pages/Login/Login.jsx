import { useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import Toast from '../../components/Toast/Toast'
import useFetch from '../../hooks/useFetch'

function Login() {
  const [toastMessage, setToastMessage] = useState(null)
  const [toastType, setToastType] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const { data, loading, error, executeFetch } = useFetch()

  const showToast = (message, type = 'error') => {
    setToastMessage(message)
    setToastType(type)
  }

  const hideToast = () => {
    setToastMessage(null)
  }

  useEffect(() => {
    if (error) {
      console.log(error)
      showToast(error, 'error')
    }
  }, [error])

  useEffect(() => {
    if (data && data.token) {
      login(data.token)
      navigate('/')
    }
  }, [data, login, navigate])

  const handleSubmit = async (email, password) => {
    const url = 'http://localhost:3000/auth/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }

    executeFetch(url, options)
  }

  return (
    <main className="form-main">
      <LoginForm handleSubmit={handleSubmit} loading={loading} />
      {toastMessage && <Toast message={toastMessage} type={toastType} onClose={hideToast} />}
    </main>
  )
}

export default Login
