import { Outlet } from 'react-router'
import styles from './Layout.module.css'
import { Link } from 'react-router'
import Logo from './Logo'
import { useAuth } from '../../hooks/useAuth'

function Nav() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav>
      <ul className={styles.navBarList}>
        {isAuthenticated ? (
          <>
            <li>
              <button className={styles['logout-button']} onClick={logout}>
                Logout
              </button>
            </li>

            <li className={styles['link-accent']}>
              <Link to="post">New Post</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="login">Login</Link>
            </li>
            <li className={styles['last-nav-link']}>
              <Link to="sign-up">Sign Up</Link>
            </li>
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
      <Outlet />
    </>
  )
}

export default Layout
