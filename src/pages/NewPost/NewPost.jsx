import { PostEditor } from '../../components/PostEditor/PostEditor'
import { PostPreview } from '../../components/PostPreview/PostPreview'
import styles from './NewPost.module.css'
import { useState } from 'react'

function NewPost() {
  const [postMarkdown, setpostMarkdown] = useState('')

  const handlePostMarkdown = (e) => {
    setpostMarkdown(e.target.value)
  }

  return (
    <main className={styles.newPostContainer}>
      <h1 className={styles.pageHeading}>
        Write your post in <a href="https://www.markdownguide.org/basic-syntax/"> Markdown</a>
      </h1>
      <p className={styles.note}>Draft posts to see the post editor implementation, though only admins can publish posts</p>
      <div className={styles.postItemsContainer}>
        <PostEditor postMarkdown={postMarkdown} handlePostMarkdown={handlePostMarkdown} />
        <PostPreview postMarkdown={postMarkdown} />
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonBackground}>
          <button>Publish post</button>
        </div>
      </div>
    </main>
  )
}

export default NewPost
