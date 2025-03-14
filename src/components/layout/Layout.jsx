import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <header>
        <h1>Blogging Counter</h1>
        <nav>
          <ul>
            <li>Login</li>
            <li>Sign Up</li>
            <li>Logout</li>
            <li>New post</li>
          </ul>
        </nav>
        <div>☀️</div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
