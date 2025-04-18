import styles from './EditPost.module.css'
import { Loading } from '../../components/Loading/Loading'
import { PostEditor } from '../../components/PostEditor/PostEditor'
import { PostPreview } from '../../components/PostPreview/PostPreview'
import { useParams, useLocation } from 'react-router'
import useFetch from '../../hooks/useFetch'
import useToast from '../../hooks/useToast'
import useCache from '../../hooks/useCache'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

const API_URL = import.meta.env.VITE_API_URL

function EditPost() {
  const { id } = useParams()
  const { data: postData, loading: postLoading, error: postError, executeFetch: fetchPostContent } = useFetch()
  const { data: newPostData, loading: newPostLoading, error: newPostError, executeFetch: savePostContent } = useFetch()
  const { showToast, RenderToast } = useToast()
  const location = useLocation()
  const postContent = location.state?.postContent || ''
  const [content, setContent] = useState(postContent)
  const { cacheDelete } = useCache()
  const navigate = useNavigate()
  useEffect(() => {
    if (!postContent) {
      fetchPostContent(`${API_URL}/posts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }, [postContent, fetchPostContent, id])

  useEffect(() => {
    if (postData) {
      setContent(postData.content)
    }
  }, [postData])

  const handlePostMarkdown = (e) => {
    setContent(e.target.value)
  }

  const handleSavePost = () => {
    const token = localStorage.getItem('jwt')

    savePostContent(`${API_URL}/posts/${id}/content`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    })
  }

  useEffect(() => {
    if (newPostData) {
      cacheDelete(`${API_URL}/posts`)
      cacheDelete(`${API_URL}/posts/user-posts`)
      navigate('/')
    }
  }, [newPostData, cacheDelete, navigate])

  useEffect(() => {
    if (postError) {
      showToast('error', postError)
    }

    if (newPostError) {
      showToast('error', newPostError)
    }
  }, [postError, newPostError, showToast])

  return (
    <main className={styles.editPost}>
      {postLoading ? (
        <Loading size="large" />
      ) : (
        <>
          <div className={styles.postItemsContainer}>
            <PostEditor postMarkdown={content} handlePostMarkdown={handlePostMarkdown} />
            <PostPreview postMarkdown={content} />
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonBackground}>
              <button className={styles.saveButton} onClick={handleSavePost}>
                Save
              </button>
            </div>
          </div>
        </>
      )}
      <RenderToast />
    </main>
  )
}

export default EditPost
