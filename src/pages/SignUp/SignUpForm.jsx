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
  }

  return (
    <form action="" onSubmit={onSubmit}>
      <label htmlFor="firstName">First name</label>
      <input type="text" name="firstName" value={firstName} onChange={(e) => handleChange(e, setFirstName)} />

      <label htmlFor="lastName">Last name</label>
      <input type="text" name="lastName" value={lastName} onChange={(e) => handleChange(e, setLastName)} />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" value={email} onChange={(e) => handleChange(e, setEmail)} />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" value={password} onChange={(e) => handleChange(e, setPassword)} />

      <button type="submit">Submit</button>
    </form>
  )
}

export default SignUpForm
