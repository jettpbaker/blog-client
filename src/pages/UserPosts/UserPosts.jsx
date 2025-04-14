import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import styles from './UserPosts.module.css'
import useCache from '../../hooks/useCache'

const API_URL = import.meta.env.VITE_API_URL
const AUTH_URL = import.meta.env.VITE_AUTH_URL

function Post({ post, isAdmin, published, onTogglePublish, id, handleUnPublishPost, handleDeletePost }) {
  const date = new Date(post.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={styles.postCard}>
      <div className={styles.cardBody}>
        <div className={styles.postHeader}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <p className={styles.postDate}>Written {date}</p>
        </div>
        <p className={styles.postDescription}>{post.description || 'No description provided.'}</p>
        <div className={styles.buttonContainer}>
          <button
            className={!published ? styles.publishButton : styles.unpublishButton}
            disabled={!isAdmin}
            onClick={() => handleUnPublishPost(id)}
          >
            {!published ? 'Publish' : 'Unpublish'}
          </button>
          <button className={styles.deleteButton} onClick={() => handleDeletePost(id)}>
            Delete post
          </button>
        </div>
      </div>
    </div>
  )
}

function UserPosts() {
  const { data, loading, error, executeFetch } = useFetch()
  const [posts, setPosts] = useState([])
  const { data: isAdmin, loading: loadingIsAdming, error: errorIsAdmin, executeFetch: executeFetchIsAdmin } = useFetch()
  const { executeFetch: unPublishPost } = useFetch()
  const { executeFetch: deletePost } = useFetch()
  const { logCache, cacheSet, cacheDelete, cacheGet } = useCache()
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
    const adminUrl = `${AUTH_URL}/admin`
    const adminOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    executeFetch(postsUrl, postOptions)
    executeFetchIsAdmin(adminUrl, adminOptions)
  }, [])

  useEffect(() => {
    if (data) {
      const postsArray = Array.isArray(data) ? data : data?.posts || []
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
    unPublishPost(url, options)
    const targetPost = posts.find((post) => post.id === id)
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
    deletePost(url, options)
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.pageTitle}>Your Posts</h1>

      <section className={styles.postsContainer}>
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
