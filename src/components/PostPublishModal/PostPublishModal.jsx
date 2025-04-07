import { useState } from 'react'
import styles from './PostPublishModal.module.css'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
const API_URL = import.meta.env.VITE_API_URL

export function PostPublishModal({ handleModalClose, postMarkdown }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const {
    data: descriptionData,
    loading: descriptionLoading,
    error: descriptionError,
    executeFetch: generateDescription,
  } = useFetch()

  const { data: postData, loading: postLoading, error: postError, executeFetch: postNewPost } = useFetch()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    const url = `${API_URL}/ai`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ postMarkdown }),
    }

    generateDescription(url, options)
  }, [])

  useEffect(() => {
    if (descriptionData) {
      setDescription(descriptionData.description)
    }
  }, [descriptionData])

  useEffect(() => {
    if (postData) {
      console.log(postData)
    }
  }, [postData])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('jwt')

    if (!token) {
      console.error('You must be logged in to create a post.')
      return
    }

    const url = `${API_URL}/posts`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content: postMarkdown, description }),
    }

    postNewPost(url, options)
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
        <form action="" className={styles.modalForm} onSubmit={(e) => handleSubmit(e)}>
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
