import styles from './PostContainer.module.css'
import { PostCard } from '../../components/PostCard/PostCard'
import { PostLoading } from '../../components/PostLoading/PostLoading'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
import { useMemo } from 'react'
const API_URL = import.meta.env.VITE_API_URL

export function PostContainer() {
  const { data, loading, error, executeFetch } = useFetch()

  const fakeLoading = true

  useEffect(() => {
    const url = `${API_URL}/posts`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    executeFetch(url, options)
  }, [])

  return (
    <div className={styles.postContainer}>
      {data &&
        data.map((post) => {
          if (!post.published) return
          const fullName = `${post.author.firstName} ${post.author.lastName}`

          return (
            <PostCard
              title={post.title}
              author={fullName}
              description={post.description}
              published={post.createdAt}
              id={post.id}
              key={post.id}
            />
          )
        })}
      {loading && <PostLoading />}
    </div>
  )
}
