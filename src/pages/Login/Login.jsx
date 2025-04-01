import { useNavigate } from 'react-router'
import LoginForm from './LoginForm'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

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
        throw new Error(errorData.message || `Signup failed with status: ${response.status}`)
      }

      const data = await response.json()
      login(data.token)
      navigate('/')
    } catch (err) {
      console.error('Login error:', err.message)
    }
  }

  return (
    <main>
      <LoginForm handleSubmit={handleSubmit} />
    </main>
  )
}

export default Login
