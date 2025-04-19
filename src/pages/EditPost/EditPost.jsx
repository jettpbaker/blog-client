import styles from './EditPost.module.css'
import { Loading } from '../../components/Loading/Loading'
import { PostEditor } from '../../components/PostEditor/PostEditor'
import { PostPreview } from '../../components/PostPreview/PostPreview'
import { useEditPost } from './useEditPost'
import { useLocation } from 'react-router'

function EditPost() {
  const location = useLocation()
  const postContent = location.state?.postContent || ''
  const { content, handlePostMarkdown, handleSavePost, postLoading, newPostLoading, RenderToast } = useEditPost({
    postContent,
  })

  return (
    <main className={styles.editPost}>
      {postLoading ? (
        <Loading size="large" />
      ) : (
        <>
          <div className={styles.postItemsContainer}>
            <PostEditor postMarkdown={content} handlePostMarkdown={handlePostMarkdown} />
            <PostPreview postMarkdown={content} />
          </div>
          <div className={styles.buttonContainer}>
            <div className={styles.buttonBackground}>
              <button className={styles.saveButton} onClick={handleSavePost}>
                {newPostLoading ? <Loading size="small" /> : 'Save'}
              </button>
            </div>
          </div>
        </>
      )}
      <RenderToast />
    </main>
  )
}

export default EditPost
