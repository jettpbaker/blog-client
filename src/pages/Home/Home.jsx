import { Link } from 'react-router'
import { useMemo, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { PostContainer } from './PostContainer'
import { CursorEffect } from '../../components/CursorEffect/CursorEffect'
import styles from './Home.module.css'
import { useEffect } from 'react'
const API_URL = import.meta.env.VITE_API_URL

function Home() {
  const [cursorPosition, setCursorPosition] = useState(0, 0)

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

  useEffect(() => {
    const handlePointerMove = (e) => {
      const x = e.clientX
      const y = e.clientY

      setCursorPosition({ x, y })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <main className={styles.homeContainer}>
        <PostContainer />
        <div className={styles.blurOverlay}></div>
        <CursorEffect cursorPosition={cursorPosition} />
      </main>
    </>
  )
}

export default Home
