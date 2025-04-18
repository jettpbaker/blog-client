import styles from './Loading.module.css'
import { LoaderCircle } from 'lucide-react'

export function Loading({ size = 'medium', className = '' }) {
  const sizeMap = {
    small: 16,
    medium: 24,
    large: 32,
  }

  return (
    <div className={`${styles.loadingContainer} ${className}`}>
      <LoaderCircle size={sizeMap[size]} className={styles.spinner} />
    </div>
  )
}
