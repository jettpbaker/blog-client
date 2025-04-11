import { Outlet } from 'react-router'
import styles from './Layout.module.css'
import { Link } from 'react-router'
import Logo from './Logo'
import { useAuth } from '../../hooks/useAuth'
import GitHub from '../../assets/github.svg'

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
  const { isAuthenticated } = useAuth()
  return (
    <>
      <header>
        <Link to="/" className={styles['logo-container']}>
          <Logo />
        </Link>
        <Nav />
      </header>
      <Outlet />
      <footer className={styles.layoutFooter}>
        <div className={styles.repo}>
          <Link to="https://github.com/jettpbaker/blog-client" className={styles.githubLink}>
            <img src={GitHub} alt="" />
          </Link>
        </div>
        <div className={styles.footerContent}>{isAuthenticated && <Link>My posts</Link>}</div>
      </footer>
    </>
  )
}

export default Layout
