import { Comment } from '../Comment.jsx/Comment'

export function RenderComments({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  )
}
