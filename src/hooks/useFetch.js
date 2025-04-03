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
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(fetchUrl, fetchOptions)
        const responseData = await response.json()

        if (!response.ok) {
          setError(responseData.message)
        }
        setData(responseData)
        return responseData
      } catch (err) {
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
