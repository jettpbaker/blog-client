import styles from './PostContainer.module.css'
import { PostCard } from '../../components/PostCard/PostCard'
import { PostLoading } from '../../components/PostLoading/PostLoading'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
const SERVER_URL = import.meta.env.VITE_SERVER_URL

export function PostContainer() {
  const { data, loading, error, executeFetch } = useFetch()

  useEffect(() => {
    const url = `${SERVER_URL}/api/posts`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    executeFetch(url, options)
  }, [executeFetch])

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
