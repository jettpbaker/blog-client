import { useState } from 'react'
import styles from './PostPublishModal.module.css'
import OpenAI from 'openai'
import { useEffect } from 'react'

export function PostPublishModal({ handleModalClose, postMarkdown }) {
  const [title, setTitle] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeading}>
          <h1>Publish Your Post</h1>
          <button onClick={handleModalClose}>&times;</button>
        </div>

        <p className={styles.modalNote}>
          If you're not an admin your post will be saved but <b>will not</b> publish
        </p>
        <form action="" className={styles.modalForm}>
          <div>
            <label htmlFor="postTitle">
              Post Title <span>(Titles have a max length of 65 characters)</span>
            </label>
            <input
              type="text"
              name="postTitle"
              maxLength={65}
              placeholder="Your Title Here"
              value={title}
              onChange={(e) => handleTitleChange(e)}
            />
          </div>
          <button type="submit" className={styles.modalSubmit}>
            Confirm & Publish
          </button>
        </form>
      </div>
    </div>
  )
}
