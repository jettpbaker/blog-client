import { Link } from 'react-router'
import { useMemo } from 'react'
import useFetch from './hooks/useFetch'
const API_URL = import.meta.env.VITE_API_URL

function App() {
  const url = `${API_URL}/posts`
  const options = useMemo(
    () => ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    []
  )

  const { loading, error } = useFetch(url, options)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>This is the home page of the app!</h1>
      <p>Here are some examples of links to other pages:</p>
      <nav>
        <ul>
          <li>
            <Link to="profile">Profile page</Link>
          </li>
        </ul>
      </nav>
      <div></div>
    </div>
  )
}

export default App
