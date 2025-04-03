import { useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'
import { useEffect } from 'react'
import LoginForm from './LoginForm'
import useToast from '../../hooks/useToast'
import useFetch from '../../hooks/useFetch'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const { data, loading, error, executeFetch } = useFetch()
  const { showToast, RenderToast } = useToast()

  useEffect(() => {
    if (error) {
      console.log(error)
      showToast('error', error)
    }
  }, [error, showToast])

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
      <RenderToast />
    </main>
  )
}

export default Login
