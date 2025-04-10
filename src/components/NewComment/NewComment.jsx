import { useState, useEffect } from 'react'
import styles from './NewComment.module.css'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import useCache from '../../hooks/useCache'
const API_URL = import.meta.env.VITE_API_URL

export function NewComment({ postId, createGhostComment, firstName, lastName }) {
  const [comment, setComment] = useState('')
  const { data, loading, error, executeFetch } = useFetch()
  const { showToast, RenderToast } = useToast()
  const { cacheDelete } = useCache()
  const cacheKey = `${API_URL}/posts/${postId}`

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setComment('')

    const token = localStorage.getItem('jwt')
    if (!token) {
      showToast('warning', 'Please sign in to leave a comment!')
      return
    }

    const url = `${API_URL}/comments`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: comment, postId }),
    }

    executeFetch(url, options)
    createGhostComment({ firstName, lastName }, comment)
    cacheDelete(cacheKey)
  }

  return (
    <div className={styles.newComment}>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => handleCommentChange(e)}
          required
        />
        <button type="submit">Comment</button>
      </form>
      <RenderToast />
    </div>
  )
}
