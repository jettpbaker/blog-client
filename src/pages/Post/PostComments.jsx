import styles from './Post.module.css'
import { NewComment } from '../../components/NewComment/NewComment'
import { RenderComments } from '../../components/RenderComments.jsx/RenderComments'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
const SERVER_URL = import.meta.env.VITE_SERVER_URL

export function PostComments({ postId, comments }) {
  const [commentsState, setCommentsState] = useState(comments)
  const { data, loading, error, executeFetch } = useFetch()
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastName] = useState('')

  const createGhostComment = (author, content) => {
    const createdAt = new Date()
    const id = `TempGhostComment-${Date.now()}`
    const comment = {
      author,
      content,
      createdAt,
      id,
    }

    setCommentsState([comment, ...commentsState])
  }

  // Get current user's first and last name in case they comment
  useEffect(() => {
    const token = localStorage.getItem('jwt')
    const url = `${SERVER_URL}/api/users/me`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    executeFetch(url, options)
  }, [executeFetch])

  useEffect(() => {
    if (data) {
      const { firstName, lastName } = data
      setFirstname(firstName)
      setLastName(lastName)
    }
  }, [data])

  return (
    <section className={styles.commentsContainer}>
      <NewComment postId={postId} createGhostComment={createGhostComment} firstName={firstName} lastName={lastName} />
      <RenderComments comments={commentsState} />
    </section>
  )
}
