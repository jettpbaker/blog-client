import { useState } from 'react'
import { Link } from 'react-router'

function SignUpForm({ handleSubmit, loading = false }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e, setter) => {
    setter(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit(firstName, lastName, email, password)
    clearValues()
  }

  const clearValues = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  return (
    <section className="form-section">
      <div className="form-heading">
        <h2>Sign Up</h2>
        <p>Enter your credentials to create your account</p>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-field">
          <label htmlFor="firstName">First name</label>
          <input
            type="firstName"
            name="firstName"
            placeholder="Your first name"
            value={firstName}
            onChange={(e) => handleChange(e, setFirstName)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="lastName">Last name</label>
          <input
            type="lastName"
            name="lastName"
            placeholder="Your last name"
            value={lastName}
            onChange={(e) => handleChange(e, setLastName)}
            required
          />
        </div>

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

        <button type="submit">{!loading ? 'Sign up' : <LoaderCircle className="form-loading" />}</button>
      </form>
      <hr />
      <p className="form-alternate-option">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  )
}

export default SignUpForm
