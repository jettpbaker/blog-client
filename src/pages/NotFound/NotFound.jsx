import { Link } from 'react-router'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <main className={styles.main}>
      <h1>404</h1>
      <h3>This page has been smoked off ☁️</h3>
      <Link to="/">Return home</Link>
    </main>
  )
}

export default NotFound
