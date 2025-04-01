import styles from './Login.module.css'
import { Link } from 'react-router'
import { useState } from 'react'

function LoginForm({ handleSubmit }) {
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
    <section>
      <div className={styles.heading}>
        <h2>Login</h2>
        <p>Enter your credentials to access your account</p>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className={styles.formField}>
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

        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => handleChange(e, setPassword)}
            required
          />
        </div>

        <button type="submit">Sign in</button>
      </form>
      <hr />
      <p className={styles.signUp}>
        Don't have an account? <Link to="/sign-up">Sign up</Link>
      </p>
    </section>
  )
}

export default LoginForm
