import { useState, useEffect } from 'react'
import styles from './NewComment.module.css'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import useCache from '../../hooks/useCache'
import { Loading } from '../Loading/Loading'
const SERVER_URL = import.meta.env.VITE_SERVER_URL

export function NewComment({ postId, createGhostComment, firstName, lastName, replaceGhostComment }) {
  const [comment, setComment] = useState('')
  const { data, loading, executeFetch } = useFetch()
  const { showToast, RenderToast } = useToast()
  const { cacheDelete } = useCache()
  const cacheKey = `${SERVER_URL}/api/posts/${postId}`

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

    createGhostComment({ firstName, lastName }, comment)

    const url = `${SERVER_URL}/api/posts/${postId}/comments`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: comment, postId }),
    }

    try {
      executeFetch(url, options)
      cacheDelete(cacheKey)
    } catch (error) {
      showToast('error', error)
    }
  }

  useEffect(() => {
    if (!data) return
    replaceGhostComment(data)
  }, [data, replaceGhostComment])

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
        <button type="submit">{loading ? <Loading /> : 'Comment'}</button>
      </form>
      <RenderToast />
    </div>
  )
}
