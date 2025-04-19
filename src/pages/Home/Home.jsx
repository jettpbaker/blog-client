import { useState } from 'react'
import { PostContainer } from './PostContainer'
import { CursorEffect } from '../../components/CursorEffect/CursorEffect'
import styles from './Home.module.css'
import { useEffect, useRef } from 'react'
import { useAuth } from '../../hooks/useAuth'

function Home() {
  const { checkExpiration } = useAuth()
  const [cursorPosition, setCursorPosition] = useState(0, 0)
  const containerRef = useRef(null)
  useEffect(() => {
    const handlePointerMove = (e) => {
      const x = e.clientX
      const scrollY = containerRef.current ? containerRef.current.scrollTop : 0
      const y = e.clientY + scrollY

      setCursorPosition({ x, y })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  useEffect(() => {
    checkExpiration()
  }, [checkExpiration])

  return (
    <>
      <main className={styles.homeContainer} ref={containerRef}>
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
