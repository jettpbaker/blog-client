import { Comment } from '../Comment.jsx/Comment'

export function RenderComments({ comments, postId, onDeleteComment }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} postId={postId} onDeleteComment={onDeleteComment} />
      ))}
    </div>
  )
}
