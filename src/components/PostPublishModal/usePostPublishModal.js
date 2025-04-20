import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import useCache from '../../hooks/useCache'
import useToast from '../../hooks/useToast'
import useFetch from '../../hooks/useFetch'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

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
    generateDescription(`${SERVER_URL}/api/posts/generate-description`, {
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
      cacheDelete(`${SERVER_URL}/api/posts`)
      cacheDelete(`${SERVER_URL}/api/users/me/posts`)

      console.log('Creating post')

      createPost(`${SERVER_URL}/api/posts`, {
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
