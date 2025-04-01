import styles from './Layout.module.css'

import { Crosshair } from 'lucide-react'

function Logo() {
  return (
    <div className={styles.logo}>
      <Crosshair className={styles.crosshair} />
      <span className={styles['logo-text']}>
        blogging<span className={styles['logo-counter']}>counter</span>
      </span>
    </div>
  )
}

export default Logo
