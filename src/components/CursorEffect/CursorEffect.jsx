import styles from './CursorEffect.module.css'
import { useEffect, useRef } from 'react'

export function CursorEffect({ cursorPosition }) {
  const cursorCircleRef = useRef(null)
  const { x, y } = cursorPosition
  // Rough header height
  const HEADER_HEIGHT = '75px'

  useEffect(() => {
    if (cursorCircleRef.current) {
      cursorCircleRef.current.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50% - ${HEADER_HEIGHT}))`
      //   cursorCircleRef.current.style.transform = `translate(calc(${x}px), calc(${y}px))`
    }
  }, [x, y])

  return <div className={styles.cursorEffect} ref={cursorCircleRef}></div>
}
