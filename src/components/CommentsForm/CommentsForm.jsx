import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import * as commentsAPI from "../../utilities/comments-api";
import { useParams } from "react-router-dom";

export default function CommentsForm({ user }) {
  const [newComment, setNewComment] = useState({});
  const [error, setError] = useState("");

  const { postId } = useParams();

  //Use the navigate function to change routes programmatically
  // const navigate = useNavigate();

  function handleChange(event) {
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      // POST into dbs
      await commentsAPI.createComment(postId, {
        ...newComment,
      });

      //console.log(json); //got comment id - wiped out after redirect
      //redirect to the post....
      window.location.href = `/${postId}`;
      // navigate(`/${postId}`); //still not working
      setNewComment({});
    } catch {
      setError("Invalid Comment - Try Again");
    }
  }

  return (
    <>
      <form className="create-comment" onSubmit={handleSubmit}>
        <label>Comment Title: </label>
        <input
          onChange={handleChange}
          type="text"
          value={newComment.commentTitle}
          name="commentTitle"
        ></input>
        <label>Content:</label>
        <input
          onChange={handleChange}
          type="text"
          value={newComment.content}
          name="content"
        />
        <button type="submit">Submit</button>
      </form>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}
