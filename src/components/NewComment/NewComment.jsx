import { useState, useEffect } from 'react'
import styles from './NewComment.module.css'
import useFetch from '../../hooks/useFetch'
const API_URL = import.meta.env.VITE_API_URL

export function NewComment({ postId, createGhostComment }) {
  const [comment, setComment] = useState('')
  const { data, loading, error, executeFetch } = useFetch()

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setComment('')

    const token = localStorage.getItem('jwt')
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

    createGhostComment({ firstName: 'Jett', lastName: 'Baker', admin: true }, comment)
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
    </div>
  )
}
