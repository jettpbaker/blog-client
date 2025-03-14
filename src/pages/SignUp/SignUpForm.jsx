function SignUpForm() {
  return (
    <form action="">
      <label htmlFor="firstName">First name</label>
      <input type="text" name="firstName" />

      <label htmlFor="lastName">Last name</label>
      <input type="text" name="lastName" />

      <label htmlFor="email">Email</label>
      <input type="email" name="email" />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
    </form>
  )
}

export default SignUpForm
