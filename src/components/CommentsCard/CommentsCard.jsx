import "./CommentsCard.css";
import * as commentsAPI from "../../utilities/comments-api";
import { useParams } from "react-router-dom";
const moment = require("moment");
//import { useNavigate } from "react-router-dom";

export default function CommentsCard({ comment, user }) {
  const { postId } = useParams();
  //Use the navigate function to change routes programmatically
  // const navigate = useNavigate();

  // change the format of the ISODate
  const time = moment(comment.createdAt);

  async function handleDelete() {
    // if the user of the comment is same as the login user
    if (comment.user === user._id) {
      alert("Are you sure to delete the comment?");
      //comment._id
      const deleteCom = await commentsAPI.deleteComment(comment._id);
      console.log(deleteCom);
      // need to refresh it
      //navigate(`/${postId}`); //not working
    } else {
      alert("you don't ...");
    }
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
        <strong>Author:</strong> {user.name}
      </p>
      <p>
        <strong>Created Date:</strong> {time.format("MM/DD/YYYY HH:mm")}
      </p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
