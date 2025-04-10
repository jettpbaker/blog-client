import styles from './PostCard.module.css'
import { Link } from 'react-router'

export function PostCard({ title, author, description, published, id }) {
  const date = new Date(published).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const linkUrl = `/post/${id}`

  return (
    <div className={styles.postContainer}>
      <Link className={styles.postTitle} to={linkUrl}>
        {title}
      </Link>
      <p className={styles.postAuthor}>
        Written by <span>{author}</span>
      </p>
      <p className={styles.postDescription}>{description}</p>
      <p className={styles.postPublished}>
        Written <span>{date}</span>
      </p>
    </div>
  )
}
