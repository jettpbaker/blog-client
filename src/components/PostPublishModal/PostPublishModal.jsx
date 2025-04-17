import styles from './PostPublishModal.module.css'
import { LoaderCircle } from 'lucide-react'
import { usePostPublishModal } from './usePostPublishModal'
import useToast from '../../hooks/useToast'

export function PostPublishModal({ handleModalClose, postMarkdown }) {
  const { title, loading, handleTitleChange, handleSubmit } = usePostPublishModal(postMarkdown)
  const { RenderToast } = useToast()

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <div className={styles.modalHeading}>
          <h1>Publish Your Post</h1>
          <button onClick={handleModalClose}>&times;</button>
        </div>

        <p className={styles.modalNote}>
          If you're not an admin your post will be saved but <b>will not</b> publish
        </p>
        <form action="" className={styles.modalForm} onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="postTitle">
              Post Title <span>(Titles have a max length of 65 characters)</span>
            </label>
            <input
              type="text"
              name="postTitle"
              maxLength={65}
              placeholder="Your Title Here"
              value={title}
              onChange={(e) => handleTitleChange(e)}
              disabled={loading}
              required
            />
          </div>
          <button type="submit" className={styles.modalSubmit}>
            {loading ? <LoaderCircle className="form-loading" /> : 'Confirm & Publish'}
          </button>
        </form>
      </div>
      <RenderToast />
    </div>
  )
}
