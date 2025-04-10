import styles from './Post.module.css'
import { NewComment } from '../../components/NewComment/NewComment'
import { RenderComments } from '../../components/RenderComments.jsx/RenderComments'
import { useState } from 'react'

export function PostComments({ postId, comments }) {
  const [commentsState, setCommentsState] = useState(comments)

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

  return (
    <section className={styles.commentsContainer}>
      <NewComment postId={postId} createGhostComment={createGhostComment} />
      <RenderComments comments={commentsState} />
    </section>
  )
}
