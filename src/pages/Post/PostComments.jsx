import { useState } from 'react'
import styles from './Post.module.css'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
const API_URL = import.meta.env.VITE_API_URL

export function PostComments({ postId }) {
  const [comment, setComment] = useState('')
  const { data, loading, error, executeFetch } = useFetch()

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
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  useEffect(() => {
    if (data) {
      console.log(data)
    }

    if (error) {
      console.log(erro)
    }
  }, [data, error])

  return (
    <section className={styles.commentsContainer}>
      <div className={styles.newComment}>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="Add a comment..." value={comment} onChange={(e) => handleCommentChange(e)} required />
          <button type="submit">Comment</button>
        </form>
      </div>
      <div className={styles.comment}></div>
    </section>
  )
}
