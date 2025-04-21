import styles from './Comment.module.css'
import { Trash } from 'lucide-react'
import { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import useCache from '../../hooks/useCache'
const SERVER_URL = import.meta.env.VITE_SERVER_URL

export function Comment({ comment, postId, onDeleteComment }) {
  const [isAuthor, setIsAuthor] = useState(false)
  const { data, executeFetch } = useFetch()
  const { cacheDelete } = useCache()
  const token = localStorage.getItem('jwt')

  useEffect(() => {
    if (!token) return

    const url = `${SERVER_URL}/api/users/me`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    executeFetch(url, options)
  }, [executeFetch, token])

  useEffect(() => {
    if (!comment.author.id) return
    if (data && data.id === comment.author.id) {
      setIsAuthor(true)
    }
  }, [data, comment, setIsAuthor])

  const handleDelete = () => {
    const url = `${SERVER_URL}/api/posts/comments/${comment.id}`
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    // Remove from UI immediately
    onDeleteComment(comment.id)

    // Clear cache and send delete request
    cacheDelete(`${SERVER_URL}/api/posts/${postId}/comments`)
    executeFetch(url, options)
  }

  const fullName = `${comment.author.firstName} ${comment.author.lastName}`
  const date = new Date(comment.createdAt).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <h3 className={styles.commentAuthor}>{fullName}</h3>
        {isAuthor && (
          <button className={styles.deleteButton} onClick={handleDelete} aria-label="Delete comment">
            <Trash size={16} />
          </button>
        )}
      </div>
      <p className={styles.commentDate}>{date}</p>
      <p className={styles.commentComment}>{comment.content}</p>
    </div>
  )
}
