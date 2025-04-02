import SignUpForm from './SignUpForm'
import { useAuth } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

function SignUp() {
  const { login } = useAuth()
  const { data, loading, error, executeFetch } = useFetch()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      console.log(error)
      // showToast(error, 'error')
    }
  }, [error])

  useEffect(() => {
    if (data && data.token) {
      login(data.token)
      navigate('/')
    }
  }, [data, login, navigate])

  const handleSubmit = async (firstName, lastName, email, password) => {
    const url = 'http://localhost:3000/auth/signup'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    }

    executeFetch(url, options)
  }

  return (
    <main className="form-main">
      <SignUpForm handleSubmit={handleSubmit} loading={loading} />
    </main>
  )
}

export default SignUp
