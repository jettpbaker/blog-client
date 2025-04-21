import styles from './Post.module.css'
import { NewComment } from '../../components/NewComment/NewComment'
import { RenderComments } from '../../components/RenderComments.jsx/RenderComments'
import { useState, useCallback, useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import { Loading } from '../../components/Loading/Loading'
const SERVER_URL = import.meta.env.VITE_SERVER_URL

export function PostComments({ postId, comments }) {
  const [commentsState, setCommentsState] = useState(comments)
  const { data, loading, error, executeFetch } = useFetch()
  const [firstName, setFirstname] = useState('')
  const [lastName, setLastName] = useState('')
  const [authorId, setAuthorId] = useState('')
  const { showToast, RenderToast } = useToast()

  const createGhostComment = (author, content) => {
    const createdAt = new Date()
    const comment = {
      author: {
        ...author,
        id: authorId,
      },
      content,
      createdAt,
      id: 'ghostComment',
    }

    setCommentsState((prevComments) => [comment, ...prevComments])
  }

  const replaceGhostComment = useCallback((newComment) => {
    setCommentsState((prev) => prev.map((c) => (c.id === 'ghostComment' ? newComment : c)))
  }, [])

  const handleDeleteComment = useCallback((commentId) => {
    setCommentsState((prev) => prev.filter((comment) => comment.id !== commentId))
  }, [])

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
      const { firstName, lastName, id: authorId } = data
      setFirstname(firstName)
      setLastName(lastName)
      setAuthorId(authorId)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      showToast('error', error)
    }
  }, [error, showToast])

  return (
    <section className={styles.commentsContainer}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NewComment
            postId={postId}
            createGhostComment={createGhostComment}
            firstName={firstName}
            lastName={lastName}
            replaceGhostComment={replaceGhostComment}
          />
          <RenderComments comments={commentsState} postId={postId} onDeleteComment={handleDeleteComment} />
        </>
      )}
      <RenderToast />
    </section>
  )
}
