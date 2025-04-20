import SignUpForm from './SignUpForm'
import { useAuth } from '../../hooks/useAuth'
import useFetch from '../../hooks/useFetch'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import useToast from '../../hooks/useToast'
const SERVER_URL = import.meta.env.VITE_SERVER_URL

function SignUp() {
  const { login } = useAuth()
  const { data, loading, error, executeFetch } = useFetch()
  const { showToast, RenderToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      console.error(error)
      showToast('error', error)
    }
  }, [error, showToast])

  useEffect(() => {
    if (data && data.token) {
      login(data.token)
      navigate('/')
    }
  }, [data, login, navigate])

  const handleSubmit = async (firstName, lastName, email, password) => {
    const url = `${SERVER_URL}/api/users/signup`
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
      <RenderToast />
    </main>
  )
}

export default SignUp
