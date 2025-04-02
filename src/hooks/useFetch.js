import { useState, useCallback } from 'react'

const useFetch = (initialUrl = null, initialOptions = {}) => {
  const [url, setUrl] = useState(initialUrl)
  const [options, setOptions] = useState(initialOptions)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const executeFetch = useCallback(
    async (overrideUrl = null, overrideOptions = null) => {
      const fetchUrl = overrideUrl || url
      const fetchOptions = overrideOptions || options

      if (!fetchUrl) return null

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(fetchUrl, fetchOptions)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        const responseData = await response.json()
        setData(responseData)
        return responseData
      } catch (err) {
        setError(err.message || 'An error occurred')
        console.error(err)

        return null
      } finally {
        setLoading(false)
      }
    },
    [url, options]
  )

  const setFetchParams = useCallback((newUrl = null, newOptions = null) => {
    if (newUrl !== undefined) setUrl(newUrl)
    if (newOptions !== undefined) setOptions(newOptions)
  }, [])

  return { data, loading, error, executeFetch, setFetchParams }
}

export default useFetch
