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

  const getCursorPosition = (e) => {
    // The position values of the cursor is relative to the container it's in, so exludes the height of the header so the circle is offset
    // There's nothing precise about the +3 and -68, I just played around with it until the circle was centered on the cursor and it works fine
    const x = e.pageX
    const y = e.pageY

    setCursorPosition({ x, y })
  }

  return (
    <>
      <main className={styles.homeContainer}>
        <div className={styles.cursorContainer}></div>
        <CursorEffect cursorPosition={cursorPosition} />
        <PostContainer />
      </main>
    </>
  )
}

export default Home
