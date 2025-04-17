import { useEffect, useState } from 'react'
import { Post } from './Post'
import useFetch from '../../hooks/useFetch'
import useCache from '../../hooks/useCache'
import styles from './UserPosts.module.css'
const API_URL = import.meta.env.VITE_API_URL
const AUTH_URL = import.meta.env.VITE_AUTH_URL

function UserPosts() {
  const { data, loading, executeFetch: fetchPosts } = useFetch()
  const [posts, setPosts] = useState([])
  const { data: isAdmin, executeFetch: executeFetchIsAdmin } = useFetch()
  const { executeFetch } = useFetch()
  const { cacheDelete } = useCache()
  const token = localStorage.getItem('jwt')

  useEffect(() => {
    if (!token) {
      console.error('User not logged in')
      return
    }

    const postsUrl = `${API_URL}/posts/user-posts`
    const postOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    fetchPosts(postsUrl, postOptions)

    const adminUrl = `${AUTH_URL}/admin`
    const adminOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    executeFetchIsAdmin(adminUrl, adminOptions)
  }, [executeFetchIsAdmin, fetchPosts, token])

  useEffect(() => {
    if (data) {
      const postsArray = data ? data : []
      setPosts(postsArray)
    }
  }, [data])

  const handleUnPublishPost = (id) => {
    const url = `${API_URL}/posts/${id}`
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    cacheDelete(`${API_URL}/posts/user-posts`)
    cacheDelete(`${API_URL}/posts`)
    executeFetch(url, options)
    const targetPost = posts.find((post) => post.id === id)

    // TODO Make this immutable
    targetPost.published = !targetPost.published
  }

  const handleDeletePost = (id) => {
    const url = `${API_URL}/posts/${id}`
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    cacheDelete(`${API_URL}/posts/user-posts`)
    cacheDelete(`${API_URL}/posts`)
    executeFetch(url, options)
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.pageTitle}>Your Posts</h1>
      <section className={styles.postsContainer}>
        {loading && 'Loading Posts...'}
        {posts &&
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              isAdmin={isAdmin}
              published={post.published}
              id={post.id}
              handleUnPublishPost={handleUnPublishPost}
              handleDeletePost={handleDeletePost}
            />
          ))}
      </section>
    </main>
  )
}

export default UserPosts
