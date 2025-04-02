import SignUpForm from './SignUpForm'
import { useAuth } from '../../context/AuthContext'

function SignUp() {
  const { login } = useAuth()

  const handleSubmit = async (firstName, lastName, email, password) => {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Signup failed with status: ${response.status}`)
    }

    const data = await response.json()
    login(data.token)
  }

  return (
    <main className="form-main">
      <SignUpForm handleSubmit={handleSubmit} />
    </main>
  )
}

export default SignUp
