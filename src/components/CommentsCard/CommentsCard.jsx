import "./CommentsCard.css";
import * as commentsAPI from "../../utilities/comments-api";
import { useParams } from "react-router-dom";
//import { useNavigate } from "react-router-dom";

export default function CommentsCard({ comment, user}) {
  const { postId } = useParams();
  //Use the navigate function to change routes programmatically
  // const navigate = useNavigate();

  async function handleDelete() {
    // if the user of the comment is same as the login user
      const deleteCom = await commentsAPI.deleteComment(comment._id);
      console.log(deleteCom);
      // need to refresh it
      //navigate(`/${postId}`); //not working
    window.location.href = `/${postId}`;
  }

  let btn = comment?.user === user._id

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
      {btn && (
          <div>
            <button onClick={handleDelete}>Delete</button>
          </div> )
        }
      {/* ???????????????????????????????????? */}
      {/* <p>Author: {comment.user.name}</p>*/}
    </div>
  );
}
