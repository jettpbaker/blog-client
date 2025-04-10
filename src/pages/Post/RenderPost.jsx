import styles from './Post.module.css'
import Markdown from 'react-markdown'

export function RenderPost({ title, author, content, published }) {
  const date = new Date(published).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className={styles.postContainer}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.postHeadingContainer}>
        <p>{author}</p>
        <p>{date}</p>
      </div>
      <hr className={styles.divider} />
      <div className={styles.markdown}>
        <Markdown>{content}</Markdown>
      </div>
    </section>
  )
}
