import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router'
import useToast from '../../hooks/useToast'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import useCache from '../../hooks/useCache'
const SERVER_URL = import.meta.env.VITE_SERVER_URL

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
      fetchPostContent(`${SERVER_URL}/api/posts/${id}`, {
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
    if (!token) {
      showToast('error', 'You must be logged in to save a post')
      return
    }
    savePostContent(`${SERVER_URL}/api/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    })
  }

  useEffect(() => {
    if (newPostData) {
      cacheDelete(`${SERVER_URL}/api/posts`)
      cacheDelete(`${SERVER_URL}/api/users/me/posts`)
      cacheDelete(`${SERVER_URL}/api/posts/${id}`)
      navigate('/')
    }
  }, [newPostData, cacheDelete, id, navigate])

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
