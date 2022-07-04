export default function CommentsCard({ comment }) {
  // need to find which user created the comment

  return (
    <div className="comments-card-container">
      <p>Title: {comment.commentTitle}</p>
      <p>Contents: {comment.content}</p>
      <p>Created by: ...</p>
      <p>Author Info: ...</p>
    </div>
  );
}
