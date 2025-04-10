import { useState, useCallback } from 'react'
import useCache from './useCache'

const cacheTTL = 1000 * 60 * 10 // 10 min

const useFetch = (initialUrl = null, initialOptions = {}) => {
  const { cacheSet, cacheDelete, cacheGet } = useCache()
  const [url, setUrl] = useState(initialUrl)
  const [options, setOptions] = useState(initialOptions)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const executeFetch = useCallback(
    async (overrideUrl = null, overrideOptions = null) => {
      console.log('Entering execute fetch...')
      const fetchUrl = overrideUrl || url
      const fetchOptions = overrideOptions || options

      if (!fetchUrl) return null
      setLoading(true)
      setError(null)

      // console.log('URL', fetchUrl)
      // console.log('Options', fetchOptions)

      // TODO check time
      const cachedData = cacheGet(fetchUrl)
      console.log(cachedData)
      if (cachedData) {
        const now = Date.now()
        const timeSinceCache = now - cachedData.timestamp

        if (timeSinceCache < cacheTTL) {
          const responseData = cachedData.value
          setData(responseData)
          setLoading(false)
          setError(false)
          return responseData
        }
      }

      try {
        console.log('Executing fetch...')
        const response = await fetch(fetchUrl, fetchOptions)
        const responseData = await response.json()

        console.log(response)
        console.log(responseData)

        if (!response.ok) {
          setError(responseData.message)
        }
        setData(responseData)

        if (fetchOptions.method === 'GET') {
          cacheSet(fetchUrl, responseData)
        }

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
