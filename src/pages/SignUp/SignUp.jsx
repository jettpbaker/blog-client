import SignUpForm from './SignUpForm'

const handleSubmit = (firstName, lastName, email, password) => {
  console.log(firstName, lastName, email, password)
}

function SignUp() {
  return <SignUpForm />
}

export default SignUp
