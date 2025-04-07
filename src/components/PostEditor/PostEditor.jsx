import styles from './PostEditor.module.css'

export function PostEditor({ postMarkdown, handlePostMarkdown }) {
  return (
    <section className={styles.postEditor}>
      <textarea name="postContent" id="" value={postMarkdown} onChange={(e) => handlePostMarkdown(e)}></textarea>
    </section>
  )
}
