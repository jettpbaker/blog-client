import CacheContext from './CacheContext'

const cache = new Map()

export const CacheProvider = ({ children }) => {
  const logCache = () => {
    console.log(cache)
  }

  const cacheSet = (key, value) => {
    const data = { value }
    const val = { ...data, timestamp: Date.now() }
    cache.set(key, val)
  }

  const cacheDelete = (key) => {
    cache.delete(key)
  }

  const cacheGet = (key) => {
    const keyExists = cache.has(key)
    if (!keyExists) return false

    const value = cache.get(key)
    return value
  }

  const value = {
    logCache,
    cacheSet,
    cacheDelete,
    cacheGet,
  }

  return <CacheContext.Provider value={value}>{children}</CacheContext.Provider>
}
