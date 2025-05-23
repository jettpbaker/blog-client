import styles from './UserPosts.module.css'
import { Pencil } from 'lucide-react'
import { Link } from 'react-router'

export function Post({ post, isAdmin, published, id, handleUnPublishPost, handleDeletePost }) {
  const date = new Date(post.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={styles.postCard}>
      <div className={styles.cardBody}>
        <div className={styles.postHeader}>
          <div className={styles.postHeaderInfo}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postDate}>Written {date}</p>
          </div>
          <div className={styles.postHeaderActions}>
            <Link to={`/post/edit/${id}`} state={{ postContent: post.content }} className={styles.editButton}>
              <Pencil />
            </Link>
          </div>
        </div>
        <p className={styles.postDescription}>{post.description || 'No description provided.'}</p>
        <div className={styles.buttonContainer}>
          <button
            className={!published ? styles.publishButton : styles.unpublishButton}
            disabled={!isAdmin}
            onClick={() => handleUnPublishPost(id)}
          >
            {!published ? 'Publish' : 'Unpublish'}
          </button>
          <button className={styles.deleteButton} onClick={() => handleDeletePost(id)}>
            Delete post
          </button>
        </div>
      </div>
    </div>
  )
}
