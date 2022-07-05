import "./CommentsCard.css";

export default function CommentsCard({ comment }) {
  // need to find which user created the comment

  return (
    <div className="comments-card-container">
      <p>
        <strong>Title:</strong> {comment.commentTitle}
      </p>
      <p>
        <strong>Contents:</strong> {comment.content}
      </p>
      <p>
        <strong>Created Date:</strong> {comment.createdAt}
      </p>
      {/* ???????????????????????????????????? */}
      {/* <p>Author: {comment.user.name}</p>
      <p>Author Info: {comment.user.email}</p> */}
    </div>
  );
}
