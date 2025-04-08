import { useState } from 'react'
import { PostContainer } from './PostContainer'
import { CursorEffect } from '../../components/CursorEffect/CursorEffect'
import styles from './Home.module.css'
import { useEffect } from 'react'

function Home() {
  const [cursorPosition, setCursorPosition] = useState(0, 0)

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

  return (
    <>
      <main className={styles.homeContainer}>
        <div className={styles.homeContentContainer}>
          <h1>Posts</h1>
          <PostContainer />
        </div>
        <div className={styles.blurOverlay}></div>
        <CursorEffect cursorPosition={cursorPosition} />
      </main>
    </>
  )
}

export default Home
