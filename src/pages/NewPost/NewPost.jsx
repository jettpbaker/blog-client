import { PostEditor } from '../../components/PostEditor/PostEditor'
import { PostPreview } from '../../components/PostPreview/PostPreview'
import { PostPublishModal } from '../../components/PostPublishModal/PostPublishModal'
import styles from './NewPost.module.css'
import { useState } from 'react'

function NewPost() {
  const [postMarkdown, setpostMarkdown] = useState('')
  const [displayModal, setDisplayModal] = useState(false)

  const handlePostMarkdown = (e) => {
    setpostMarkdown(e.target.value)
  }

  const handleModalClose = () => setDisplayModal(false)

  return (
    <>
      {displayModal && <PostPublishModal handleModalClose={handleModalClose} postMarkdown={postMarkdown} />}
      <main className={styles.newPostContainer}>
        <h1 className={styles.pageHeading}>
          Write your post in <a href="https://www.markdownguide.org/basic-syntax/"> Markdown</a>
        </h1>
        <p className={styles.note}>
          Draft posts to see the post editor implementation, though only admins can publish posts
        </p>
        <div className={styles.postItemsContainer}>
          <PostEditor postMarkdown={postMarkdown} handlePostMarkdown={handlePostMarkdown} />
          <PostPreview postMarkdown={postMarkdown} />
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonBackground}>
            <button onClick={() => setDisplayModal(true)}>Publish post</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default NewPost
