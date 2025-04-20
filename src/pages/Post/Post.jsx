import { useParams } from 'react-router'
import styles from './Post.module.css'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
import { RenderPost } from './RenderPost'
import { PostComments } from './PostComments'
import { useState } from 'react'
import { Loading } from '../../components/Loading/Loading'
const SERVER_URL = import.meta.env.VITE_SERVER_URL

function Post() {
  const { id } = useParams()
  const { data, loading, error, executeFetch } = useFetch()
  const [author, setAuthor] = useState('')

  useEffect(() => {
    const url = `${SERVER_URL}/api/posts/${id}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    executeFetch(url, options)
  }, [executeFetch, id])

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
        {loading && <Loading size="large" />}
      </section>
    </main>
  )
}

export default Post
