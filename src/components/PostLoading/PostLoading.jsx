import { LoaderCircle } from 'lucide-react'
import styles from './PostLoading.module.css'

export function PostLoading() {
  return (
    <div className={styles.loadingContainer}>
      <h2>Loading Posts</h2>
      <LoaderCircle />
    </div>
  )
}
