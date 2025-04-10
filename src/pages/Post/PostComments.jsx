import styles from './Post.module.css'
import { NewComment } from '../../components/NewComment/NewComment'
import { RenderComments } from '../../components/RenderComments.jsx/RenderComments'

export function PostComments({ postId, comments }) {
  return (
    <section className={styles.commentsContainer}>
      <NewComment postId={postId} />
      <RenderComments comments={comments} />
    </section>
  )
}
