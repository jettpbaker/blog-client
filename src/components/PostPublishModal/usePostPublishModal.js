import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import useCache from '../../hooks/useCache'
import useToast from '../../hooks/useToast'
import useFetch from '../../hooks/useFetch'

const API_URL = import.meta.env.VITE_API_URL

export function usePostPublishModal(postMarkdown) {
  const [title, setTitle] = useState('')
  const [submitClicked, setSubmitClicked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { cacheDelete } = useCache()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const { data: description, error: descriptionError, executeFetch: generateDescription } = useFetch()
  const { data: postData, error: postError, executeFetch: createPost } = useFetch()

  // Generate description on mount
  useEffect(() => {
    generateDescription(`${API_URL}/ai`, {
      method: 'POST',
      body: JSON.stringify({ postMarkdown }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }, [postMarkdown, generateDescription])

  // If both description and submitClicked are true, create post
  useEffect(() => {
    if (!submitClicked || !description?.description) return

    const token = localStorage.getItem('jwt')
    if (!token) {
      setError(new Error('You must be logged in to create a post.'))
      return
    }

    try {
      cacheDelete(`${API_URL}/posts`)
      cacheDelete(`${API_URL}/posts/user-posts`)

      console.log('Creating post')

      createPost(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content: postMarkdown, description: description.description }),
      })
    } catch (error) {
      setError(error)
    }
  }, [description, submitClicked, postMarkdown, title, createPost, cacheDelete])

  useEffect(() => {
    if (postData) {
      setLoading(false)
      navigate('/')
    }
  }, [postData, navigate])

  useEffect(() => {
    if (descriptionError) setError(descriptionError)
    if (postError) setError(postError)
  }, [descriptionError, postError])

  useEffect(() => {
    if (error) {
      showToast('error', error.message || error)
    }
  }, [error, showToast])

  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value)
  }, [])

  // Start showing loading state when submit clicked
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setSubmitClicked(true)
    setLoading(true)
  }, [])

  return {
    title,
    loading,
    error,
    handleTitleChange,
    handleSubmit,
  }
}
