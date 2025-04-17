import styles from './PostPreview.module.css'
import Markdown from 'react-markdown'

export function PostPreview({ postMarkdown }) {
  return (
    <section className={styles.postPreview}>
      <Markdown lineBreaks={true}>{postMarkdown}</Markdown>
    </section>
  )
}
