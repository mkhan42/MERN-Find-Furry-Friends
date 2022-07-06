import "./CommentsCard.css";
import * as commentsAPI from "../../utilities/comments-api";
import { useParams } from "react-router-dom";

export default function CommentsCard({ comment }) {
  // TODO:  need to find which user created the comment
  const { postId } = useParams();

  async function handleDelete() {
    alert("Are you sure to delete the comment?");
    //comment._id
    const deleteCom = await commentsAPI.deleteComment(comment._id);
    console.log(deleteCom);
    // need to refresh it
    window.location.href = `/${postId}`;
  }

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
      <button onClick={handleDelete}>Delete</button>
      {/* ???????????????????????????????????? */}
      {/* <p>Author: {comment.user.name}</p>
      <p>Author Info: {comment.user.email}</p> */}
    </div>
  );
}
