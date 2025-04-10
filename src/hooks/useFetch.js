import { useState, useCallback } from 'react'

const cache = new Map()
const ttl = 1000 * 60 * 10 // 10 minutes

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

      const method = fetchOptions.method

      if (method === 'GET' && cache.has(fetchUrl)) {
        const cachedEntry = cache.get(fetchUrl)
        const now = Date.now()
        if (now - cachedEntry.timestamp < ttl) {
          console.log(`Cache hit for: ${fetchUrl}`)
          setData(cachedEntry.data)
          setLoading(false)
          setError(null)
          return cachedEntry.data
        } else {
          cache.delete(fetchUrl)
        }
      }

      try {
        const response = await fetch(fetchUrl, fetchOptions)
        const responseData = await response.json()

        if (!response.ok) {
          setError(responseData.message)
        }
        setData(responseData)

        cache.set(fetchUrl, { data: responseData, timestamp: Date.now() })

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

  if (initialUrl && initialOptions) {
    executeFetch()
  }

  const setFetchParams = useCallback((newUrl = null, newOptions = null) => {
    if (newUrl !== undefined) setUrl(newUrl)
    if (newOptions !== undefined) setOptions(newOptions)
  }, [])

  return { data, loading, error, executeFetch, setFetchParams }
}

export default useFetch
