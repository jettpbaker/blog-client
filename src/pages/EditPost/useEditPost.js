import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router'
import useToast from '../../hooks/useToast'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import useCache from '../../hooks/useCache'
const API_URL = import.meta.env.VITE_API_URL

export function useEditPost({ postContent }) {
  const [content, setContent] = useState(postContent)
  const { id } = useParams()
  const { data: postData, loading: postLoading, error: postError, executeFetch: fetchPostContent } = useFetch()
  const { data: newPostData, loading: newPostLoading, error: newPostError, executeFetch: savePostContent } = useFetch()
  const { showToast, RenderToast } = useToast()
  const navigate = useNavigate()
  const { cacheDelete } = useCache()

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

  return { content, handlePostMarkdown, handleSavePost, postLoading, newPostLoading, RenderToast }
}
