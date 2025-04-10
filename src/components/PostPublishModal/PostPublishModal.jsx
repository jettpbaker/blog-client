import { useState } from 'react'
import styles from './PostPublishModal.module.css'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
import { LoaderCircle } from 'lucide-react'
import { useNavigate } from 'react-router'
import useToast from '../../hooks/useToast'
import useCache from '../../hooks/useCache'
const API_URL = import.meta.env.VITE_API_URL

export function PostPublishModal({ handleModalClose, postMarkdown }) {
  const [title, setTitle] = useState('')
  const [submitClicked, setSubmitClicked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showToast, RenderToast } = useToast()
  const navigate = useNavigate()
  const { cacheDelete } = useCache()
  const cacheKey = `${API_URL}/posts`

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

  // Fetch generated description as soon as modal opens to save time
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

  // Will only POST the post when description is ready
  useEffect(() => {
    if ((!descriptionData && submitClicked) || (descriptionData && !submitClicked)) {
      const slowComponent = descriptionData ? 'user submit' : 'description'
      console.log(`Waiting on ${slowComponent}...`)
    }

    if (descriptionData?.description && submitClicked) {
      const token = localStorage.getItem('jwt')

      if (!token) {
        console.error('You must be logged in to create a post.')
        return
      }

      const description = descriptionData.description
      const url = `${API_URL}/posts`
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content: postMarkdown, description }),
      }

      try {
        postNewPost(url, options)
        cacheDelete(cacheKey)
      } catch (err) {
        console.error('Error creating post: ', err)
        setError(error)
      }
    }
  }, [descriptionData, submitClicked])

  useEffect(() => {
    if (postData) {
      setLoading(false)
      navigate('/')
    }
  }, [postData])

  useEffect(() => {
    if (postError) {
      setError(postError)
    }

    if (descriptionError) {
      setError(descriptionError)
    }
  }, [postError, descriptionError])

  useEffect(() => {
    if (error) {
      console.error(error)
      showToast('error', error)
    }
  }, [error, showToast])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitClicked(true)
    setLoading(true)
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
              disabled={loading}
              required
            />
          </div>
          <button type="submit" className={styles.modalSubmit}>
            {loading ? <LoaderCircle className="form-loading" /> : 'Confirm & Publish'}
          </button>
        </form>
      </div>
    </div>
  )
}
