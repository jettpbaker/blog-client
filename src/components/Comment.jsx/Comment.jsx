import styles from './Comment.module.css'

export function Comment({ comment }) {
  const fullName = `${comment.author.firstName} ${comment.author.lastName}`
  const date = new Date(comment.createdAt).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={styles.comment}>
      <h3 className={styles.commentAuthor}>{fullName}</h3>
      <p className={styles.commentDate}>{date}</p>
      <p className={styles.commentComment}>{comment.content}</p>
    </div>
  )
}
