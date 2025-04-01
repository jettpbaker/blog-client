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
            <Link to="logout">
              <li>Logout</li>
            </Link>
            <Link to="new-post">
              <li className="link-accent">New post</li>
            </Link>
          </>
        ) : (
          <>
            <Link to="login">
              <li>Login</li>
            </Link>
            <Link to="sign-up">
              <li>Sign Up</li>
            </Link>
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
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
