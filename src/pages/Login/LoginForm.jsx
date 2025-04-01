import styles from './Login.module.css'
import { Link } from 'react-router'

function LoginForm() {
  return (
    <section>
      <div className={styles.heading}>
        <h2>Login</h2>
        <p>Enter your credentials to access your account</p>
      </div>
      <form action="">
        <div className={styles.formField}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="you@example.com" required />
        </div>

        <div className={styles.formField}>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" placeholder="••••••••" required />
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
