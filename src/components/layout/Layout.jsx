import { Outlet } from 'react-router'
import styles from './Layout.module.css'
import { Link } from 'react-router'
import Logo from './Logo'
import isLoggedIn from '../../utils/auth'

function Nav() {
  const auth = isLoggedIn()
  console.log(auth)

  return (
    <nav>
      <ul>
        {auth ? (
          <>
            <li>Logout</li>
            <li>New post</li>
          </>
        ) : (
          <>
            <li>Login</li>
            <li>Sign Up</li>
          </>
        )}
      </ul>
    </nav>
  )
}

function Layout() {
  return (
    <>
      <header>
        <Link to="/" className={styles['logo-container']}>
          <Logo />
        </Link>
        <Nav />
        <div>☀️</div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
