import { useState } from "react";
import { useParams } from "react-router-dom";
import * as commentsAPI from "../../utilities/comments-api";

export default function CommentsForm({ addComments }) {
  const [newComment, setNewComment] = useState({});
  const [error, setError] = useState("");
  const { postId } = useParams();

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
      // POST into dbs - does this work only after refresh?
      await commentsAPI.createComment(postId, {
        ...newComment,
      });

      //redirect to the post....
      //window.location.href = `/${postId}`;
      const allComments = await commentsAPI.getAll(postId);

      // re-render
      addComments(allComments);
      setNewComment({ commentTitle: "", content: "" });
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
