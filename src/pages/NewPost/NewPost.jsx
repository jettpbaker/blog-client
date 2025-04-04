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
      <h1>
        Write your post in <a href="https://www.markdownguide.org/basic-syntax/"> Markdown</a>
      </h1>
      <p>Draft posts to see the post editor implementation, though only admins can publish posts</p>
      <div className={styles.postItemsContainer}>
        <PostEditor postMarkdown={postMarkdown} handlePostMarkdown={handlePostMarkdown} />
        <PostPreview postMarkdown={postMarkdown} />
      </div>
      <button>Publish post</button>
    </main>
  )
}

export default NewPost
