import { useParams } from 'react-router'
import styles from './Post.module.css'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
import { RenderPost } from './RenderPost'
import { PostComments } from './PostComments'
import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
const API_URL = import.meta.env.VITE_API_URL

function Post() {
  const { id } = useParams()
  const { data, loading, error, executeFetch } = useFetch()
  const [author, setAuthor] = useState('')

  useEffect(() => {
    const url = `${API_URL}/posts/${id}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    executeFetch(url, options)
  }, [])

  useEffect(() => {
    if (data) {
      setAuthor(`${data.author.firstName} ${data.author.lastName}`)
    }
  }, [data])

  return (
    <main className={styles.postPageContainer}>
      <section className={styles.postAndCommentsContainer}>
        {data && (
          <>
            {' '}
            <RenderPost title={data.title} author={author} content={data.content} published={data.createdAt} />{' '}
            <PostComments postId={id} comments={data.comments} />{' '}
          </>
        )}
        {loading && <LoaderCircle />}
      </section>
    </main>
  )
}

export default Post
