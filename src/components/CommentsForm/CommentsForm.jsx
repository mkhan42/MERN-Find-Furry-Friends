import { useState } from "react";
import * as commentsAPI from "../../utilities/comments-api";

export default function CommentsForm({ comments, setComments }) {
  const [newComment, setNewComment] = useState({});
  // const [error, setError] = useState(null);

  function handleChange(event) {
    setNewComment({
      ...newComment,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log({ ...newComment });
    // it goes to controller
    // POST into dbs
    const json = await commentsAPI.createComment({ ...newComment });
    console.log(json); //got comment id
    setNewComment({});
  }

  return (
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
      {/* {error && <div className="error">{error}</div>} */}
    </form>
  );
}
