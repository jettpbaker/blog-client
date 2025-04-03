import { CodeXml } from 'lucide-react'
import styles from './DevBanner.module.css'

export function DevBanner() {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className={styles.devBanner}>
        <div className={styles.devBannerContent}>
          <CodeXml className={styles.devBannerIcon} />
          <span className={styles.devBannerText}>development</span>
        </div>
      </div>
    )
  }
  return null
}
