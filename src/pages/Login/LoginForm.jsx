import { Link } from 'react-router'
import { useState } from 'react'
import { Loading } from '../../components/Loading/Loading'
// import styles from './LoginForm.module.css'

function LoginForm({ handleSubmit, loading }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e, setter) => {
    setter(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit(email, password)
    clearValues()
  }

  const clearValues = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <section className="form-section">
      <div className="form-heading">
        <h2>Login</h2>
        <p>Enter your credentials to access your account</p>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => handleChange(e, setEmail)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => handleChange(e, setPassword)}
            required
          />
        </div>

        <button type="submit">{!loading ? 'Sign in' : <Loading size="small" />}</button>
      </form>
      <hr />
      <p className="form-alternate-option">
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </section>
  )
}

export default LoginForm
