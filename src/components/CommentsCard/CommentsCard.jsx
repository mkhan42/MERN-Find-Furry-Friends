import "./CommentsCard.css";

export default function CommentsCard({ comment }) {
  // need to find which user created the comment

  return (
    <div className="comments-card-container">
      <p>Title: {comment.commentTitle}</p>
      <p>Contents: {comment.content}</p>
      <p>Created Date: {comment.createdAt}</p>
      {/* ???????????????????????????????????? */}
      {/* <p>Created by: {comment.user.name}</p>
      <p>Author Info: {comment.user.email}</p> */}
    </div>
  );
}
