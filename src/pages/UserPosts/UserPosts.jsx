import { useEffect, useState } from 'react'
import { Post } from './Post'
import useFetch from '../../hooks/useFetch'
import useCache from '../../hooks/useCache'
import styles from './UserPosts.module.css'
const SERVER_URL = import.meta.env.VITE_SERVER_URL
import { Loading } from '../../components/Loading/Loading'

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

    const postsUrl = `${SERVER_URL}/api/users/me/posts`
    const postOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    fetchPosts(postsUrl, postOptions)

    const adminUrl = `${SERVER_URL}/api/users/me/admin`
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
    const url = `${SERVER_URL}/api/posts/${id}/publish`
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    cacheDelete(`${SERVER_URL}/api/users/me/posts`)
    cacheDelete(`${SERVER_URL}/api/posts`)
    executeFetch(url, options)

    setPosts(posts.map((post) => (post.id === id ? { ...post, published: !post.published } : post)))
  }

  const handleDeletePost = (id) => {
    const url = `${SERVER_URL}/api/posts/${id}`
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    cacheDelete(`${SERVER_URL}/api/users/me/posts`)
    cacheDelete(`${SERVER_URL}/api/posts`)
    executeFetch(url, options)
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.pageTitle}>Your Posts</h1>
      <section className={styles.postsContainer}>
        {loading && <Loading size="large" className={styles.yourPostsLoading} />}
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
