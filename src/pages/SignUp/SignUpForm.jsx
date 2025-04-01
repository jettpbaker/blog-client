import { useState } from 'react'

function SignUpForm({ handleSubmit }) {
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
    <form action="" onSubmit={onSubmit}>
      <label htmlFor="firstName">First name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={firstName}
        onChange={(e) => handleChange(e, setFirstName)}
        required
      />

      <label htmlFor="lastName">Last name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={lastName}
        onChange={(e) => handleChange(e, setLastName)}
        required
      />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" value={email} onChange={(e) => handleChange(e, setEmail)} required />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => handleChange(e, setPassword)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default SignUpForm
