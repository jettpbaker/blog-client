import styles from './Toast.module.css'

function Toast({ message, type, onClose }) {
  let toastStyle = styles.toast
  let toastTitle
  switch (type) {
    case 'success':
      toastStyle = `${styles.toast} ${styles.success}`
      toastTitle = 'Nice!'
      break
    case 'warning':
      toastStyle = `${styles.toast} ${styles.warning}`
      toastTitle = 'Oops!'
      break
    case 'error':
      toastStyle = `${styles.toast} ${styles.error}`
      toastTitle = 'Oh no!'
      break
    default:
      toastStyle = `${styles.toast} ${styles.error}`
      toastTitle = 'Oh no!'
  }

  return (
    <div className={toastStyle}>
      <div className={styles['toast-heading']}>
        <p>{toastTitle}</p>
        <button onClick={onClose}>&times;</button>
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default Toast
