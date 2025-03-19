import { useState, useEffect, useCallback } from 'react'

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const executeFetch = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setData(data)
    } catch (err) {
      setError(err.message || 'An error occurred')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [url, options])

  useEffect(() => {
    executeFetch()
  }, [executeFetch])

  return { data, loading, error }
}

export default useFetch
